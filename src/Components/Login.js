/*
This is the page that handles all the logins
*/
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const base64 = require("base-64");

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitClick = (e) => {
    e.preventDefault();
    console.log("You pressed login");
    let opts = {
      username: username,
      password: password,
    };
    console.log(opts);
    fetch("https://capstone-hub-backend.herokuapp.com/login", {
      // fetch("http://localhost:5000/login", {
      method: "post",
      headers: new Headers({
        Authorization: "Basic " + `${base64.encode(`${username}:${password}`)}`,
      }),
    })
      .then((r) => r.json())
      .then((token) => {
        if (token) {
          console.log(token);
          localStorage.setItem("token", token["token"]);
          navigate("/");
        } else {
          console.log("Please type in correct username/password");
        }
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="Login">
      <div className="SmallBox">
        <p>Login to Your Account</p>
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
            Login
          </button>
        </form>
        <Link to="/register">Don't have an account yet? Click here</Link>
      </div>
    </div>
  );
};

export default Login;
