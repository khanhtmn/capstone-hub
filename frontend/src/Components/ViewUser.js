import { useState,useEffect } from 'react'
import SampleAvatar from './../assets/SampleAvatar.svg';
import './ViewUser.css';
import LeftNavBar from './LeftNavBar';
import TopNavBar from './TopNavBar';
import { useSearchParams } from 'react-router-dom';
import { useParams } from 'react-router';

const ViewUser = () => {
  const [users, setUsers] = useState();
  const {id} = useParams();

  console.log(id)
  // Modify the current state by setting the new data to
  // the response from the backend
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if (token) {
      fetch(`http://localhost:5000/users/${id}`,{
        'methods':'GET',
        headers : {
          'Content-Type':'application/json',
          'x-access-tokens':localStorage.getItem("token")
        }
      })
      .then(response => response.json())
      .then(response => setUsers(response.data))
      .catch(error => console.log(error))
    }
    else {
      window.history.pushState({}, undefined, "/login")
      window.location.reload() 
    }
  },[])
  console.log(users)
  return (
    <div className="RowOuter">
      <LeftNavBar/>
      <div className="ColumnOuter">
        <TopNavBar/>
        <div className="UserCardsCollection">
          {/* Display the project details if project is not None */}
          {users?.map(user =>{
              return (
                <div className="UserCard" key= {user.id}>
                  <div className="UserAvaTextCard">
                    <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                      <div className="UserPersonalInfo">
                        <p className="UserFirstname">{user.firstname} {user.lastname}</p>
                        <p className="UserText">Primary Major: {user.primary_major} - {user.primary_concentration}</p>
                        <p className="UserText">Secondary Major: {user.secondary_major} - {user.secondary_concentration}</p>
                        <p className="UserText">Minor: {user.minor} - {user.minor_concentration}</p>
                      </div>
                  </div>
                {/* <hr/> */}
                  <p className="UserHeading">Project Title</p>
                  <p>{user.title}</p>
                  <p className="UserHeading">Project Description</p>
                  <p>{user.abstract}</p>
                  <p className="UserHeading">Project Features</p>
                  <p>{user.feature}</p>
                  <p className="UserHeading">Keywords</p>
                  <p>{user.keywords}</p>
                  <p className="UserHeading">LOs</p>
                  <p>{user.los}</p>
                  <p className="UserHeading">Custom LO</p>
                  <p>{user.custom_los}</p>
                  <p className="UserHeading">HSR Review</p>
                  <p>{user.hsr_review}</p>
                  <p className="UserHeading">Last updated</p>
                  <p>{user.last_updated}</p>
                  <p className="UserHeading">External Dependencies</p>
                  <p className="UserHeading">Section</p>
                  <p className="UserHeading">Knowledge/Skill to Offer</p>
                  <p className="UserHeading">Knowledge/Skill to Request</p>
                  <p className="UserHeading">Commitment</p>
                  <p className="UserHeading">Other ideas</p>
                </div>
              )

          })}
        </div>
      </div>
    </div>
  )
}
  
  export default ViewUser;
