import React, { useEffect, useState } from "react";
import './CreateUser.css';

const base64 = require('base-64');

const CreateUser = (props) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [role, setRole] = useState('')
  const [primaryMajor, setPrimaryMajor] = useState('')
  const [secondaryMajor, setSecondaryMajor] = useState('')
  const [primaryConcentration, setPrimaryConcentration] = useState('')
  const [secondaryConcentration, setSecondaryConcentration] = useState('')
  const [specialConcentration, setSpecialConcentration] = useState('')
  const [minor, setMinor] = useState('')
  const [minorConcentration, setMinorConcentration] = useState('')

  const onSubmitClick = (e)=>{
    e.preventDefault()
    console.log("You pressed Create New User")
    let opts = {
      'firstname': firstname,
      'lastname': lastname,
      'role': role,
      'primary_major': primaryMajor,
      'secondary_major': secondaryMajor,
      'primary_concentration': primaryConcentration,
      'secondary_concentration': secondaryConcentration,
      'special_concentration': specialConcentration,
      'minor': minor,
      'minor_concentration': minorConcentration,
    }
    console.log(opts)
    fetch('/users', {
      method: 'post',
      body: JSON.stringify(opts)
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
        <p>CreateUser to Your Account</p>
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
            CreateUser
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateUser;
