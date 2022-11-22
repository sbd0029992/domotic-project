import React, { useEffect, useState } from "react";
import axios from "axios";
import { AccessCard } from "../../components/AccessCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ idHome }) {
  const classes = useStyles();
  const [dataAccess, getDataAccess] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/accesss/?idHome=${idHome}`;
      const [data] = await Promise.all([axios.get(one)]);
      const access = data.data;
      getDataAccess(access);
    }
    getDeviceData();
  }, []);

  const renderAccesss = () => {
    if (dataAccess.length === 0) {
      return <h1>No accesss yet</h1>;
    }
    return dataAccess.map((access) => (
      <AccessCard key={access.idUser} access={access} />
    ));
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container className={classes.middleInputs}>
        {renderAccesss()}
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
