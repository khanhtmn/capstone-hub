import UpsideDownTriangle from '../assets/UpsideDownTriangle.svg';
import MagnifyingGlass from '../assets/MagnifyingGlass.svg';
import './TopNavBar.css';

const TopNavBar = () => {
  return (
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
    </div>
  )
}

export default TopNavBar;