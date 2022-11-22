import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid } from "@material-ui/core";
import { HomeCard } from "../../components/HomeCard";

const useStyles = makeStyles(style);

function ListPage() {
  const classes = useStyles();

  const [dataHomes, getDataHomes] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/homes`;
      const [data] = await Promise.all([axios.get(one)]);
      const homes = data.data;
      getDataHomes(homes);
    }
    getDeviceData();
  }, []);

  const renderHomes = () => {
    if (dataHomes.length === 0) {
      return <h1>No homes yet</h1>;
    }
    return dataHomes.map((home) => <HomeCard key={home.id} home={home} />);
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container className={classes.middleInputs}>
        {renderHomes()}
      </Grid>
    </Grid>
  );
}

export default ListPage;
