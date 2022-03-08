import React, { useEffect, useState } from "react";
import "./CreateUser.css";

const base64 = require("base-64");

const CreateUser = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [primaryMajor, setPrimaryMajor] = useState("");
  const [secondaryMajor, setSecondaryMajor] = useState("");
  const [primaryConcentration, setPrimaryConcentration] = useState("");
  const [secondaryConcentration, setSecondaryConcentration] = useState("");
  const [specialConcentration, setSpecialConcentration] = useState("");
  const [minor, setMinor] = useState("");
  const [minorConcentration, setMinorConcentration] = useState("");

  const onSubmitClick = (e) => {
    e.preventDefault();
    console.log("You pressed Create New User");
    let opts = {
      firstname: firstname,
      lastname: lastname,
      role: role,
      primary_major: primaryMajor,
      secondary_major: secondaryMajor,
      primary_concentration: primaryConcentration,
      secondary_concentration: secondaryConcentration,
      special_concentration: specialConcentration,
      minor: minor,
      minor_concentration: minorConcentration,
    };
    console.log(opts);
    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-tokens": localStorage.getItem("token"),
      },
      body: JSON.stringify(opts),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Here is the submitted data", data);
        if (data.status == 201) {
          console.log(firstname, lastname);
          window.history.pushState({}, undefined, "/");
          window.location.reload();
        } else {
          console.log("Error has occured");
        }
      });
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handlePrimaryMajorChange = (e) => {
    setPrimaryMajor(e.target.value);
  };

  const handleSecondaryMajorChange = (e) => {
    setSecondaryMajor(e.target.value);
  };

  const handlePrimaryConcentrationChange = (e) => {
    setPrimaryConcentration(e.target.value);
  };

  const handleSecondaryConcentrationChange = (e) => {
    setSecondaryConcentration(e.target.value);
  };

  const handleSpecialConcentrationChange = (e) => {
    setSpecialConcentration(e.target.value);
  };

  const handleMinorChange = (e) => {
    setMinor(e.target.value);
  };

  const handleMinorConcentrationChange = (e) => {
    setMinorConcentration(e.target.value);
  };

  return (
    <div className="CreateUser">
      <div className="SmallBox">
        <p>Let's create your profile</p>
        <form action="#">
          <p>Firstname</p>
          <div>
            <input
              type="text"
              placeholder="Firstname"
              onChange={handleFirstnameChange}
              value={firstname}
            />
          </div>

          <p>Lastname</p>
          <div>
            <input
              type="text"
              placeholder="Lastname"
              onChange={handleLastnameChange}
              value={lastname}
            />
          </div>

          <p>Role</p>
          <div>
            <input
              type="text"
              placeholder="Role"
              onChange={handleRoleChange}
              value={role}
            />
          </div>

          <p>Primary Major</p>
          <div>
            <input
              type="text"
              placeholder="Primary Major"
              onChange={handlePrimaryMajorChange}
              value={primaryMajor}
            />
          </div>

          <p>Secondary Major</p>
          <div>
            <input
              type="text"
              placeholder="Secondary Major"
              onChange={handleSecondaryMajorChange}
              value={secondaryMajor}
            />
          </div>

          <p>Primary Concentration</p>
          <div>
            <input
              type="text"
              placeholder="Primary Concentration"
              onChange={handlePrimaryConcentrationChange}
              value={primaryConcentration}
            />
          </div>

          <p>Secondary Concentration</p>
          <div>
            <input
              type="text"
              placeholder="Secondary Concentration"
              onChange={handleSecondaryConcentrationChange}
              value={secondaryConcentration}
            />
          </div>

          <p>Special Concentration</p>
          <div>
            <input
              type="text"
              placeholder="Special Concentration"
              onChange={handleSpecialConcentrationChange}
              value={specialConcentration}
            />
          </div>

          <p>Minor</p>
          <div>
            <input
              type="text"
              placeholder="Minor"
              onChange={handleMinorChange}
              value={minor}
            />
          </div>

          <p>Minor Concentration</p>
          <div>
            <input
              type="text"
              placeholder="Minor Concentration"
              onChange={handleMinorConcentrationChange}
              value={minorConcentration}
            />
          </div>

          <button onClick={onSubmitClick} type="submit">
            Save my profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
