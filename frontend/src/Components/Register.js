import React, { useEffect, useState } from "react";
import './Register.css';

const base64 = require('base-64');

const Register = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed Register")
    let opts = {
      'username': username,
      'password': password
    }
    console.log(opts)
    fetch('/register', {
      method: 'POST',
      body: JSON.stringify(opts)
    }).then(r => r.json())
      .then(data => {
        console.log("Here is the data", data)
        // if (Response.status==201){
        //   console.log(username)
        //   window.history.pushState({}, undefined, "/login")
        //   window.location.reload()
        // }
        // else {
        //   console.log("Please use Minerva address")
        // }
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
        <p>Register Your New Account</p>
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
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register;
