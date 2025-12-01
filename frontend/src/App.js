import React, { useState } from 'react'
import SignUp from './components/SignUp'
import Login from "./components/Login"
import Home from "./components/Home"

const App = () => {
  const [login,setLogin] = useState(false)
  const [loginStatus,setLoginStatus] = useState(() => {
  return localStorage.getItem("token") ? true : false;
})
   if (loginStatus) {
    return <Home />;
  }
  return (
    <>
   {login?<Login handleClick={()=>setLogin(false)} handleLoginStatus={()=>setLoginStatus(true)} />:<SignUp handleClick={()=>setLogin(true)}/>}
   
    </>
  )
}

export default App