import React from "react";
import axios from "axios";
import { DeviceCard } from "../../components/DeviceCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import SelectList from "./select";
import { HomeCard } from "../../components/HomeCard";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ homes }) {
  const classes = useStyles();

  const renderHomes = () => {
    if (homes.length === 0) {
      return <h1>No homes yet</h1>;
    }

    return homes.map((home) => <HomeCard key={home.id} home={home} />);
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container className={classes.middleInputs}>
        {renderHomes()}
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (context) => {
  const { data: homes } = await axios.get("http://localhost:3000/api/homes");

  return {
    props: {
      homes: homes,
    },
  };
};

export default ListPage;
