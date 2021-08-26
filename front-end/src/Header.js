import MinervaLogo from './assets/MinervaLogo.svg';
import './Header.css';

function Header() {
  return (
    <div className="Header">        
        {/* <div className="Horizontal"> */}
          <img src={MinervaLogo} className="Header-logo" alt="Header logo" />
          <div className="Base-horizontal"></div>
        {/* </div> */}
    </div>
  );
}

export default Header;
