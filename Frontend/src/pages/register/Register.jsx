import React, { useRef } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate()
  const username = useRef()
  const email = useRef()
  const password = useRef()

  const handleClick = async (e) => {
    e.preventDefault()
    const user = {
      name: username.current.value,
      email: email.current.value,
      password: password.current.value
    }
    try {
      const res = await axios.post("/api/auth/register-host", user)
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <input placeholder="Username" required ref={username} className="loginInput" />
            <input placeholder="Email" type='email' required ref={email} className="loginInput" />
            <input placeholder="Password" type='password' required ref={password} className="loginInput" />
            <button className="loginButton" onClick={handleClick}>Sign Up</button>
            <button className="loginRegisterButton">
              Log into Account
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register