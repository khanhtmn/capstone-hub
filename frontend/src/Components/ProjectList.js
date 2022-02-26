import { useState, useEffect } from "react";
import SampleAvatar from "./../assets/SampleAvatar.svg";
import "./ProjectList.css";
import CreateProject from "./CreateProject";
import LeftNavBar from "./LeftNavBar";
import TopNavBar from "./TopNavBar";
import { Link } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [majorFilters, setMajorFilters] = useState([]);
  const [featureFilters, setFeatureFilters] = useState([]);
  const [renderedProjects, setRenderedProjects] = useState([]); // wait for condition to change
  const [showButton, setShowButton] = useState(false);

  // Modify the current state by setting the new data to
  // the response from the backend
  // similar to setTimeOut
  useEffect(() => {
    setRenderedProjects([...projects]);
    const majorSet = new Set();
    const featureSet = new Set();
    for (let project of projects) {
      project.primary_major && majorSet.add(project.primary_major);
      project.secondary_major && majorSet.add(project.secondary_major);
      project.minor && majorSet.add(project.minor);
      if (project.feature) {
        const listOfFeatures = project.feature.split(",");
        for (let feature of listOfFeatures) {
          featureSet.add(feature);
        }
      }
    }
    setMajorFilters(Array.from(majorSet));
    setFeatureFilters(Array.from(featureSet));
  }, [projects]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/projects", {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": localStorage.getItem("token"),
        },
      })
        .then((response) => response.json())
        .then((response) =>
          /*console.log(response.data)) */ setProjects(response.data)
        )
        .catch((error) => console.log(error));
    } else {
      window.history.pushState({}, undefined, "/login");
      window.location.reload();
    }
  }, []);
  console.log(renderedProjects);
  console.log("HERE ARE THE MAJORS", majorFilters);
  console.log("HERE ARE THE FEATURES", featureFilters);
  return (
    <div className="ProjectList">
      <LeftNavBar />
      <div className="ColumnOuter">
        <TopNavBar
          projects={projects}
          setRenderedProjects={setRenderedProjects}
          majorFilters={majorFilters}
          featureFilters={featureFilters}
        />
        <div className="submitProject">
          <button
            onClick={() => {
              setShowButton(!showButton);
            }}
          >
            Submit your project here
          </button>
        </div>
        {showButton ? (
          <CreateProject />
        ) : (
          <div className="CardsCollection">
            {/* Display the project details if project is not None */}
            {renderedProjects &&
              renderedProjects.map((project) => {
                const abstract_trunc = project.abstract.slice(0, 200);
                return (
                  <div className="Card" key={project.id}>
                    <div className="AvaTextCard">
                      <img src={SampleAvatar} className="Avatar" alt="Avatar" />
                      <div className="PersonalInfo">
                        <Link to={`/users/${project.id}`}>
                          <p className="UserFirstname">
                            {project.firstname} {project.lastname}
                          </p>
                        </Link>
                        <p className="Text">
                          Major: {project.primary_major} -{" "}
                          {project.primary_concentration} | Minor:{" "}
                          {project.minor}
                        </p>
                        <p className="Text">Project Features:</p>
                      </div>
                    </div>
                    <p className="Text">{abstract_trunc}...</p>
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
