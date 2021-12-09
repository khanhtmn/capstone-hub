import React, { useEffect, useState } from "react";

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
          window.history.pushState({}, undefined, "/projects")
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
    <div>
      <h2>Login</h2>
      <form action="#">
        <div>
          <input type="text" 
            placeholder="Username" 
            onChange={handleUsernameChange}
            value={username} 
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
        </div>
        <button onClick={onSubmitClick} type="submit">
          Login Now
        </button>
      </form>
    </div>
  )
}

export default Login;
