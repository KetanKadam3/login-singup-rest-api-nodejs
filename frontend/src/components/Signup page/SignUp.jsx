import React, { useState } from 'react'
import axios from 'axios'

function SignUp({setIsLogin}) {
  const [singUpData, setSingUpData] = useState({
    email: "",
    password: "",
    userName:''
  });

  const handleInputChange = (e) =>{
     const {value,name} = e.target;

     setSingUpData((prev)=>({
      ...prev,
      [name]:value,
     }))
  }

  const handleSingUp = async () => {
    console.log('jkj')
    try {
      const response = await axios.post(
        `${process.env.BASE_URL}/singup`,
        singUpData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      alert('user successfully registered !!')
      setIsLogin(true)

      console.log("Response from server:", response.data);
    } catch (err) {
      console.log(err);
      }
 
  };
 
  return (
    <div
    style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'space-between',
      gap:'20px',
      width:'400px',
      height:'400px',
      maxWidth:'70%', 

      backdropFilter:'blur(50px)',
      border:'1px solid white',
      padding:'30px',
      borderRadius:'50px'
    }}
    >
      <h1 style={{textAlign:'center'}}>Sign Up</h1>


      <div style={{display:'flex',flexDirection:'column',gap:'5px',}}>
      <p style={{fontSize:'18px'}}>Username</p>
      <input type='text' name='userName' value={singUpData.userName} onChange={handleInputChange} required style={{fontSize:'18px' ,padding:'10px 20px ' ,borderRadius:'10px',border:'1px solid white'}} />
    </div>
    <div style={{display:'flex',flexDirection:'column',gap:'5px',}}>
      <p style={{fontSize:'18px'}}>Email</p>
      <input type='email' name='email' value={singUpData.email} onChange={handleInputChange} required style={{fontSize:'18px' ,padding:'10px 20px ' ,borderRadius:'10px',border:'1px solid white'}} />
    </div>

    <div style={{display:'flex',flexDirection:'column',gap:'5px',}}>
      <p style={{fontSize:'18px'}}>Password</p>
      <input type='password'name='password'  value={singUpData.password} onChange={handleInputChange} required style={{fontSize:'18px' ,padding:'10px 20px ' ,borderRadius:'10px',border:'1px solid white'}} />
    </div>
   
     <button style={{fontSize:'18px' ,padding:'10px 20px ' ,borderRadius:'10px',border:'1px solid white',cursor:'pointer',backgroundColor:'#9C6276',color:'white',boxShadow:'0px 0px 5px white'
     }}  onClick={handleSingUp}>Sign Up</button>

      <p style={{textAlign:'center',color:'white'}}>have an account? Please 
         <button onClick={()=> setIsLogin(true)}
          style={{backgroundColor:'transparent',border:'none',fontSize:'14px' ,color:'black',padding:'5px',cursor:'pointer'}}>login</button></p>
    </div>
  )
}

export default SignUp
