import React, { useState } from "react";
import axios from "axios";
import { axiosIntance } from "../../api/axiosIntance";

function LoginPage({ setIsLogin }) {
  const apiUrl = import.meta.env.BASE_URL;

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (Object.values(loginData).includes("")) {
      return alert("Please fill all the fields !!");
    }
    try {
      const response = await axiosIntance.post(`/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      setLoginData({
        email: "",
        password: "",
      });
      alert(response.data.message);

      console.log("Response from server:", response.data);
    } catch (err) {
      console.log(err);
      alert(err.response.data.error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "20px",
        width: "400px",
        height: "400px",
        maxWidth: "70%",
        backdropFilter: "blur(50px)",
        border: "1px solid white",
        padding: "30px",
        borderRadius: "50px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Login</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <p style={{ fontSize: "18px" }}>Email</p>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleInputChange}
          required
          style={{
            fontSize: "18px",
            padding: "10px 20px ",
            borderRadius: "10px",
            border: "1px solid white",
          }}
        
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <p style={{ fontSize: "18px" }}>Password</p>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleInputChange}
          required
          style={{
            fontSize: "18px",
            padding: "10px 20px ",
            borderRadius: "10px",
            border: "1px solid white",
          }}
        />
      </div>

      <button
        style={{
          fontSize: "18px",
          padding: "10px 20px ",
          borderRadius: "10px",
          border: "1px solid white",
          cursor: "pointer",
          backgroundColor: "grey",
          color: "white",
          boxShadow: "0px 0px 5px white",
        }}
        onClick={handleLogin}
      >
        Login
      </button>

      <p style={{ textAlign: "center", color: "white" }}>
        Don't have an account? Please{" "}
        <button
          onClick={() => setIsLogin(false)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            fontSize: "16px",
            color: "black",
            padding: "5px",
            cursor: "pointer",
          }}
        >
          singup
        </button>
      </p>
    </div>
  );
}

export default LoginPage;
