/*
This is the left nav bar that has the Minerva logo and user information
*/

import { Link } from "react-router-dom";
import MinervaLogo from "../assets/MinervaLogo.svg";
import SampleAvatar from "../assets/SampleAvatar.svg";
import "./LeftNavBar.css";

const LeftNavBar = () => {
  return (
    <div className="LeftNavBar">
      <Link to={`/`}>
        <div className="HeaderLogo">
          <img src={MinervaLogo} alt="Header logo" />
        </div>{" "}
      </Link>
      <div className="AvaText">
        <div className="PersonalInfo">
          <p className="UserFirstname">Khanh</p>
          <p className="UserClass">Class of 2022</p>
        </div>
      </div>
    </div>
  );
};

export default LeftNavBar;
