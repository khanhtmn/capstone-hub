import "./TopNavBar.css";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import { useState, useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import { majors } from "../assets/MajorList";
import { features } from "../assets/FeatureList";
import { classYears } from "../assets/ClassYearList";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const TopNavBar = (props) => {
  const [searchValue, setSearchValue] = useState("");
  const [userMajorFilters, setUserMajorFilters] = useState([]);
  const [userFeatureFilters, setUserFeatureFilters] = useState([]);
  const [userClassYearFilters, setUserClassYearFilters] = useState([]);

  useEffect(() => {
    setUserMajorFilters(majors);
  }, [majors]);

  useEffect(() => {
    setUserFeatureFilters(features);
  }, [features]);

  useEffect(() => {
    setUserClassYearFilters(classYears);
  }, [classYears]);

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // without this it will reload/refresh the whole page -> invalidate the submission
    fetch(
      "https://capstone-hub-backend.herokuapp.com/search?q=" +
        searchValue.replace(" ", "+"),
      {
        methods: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-tokens": localStorage.getItem("token"),
        },
      }
    )
      .then((response) => response.json())
      .then((response) => props.setProjects(response))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Jello!");
    const filteredProjects = [];
    for (let project of props.projects) {
      console.log("feature", project.feature);
      if (
        (userMajorFilters.includes(project.primary_major) ||
          userMajorFilters.includes(project.secondary_major) ||
          userMajorFilters.includes(project.minor)) &&
        // userFeatureFilters.includes(project.feature)
        project.feature
          .replace("e.g., ", "")
          .split(", ")
          .some((smallFeature) => userFeatureFilters.includes(smallFeature)) &&
        userClassYearFilters.includes(project.class_year)
      ) {
        filteredProjects.push(project);
      }
    }
    props.setRenderedProjects(filteredProjects);
  };
  const handleChangeMajorFilter = (event) => {
    console.log(event.target.value, "FROM HANDLE CHANGE");
    setUserMajorFilters(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };
  const handleChangeFeatureFilter = (event) => {
    console.log(event.target.value, "FROM HANDLE CHANGE");
    setUserFeatureFilters(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };
  const handleChangeClassYearFilter = (event) => {
    console.log(event.target.value, "FROM HANDLE CHANGE");
    setUserClassYearFilters(
      event.target.value
      // typeof event.target.value === "string"
      //   ? event.target.value.split(",")
      //   : event.target.value
    );
  };
  // console.log(userMajorFilters, "from TopNavBar");
  return (
    <div className="TopNavBar">
      <div className="SearchBox">
        <form onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            label="Search for project, name, etc."
            id="input-with-icon-textfield"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            variant="standard"
            color="success"
          />
        </form>
      </div>
      <FormControl sx={{ m: 1, width: 250 }}>
        <InputLabel id="demo-multiple-checkbox-label">Major</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={userMajorFilters}
          autoWidth
          onChange={handleChangeMajorFilter}
          input={<OutlinedInput label="Major" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {majors.map((majorFilter) => (
            <MenuItem key={majorFilter} value={majorFilter}>
              <Checkbox checked={userMajorFilters.indexOf(majorFilter) > -1} />
              <ListItemText primary={majorFilter} />
            </MenuItem>
          ))}
          <div>
            <button onClick={handleSubmit}>Apply</button>
          </div>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel id="demo-multiple-checkbox-label">Features</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={userFeatureFilters}
          autoWidth
          onChange={handleChangeFeatureFilter}
          input={<OutlinedInput label="Features" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {features.map((FeatureFilter) => (
            <MenuItem key={FeatureFilter} value={FeatureFilter}>
              <Checkbox
                checked={userFeatureFilters.indexOf(FeatureFilter) > -1}
              />
              <ListItemText primary={FeatureFilter} />
            </MenuItem>
          ))}
          <div>
            <button onClick={handleSubmit}>Apply</button>
          </div>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel id="demo-multiple-checkbox-label">Class year</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={userClassYearFilters}
          autoWidth
          onChange={handleChangeClassYearFilter}
          input={<OutlinedInput label="Class year" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {classYears.map((ClassYearFilter) => (
            <MenuItem key={ClassYearFilter} value={ClassYearFilter}>
              <Checkbox
                checked={userClassYearFilters.indexOf(ClassYearFilter) > -1}
              />
              <ListItemText primary={ClassYearFilter} />
            </MenuItem>
          ))}
          <div>
            <button onClick={handleSubmit}>Apply</button>
          </div>
        </Select>
      </FormControl>
    </div>
  );
};

export default TopNavBar;
