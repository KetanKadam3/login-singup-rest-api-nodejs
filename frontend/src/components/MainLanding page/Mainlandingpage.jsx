import React, { useState } from 'react'
import LoginPage from '../login page/LoginPage'
import SignUp from '../Signup page/SignUp'

function Mainlandingpage() {
    const [isLogin,setIsLogin] = useState(true)
  return (
    <div style={{
        backgroundImage:'url(https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
        width:'100%',
        // minHeight:'100vh',
        height:'100vh',
        backgroundRepeat:'no-repeat',
        display:'flex',
        backgroundSize:'cover',
        justifyContent:'center',
        alignItems:'center'

    }}
      >
      {isLogin ?(
    <LoginPage setIsLogin={setIsLogin}/>

      ):(
        <SignUp setIsLogin={setIsLogin}/>
      )}
   

    </div>
  )
}

export default Mainlandingpage