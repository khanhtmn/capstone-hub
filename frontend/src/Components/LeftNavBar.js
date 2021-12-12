import MinervaLogo from '../assets/MinervaLogo.svg';
import SampleAvatar from '../assets/SampleAvatar.svg';
import './LeftNavBar.css';

const LeftNavBar = () => {
  return (
    <div className="LeftNavBar">
      <div className="HeaderLogo">
        <img src={MinervaLogo} alt="Header logo" />
      </div>
    <div className="AvaText">
      <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
        <div className="PersonalInfo">
          <p className="UserFirstname">Khanh</p>
          <p className="UserClass">Class of 2022</p>
        </div>
    </div>
    </div>
  )
}

export default LeftNavBar;
