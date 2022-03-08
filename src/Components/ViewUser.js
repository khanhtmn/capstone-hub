import { useState, useEffect } from "react";
import SampleAvatar from "./../assets/SampleAvatar.svg";
import "./ViewUser.css";
import LeftNavBar from "./LeftNavBar";
import TopNavBar from "./TopNavBar";
import { useSearchParams } from "react-router-dom";
import { useParams } from "react-router";

const ViewUser = () => {
  const [user, setUser] = useState();
  const { id } = useParams();

  console.log(id);
  // Modify the current state by setting the new data to
  // the response from the backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`https://capstone-hub-backend.herokuapp.com/projects/${id}`, {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) => setUser(response.data))
        .catch((error) => console.log(error));
    } else {
      window.history.pushState({}, undefined, "/login");
      window.location.reload();
    }
  }, []);
  console.log(user);
  return (
    <div className="ViewUser">
      <LeftNavBar />
      <div className="ColumnOuter">
        <TopNavBar />
        <div className="CardsCollection">
          {/* Display the project details if project is not None */}
          {user && (
            <div className="UserCard" key={user.id}>
              <div className="UserAvaTextCard">
                <div className="UserPersonalInfo">
                  <p className="UserFirstname">{user.name}</p>
                  <p className="UserText">
                    Primary Major: {user.primary_major} -{" "}
                    {user.primary_concentration}
                  </p>
                  <p className="UserText">
                    {user.secondary_major === "NaN"
                      ? ""
                      : `Secondary Major: ${user.secondary_major} - 
                    ${user.secondary_concentration}`}
                  </p>
                  <p className="UserText">
                    {user.special_concentration === "NaN"
                      ? ""
                      : `Special concentration: ${user.special_concentration}`}
                  </p>
                  <p className="UserText">
                    {user.minor === "NaN"
                      ? ""
                      : `Minor: ${user.minor} - ${user.minor_concentration}`}
                  </p>
                </div>
              </div>
              {/* <hr/> */}
              <p className="UserHeading">Project Title: {user.title}</p>
              <p className="UserHeading">Project abstract</p>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
