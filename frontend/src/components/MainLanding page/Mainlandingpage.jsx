import React, { useState, useEffect } from "react";
import LoginPage from "../login page/LoginPage";
import SignUp from "../Signup page/SignUp";
import { createClient } from "pexels";

function MainLandingPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [img, setImg] = useState("");
  const [nextImg, setNextImg] = useState("");
  const [fade, setFade] = useState(false);

  const client = createClient(
    "pIeMIRPMatzctU1f2MLv0sktKDvLJXOQBM6eZtfNxttgfbiXPr2MEtve"
  );
  const queries = ["Ocean", "Mountain", "Forest", "Desert", "City"];

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const randomQuery = queries[Math.floor(Math.random() * queries.length)];
        const index = Math.floor(Math.random() * 10); // Adjusted to 10 for consistency
        const response = await client.photos.search({
          query: randomQuery,
          per_page: 10,
        });
        if (response && response.photos && response.photos[index]) {
          setNextImg(response.photos[index]?.src?.landscape || "");
          setFade(true);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
    const interval = setInterval(fetchImages, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (fade) {
      const timer = setTimeout(() => {
        setImg(nextImg);
        setFade(false);
      }, 1000); // Duration of the fade transition

      return () => clearTimeout(timer);
    }
  }, [fade, nextImg]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "opacity 1s ease-in-out",
          opacity: fade ? 0 : 1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${nextImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          transition: "opacity 1s ease-in-out",
          opacity: fade ? 1 : 0,
        }}
      ></div>
      {isLogin ? (
        <LoginPage setIsLogin={setIsLogin} />
      ) : (
        <SignUp setIsLogin={setIsLogin} />
      )}
    </div>
  );
}

export default MainLandingPage;
