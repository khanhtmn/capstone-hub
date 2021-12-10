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
        <div className="CardsCollection">
          {/* Display the project details if project is not None */}
          {/* {users?.map(user =>{
              return (
                <div className="Card" key= {user.id}>
                <div className="AvaTextCard">
                    <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                      <div className="PersonalInfo">
                        <p className="UserFirstname">{user.firstname} {user.lastname}</p>
                        <p className="Text">Major: {user.primary_major} - {user.primary_concentration} | Minor: {user.minor}</p>
                      </div>
                  </div>
                <hr/>
                </div>
              )

              })} */}
        </div>
      </div>
    </div>
  )
}
  
  export default ViewUser;
