import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const base64 = require("base-64");

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitClick = (e) => {
    e.preventDefault();
    console.log("You pressed Register");
    let opts = {
      email: username,
      password: password,
    };
    console.log(opts);
    // fetch("http://localhost:5000/register", {
    fetch("https://capstone-hub-backend.herokuapp.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(opts),
    })
      .then((r) => {
        if (r.status == 201) {
          return r.json();
        } else {
          console.log("Error in registration!");
        }
      })
      .then((data) => {
        console.log("Here is the data", data);
        console.log(username);
        navigate("/login");
        // navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Register">
      <div className="SmallBox">
        <p>Register Your New Account</p>
        <form action="#">
          <p>Email</p>
          <div>
            <input
              type="text"
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
  );
};

export default Register;
