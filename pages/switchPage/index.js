import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/SwitchPage";
import { Grid } from "@material-ui/core";
import { SwitchContainer } from "../../components/switchContainer";
import axios from "axios";

const useStyles = makeStyles(style);

function index({ idUser, idHome }) {
  const classes = useStyles();
  const [dataRooms, getDataRooms] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/rooms/?idHome=${idHome}&idUser=${idUser}`;
      const [data] = await Promise.all([axios.get(one)]);
      const rooms = data.data;
      getDataRooms(rooms);
    }
    getDeviceData();
  }, []);

  const renderRooms = () => {
    if (dataRooms.length === 0) {
      return <React.Fragment></React.Fragment>;
    }

    return dataRooms.map((room) => (
      <SwitchContainer key={room.id} room={room} idUser={idUser} />
    ));
  };

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
  return {
    props: {
      idUser: idUser,
      idHome: idHome,
    },
  };
};

export default index;
