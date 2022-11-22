import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/SwitchContainer";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import ConfigContainer from "./configContainer";
import axios from "axios";

const useStyles = makeStyles(style);
export function SwitchContainer({ room, idUser }) {
  const classes = useStyles();

  const [dataDevices, setdataDevices] = useState([]);

  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/accesss/listDevicesFilter/?idUser=${idUser}&idRoom=${room.id}`;
      const [data] = await Promise.all([axios.get(one)]);
      const devices = data.data.devices;
      setdataDevices(devices);
    }
    getDeviceData();
  }, []);

  const renderDevices = () => {
    if (dataDevices.length === 0) {
      return <h1></h1>;
    }

    return dataDevices.map((devices) => (
      <ConfigContainer devices={devices} key={devices.id} />
    ));
  };

  return (
    <Grid container className={classes.rootPaper}>
      <Grid item className={classes.acordion}>
        <Typography variant='h3' component='h1' className={classes.Title}>
          {room.roomName.charAt(0).toUpperCase() + room.roomName.slice(1)}
        </Typography>
      </Grid>
      <Grid item className={classes.devices}>
        {renderDevices()}
      </Grid>
    </Grid>
  );
}
