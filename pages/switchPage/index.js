import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/SwitchPage";
import { Grid } from "@material-ui/core";
import { SwitchContainer } from "../../components/switchContainer";
import axios from "axios";

const useStyles = makeStyles(style);

function index({ rooms, idUser }) {
  const classes = useStyles();
  const renderRooms = () => {
    if (rooms.length === 0) {
      return <h1>No rooms yet</h1>;
    }

    return rooms.map((room) => (
      <SwitchContainer key={room.id} room={room} idUser={idUser} />
    ));
  };

  const [dataUsers, setdataUsers] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndPoint = `http://localhost:3000/api/auth/user`;
      const response = await fetch(apiUrlEndPoint);
      const result = await response.json();
      setdataUsers(result.users);
    }
    getPageData();
  }, []);

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid xs={12} item className={classes.confirm}>
        {renderRooms()}
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (req, res) => {
  const idHome = req.query.idHome;
  const idUser = req.query.idUser;

  const { data: rooms } = await axios.get(
    `http://localhost:3000/api/rooms/?idHome=${idHome}&idUser=${idUser}`
  );

  return {
    props: {
      rooms: rooms,
      idUser: idUser,
    },
  };
};

export default index;
