import SampleAvatar from './../assets/SampleAvatar.svg';
import './ProjectList.css';

const ProjectList = (props) => {

  return (
    <div className="CardsCollection">
    {/* Display the project details if project is not None */} 
     {props.projects && props.projects.map(project =>{
        const abstract_trunc = project.abstract.slice(0, 200)
        return (

          <div className="Card" key= {project.id}>
           <div className="AvaTextCard">
              <img src={SampleAvatar} className="Avatar" alt="Avatar"/>
                <div className="PersonalInfo">
                  <p className="UserFirstname">{project.firstname} {project.lastname}</p>
                  <p className="Text">Major: {project.primary_major} - {project.primary_concentration} | Minor: {project.minor}</p>
                  <p className="Text">Project Features:</p>
                </div>
            </div>
            <p className="Text">{abstract_trunc}...</p>
          <hr/>
          </div>
        )
        
        })}
    </div>
  )
}
  
  export default ProjectList;
