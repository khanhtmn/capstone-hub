/*
Main page to display all projects
*/

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import './App.css';
import ProjectList from './Components/ProjectList'
import Login from './Components/Login';
import TopNavBar from './Components/TopNavBar';
import LeftNavBar from './Components/LeftNavBar';

function App() {

  return (
    <div className="AppContainer">
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route element={
            <Login/>
          } path="/login">
          </Route>
          <Route element={
            <ProjectList/>
          } path="/projects">

          </Route>
          <Route element={
            <h1>Hehe</h1>
          } path="/">
          </Route>
        </Routes>
      </Router>


      {/* <LeftNavBar/> */}
      {/* <TopNavBar/> */}

    </div>
  );
}

export default App;
