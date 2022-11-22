import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeviceCard } from "../../components/DeviceCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import SelectList from "./select";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ idHome }) {
  const classes = useStyles();

  const [dataDevices, getDataDevices] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/devices/?idHome=${idHome}`;
      const [data] = await Promise.all([axios.get(one)]);
      const devices = data.data;
      getDataDevices(devices);
    }
    getDeviceData();
  }, []);

  const renderDevices = () => {
    if (dataDevices.length === 0) {
      return <h1>No devices yet</h1>;
    }

    return dataDevices.map((device) => (
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

  return {
    props: {
      idHome: idHome,
    },
  };
};

export default ListPage;
