import React from "react";
import axios from "axios";
import { DeviceCard } from "../../components/DeviceCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import SelectList from "./select";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ devices }) {
  const classes = useStyles();

  const renderDevices = () => {
    if (devices.length === 0) {
      return <h1>No devices yet</h1>;
    }

    return devices.map((device) => (
      <DeviceCard key={device.id} device={device} />
    ));
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container className={classes.middleInputs}>
        {renderDevices()}
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (req, res) => {
  const idHome = req.query.idHome;
  const { data: devices } = await axios.get(
    // `http://localhost:3000/api/devices/filterDevice?idHome=${idHome}`
    `http://localhost:3000/api/devices/?idHome=${idHome}`
  );

  return {
    props: {
      devices: devices,
    },
  };
};

export default ListPage;
