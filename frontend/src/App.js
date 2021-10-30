/*
Main page to display all projects
*/

import { useState,useEffect } from 'react'
import MinervaLogo from './assets/MinervaLogo.svg';
import UpsideDownTriangle from './assets/UpsideDownTriangle.svg';
import MagnifyingGlass from './assets/MagnifyingGlass.svg';
import SampleAvatar from './assets/SampleAvatar.svg';
import './App.css';
import ProjectList from './Components/ProjectList'

function App() {
  const [projects, setProjects] = useState([]);

  // Modify the current state by setting the new data to
  // the response from the backend
  useEffect(()=>{
    fetch('http://localhost:5000/projects',{
      'methods':'GET',
      headers : {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(response => setProjects(response))
    .catch(error => console.log(error))

  },[])

  return (
    <div className="AppContainer">

      <div className="LeftNavBar">
        <img src={MinervaLogo} className="HeaderLogo" alt="Header logo" />
        <div className="AvaText">
          <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
            <div className="PersonalInfo">
              <p className="UserFirstname">Khanh</p>
              <p className="UserClass">Class of 2022</p>
            </div>
        </div>
      </div>

      <div className="MainBox">
        <div className="TopNavBar">
          <div className="SearchBar">
            <img src={MagnifyingGlass} className="MagnifyingGlass"/>
          </div>
          <div className="Toggle" style={{width:107}}>
            <p>Major</p>
            <img src={UpsideDownTriangle} className="UpsideDownTriangle"/>          
          </div>
          <div className="Toggle" style={{width:178}}>
            <p>Project Feature</p>
            <img src={UpsideDownTriangle} className="UpsideDownTriangle"/>          
          </div>
        </div>

        <ProjectList 
        projects={projects.data} 
        />

      </div>
  
    </div>
  );
}

export default App;
