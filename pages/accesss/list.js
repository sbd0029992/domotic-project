import React from "react";
import axios from "axios";
import { AccessCard } from "../../components/AccessCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ accesss }) {
  const classes = useStyles();

  const renderAccesss = () => {
    if (accesss.length === 0) {
      return <h1>No accesss yet</h1>;
    }

    console.log(accesss);

    return accesss.map((access) => (
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
  const { data: accesss } = await axios.get(
    // "http://localhost:3000/api/accesss"
    `http://localhost:3000/api/accesss/?idHome=${idHome}`
  );

  return {
    props: {
      accesss: accesss,
    },
  };
};

export default ListPage;
