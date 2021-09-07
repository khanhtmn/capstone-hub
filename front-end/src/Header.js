// import MinervaLogo from './assets/MinervaLogo.svg';
// import './Header.css';

// function Header() {
//   return (
//     <div className="Header">        
//         {/* <div className="Horizontal"> */}
//           <img src={MinervaLogo} className="Header-logo" alt="Header logo" />
//           <div className="Base-horizontal"></div>
//         {/* </div> */}
//     </div>
//   );
// }

// export default Header;

import MinervaLogo from './assets/MinervaLogo.svg';
import Vector from './assets/Vector.svg';
import Ava from './assets/Ava.svg';
import './Header.css';

function Header() {
  return (
    <div className="Header">
      <div className="Vertical">
        
        <div className="Horizontal">
          <img src={MinervaLogo} className="HeaderLogo" alt="Header logo" />
          <div className="SearchBar"></div>
          <div className="Toggle" style={{width:107}}>
            <p>Major</p>
            <img src={Vector} className="Vector"/>          
          </div>
          <div className="Toggle" style={{width:178}}>
            <p>Project Feature</p>
            <img src={Vector} className="Vector"/>          
            </div>
        </div>

        {/* <div className="Base-vertical"></div> */}
        <div className="AvaText">
          <img src={Ava} className="Avatar" alt="Avatar"/>
            <div className="PersonalInfo">
              <p className="UserFirstname">Khanh</p>
              <p className="UserClass">Class of 2022</p>
            </div>
        </div>
      </div>

    </div>
  );
}

export default Header;

