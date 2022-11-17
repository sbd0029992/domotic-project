import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, InputLabel } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SelectList({ devicesList }) {
  const renderDevices = () => {
    if (devicesList.length === 0) {
      return <h1>No devices yet</h1>;
    }

    return (
      <select>
        {devicesList.map((list) => (
          <option key={list.id} value={list.idRoom}>
            {list.deviceName}
          </option>
        ))}
      </select>
    );
  };

  return (
    <React.Fragment>
      <Grid container>{renderDevices()}</Grid>
      <Grid>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Age</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={1}
            label='Age'
            // onChange={handleChange}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { data: devicesList } = await axios.get(
    "http://localhost:3000/api/devices"
  );

  return {
    props: {
      devicesList: devicesList,
    },
  };
};

export default SelectList;
