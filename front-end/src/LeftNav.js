import Ava from './assets/Ava.svg';
import './LeftNav.css';

function LeftNav() {
  return (
    <div className="LeftNav">
      <div className="Vertical">
        
        <div className="Horizontal">
          <img src={MinervaLogo} className="LeftNav-logo" alt="LeftNav logo" />
          <div className="Base-horizontal"></div>
        </div>

        {/* <div className="Base-vertical"></div> */}
        <div className="AvaText">
          <img src={Ava} className="Avatar" alt="Avatar"/>
            <div className="Personal-info">
              <p className="User-Firstname">Khanh</p>
              <p className="User-Class">Class of 2022</p>
            </div>
        </div>
      </div>

    </div>
  );
}

export default LeftNav;
