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
  const [classYearFilters, setClassYearFilters] = useState([]);
  const [renderedProjects, setRenderedProjects] = useState([]); // wait for condition to change
  const [showButton, setShowButton] = useState(false);

  // Modify the current state by setting the new data to
  // the response from the backend
  // similar to setTimeOut
  useEffect(() => {
    console.log(projects, "Here's");
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
      fetch("https://capstone-hub-backend.herokuapp.com/projects", {
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
          setProjects={setProjects}
          setRenderedProjects={setRenderedProjects}
          majorFilters={majorFilters}
          featureFilters={featureFilters}
          classYearFilters={classYearFilters}
        />
        {/* <div className="submitProject">
          <button
            onClick={() => {
              setShowButton(!showButton);
            }}
          >
            Submit your project here
          </button>
        </div> */}
        {showButton ? (
          <CreateProject />
        ) : (
          <div className="CardsCollection">
            {/* Display the project details if project is not None */}
            {renderedProjects &&
              renderedProjects.map((project) => {
                const abstract_trunc = project.abstract.slice(0, 200);
                return (
                  <Link
                    to={`/projects/${project.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div className="Card" key={project.id}>
                      <div className="AvaTextCard">
                        <div className="PersonalInfo">
                          <p className="UserFirstname">{project.name}</p>
                          <p className="Text">
                            Major: {project.primary_major}{" "}
                            {project.secondary_major === "NaN"
                              ? ""
                              : ` - Second major: ${project.secondary_major}`}
                          </p>
                          <p className="Text">
                            Concentration(s): {project.primary_concentration}{" "}
                            {project.secondary_concentration === "NaN"
                              ? ""
                              : `- ${project.secondary_concentration}`}
                            {project.special_concentration === "NaN"
                              ? ""
                              : `- ${project.special_concentration}`}
                          </p>
                          <p className="Text">
                            {" "}
                            {project.minor === "NaN"
                              ? ""
                              : `Minor: ${project.minor}`}
                          </p>
                          <p className="Text">
                            {" "}
                            {project.minor_concentration === "NaN"
                              ? ""
                              : `Minor concentration: ${project.minor_concentration}`}
                          </p>
                        </div>
                      </div>
                      {/* <p className="Text">
                        Project Features: {project.feature}
                      </p> */}
                      <div className="ProjectAbstract">
                        <p className="Text">{abstract_trunc}...</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectList;
