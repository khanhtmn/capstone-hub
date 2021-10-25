import MinervaLogo from './assets/MinervaLogo.svg';
import UpsideDownTriangle from './assets/UpsideDownTriangle.svg';
import MagnifyingGlass from './assets/MagnifyingGlass.svg';
import SampleAvatar from './assets/SampleAvatar.svg';
import './MainPage.css';

function MainPage() {
  return (
    <div className="MainPage">
      <div className="LeftNavBar">
        <img src={MinervaLogo} className="HeaderLogo" alt="Header logo" />
        {/* <div className="Base-vertical"></div> */}
        <div className="AvaText">
          <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
            <div className="PersonalInfo">
              <p className="UserFirstname">Khanh</p>
              <p className="UserClass">Class of 2022</p>
            </div>
        </div>
      </div>

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

        <div className="CardsCollection">

          <div className="Card">
            <div className="AvaTextCard">
              <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                <div className="PersonalInfo">
                  <p className="UserFirstname">Khanh Nguyen</p>
                  <p className="Text">Major: CS - Applied Problem Solving | Minor: SS</p>
                  <p className="Text">Project Features:</p>
                </div>
            </div>
            <p className="Text">An interdisciplinary projects to leverage technology for social goods. My current idea is to build a platform for mentoring women and non-binary students in Computer Science. The idea may change over time as I do research more, but ...</p>
          </div>

          <div className="Card">
            <div className="AvaTextCard">
              <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                <div className="PersonalInfo">
                  <p className="UserFirstname">Khanh Nguyen</p>
                  <p className="Text">Major: CS - Applied Problem Solving | Minor: SS</p>
                  <p className="Text">Project Features:</p>
                </div>
            </div>
            <p className="Text">An interdisciplinary projects to leverage technology for social goods. My current idea is to build a platform for mentoring women and non-binary students in Computer Science. The idea may change over time as I do research more, but ...</p>
          </div>

          <div className="Card">
            <div className="AvaTextCard">
              <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                <div className="PersonalInfo">
                  <p className="UserFirstname">Khanh Nguyen</p>
                  <p className="Text">Major: CS - Applied Problem Solving | Minor: SS</p>
                  <p className="Text">Project Features:</p>
                </div>
            </div>
            <p className="Text">An interdisciplinary projects to leverage technology for social goods. My current idea is to build a platform for mentoring women and non-binary students in Computer Science. The idea may change over time as I do research more, but ...</p>
          </div>

          <div className="Card">
            <div className="AvaTextCard">
              <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                <div className="PersonalInfo">
                  <p className="UserFirstname">Khanh Nguyen</p>
                  <p className="Text">Major: CS - Applied Problem Solving | Minor: SS</p>
                  <p className="Text">Project Features:</p>
                </div>
            </div>
            <p className="Text">An interdisciplinary projects to leverage technology for social goods. My current idea is to build a platform for mentoring women and non-binary students in Computer Science. The idea may change over time as I do research more, but ...</p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default MainPage;

