import "./TopNavBar.css";
import { useState, useEffect } from "react";

import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Search from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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

  useEffect(() => {
    setUserMajorFilters(props.majorFilters);
  }, [props.majorFilters]);

  useEffect(() => {
    setUserFeatureFilters(props.featureFilters);
  }, [props.featureFilters]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const filteredProjects = [];
    for (let project of props.projects) {
      for (let field in project) {
        if (
          project[field] &&
          field != "id" &&
          project[field].toLowerCase().includes(searchValue.toLowerCase())
        ) {
          if (
            userMajorFilters.includes(project.primary_major) ||
            userMajorFilters.includes(project.secondary_major) ||
            userMajorFilters.includes(project.minor)
          ) {
            filteredProjects.push(project);
            break;
          }
        }
      }
    }
    props.setRenderedProjects(filteredProjects);
  };
  const handleChangeMajorFilter = (event) => {
    // console.log(event.target.value, "FROM HANDLE CHANGE");
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
  // console.log(userMajorFilters, "from TopNavBar");
  return (
    <div className="TopNavBar">
      <div className="SearchBox">
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Search for project, name, etc."
            id="fullWidth"
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
          {props.majorFilters.map((majorFilter) => (
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
      <FormControl sx={{ m: 1, width: 120 }}>
        <InputLabel id="demo-multiple-checkbox-label">
          Project Feature
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={userFeatureFilters}
          autoWidth
          onChange={handleChangeFeatureFilter}
          input={<OutlinedInput label="Project Feature" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {props.featureFilters.map((featureFilter) => (
            <MenuItem key={featureFilter} value={featureFilter}>
              <Checkbox
                checked={userFeatureFilters.indexOf(featureFilter) > -1}
              />
              <ListItemText primary={featureFilter} />
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
