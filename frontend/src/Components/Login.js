import React, { useEffect, useState } from "react";
import './Login.css';

const base64 = require('base-64');

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed login")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/login', {
      method: 'post',
      headers: new Headers({
        "Authorization": "Basic " + `${base64.encode(`${username}:${password}`)}`
      })
    }).then(r => r.json())
      .then(token => {
        if (token){
          console.log(token)
          localStorage.setItem("token", token["token"])
          window.history.pushState({}, undefined, "/")
          window.location.reload()
        }
        else {
          console.log("Please type in correct username/password")
        }
      })
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  return (
    <div className="BigBox">
      <div className="SmallBox">
        <p>Login to Your Account</p>
        <form action="#">
          <p>Email</p>
          <div>
            <input type="text" 
              placeholder="Email" 
              onChange={handleUsernameChange}
              value={username} 
            />
          </div>
          <p>Password</p>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
          <button onClick={onSubmitClick} type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;