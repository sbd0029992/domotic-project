import React, { useEffect, useState } from "react";
import axios from "axios";
import { RoomCard } from "../../components/RoomCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(style);

function ListPage({ idHome }) {
  const classes = useStyles();

  const [dataRooms, getDataRooms] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/rooms/roomHome?idHome=${idHome}`;
      const [data] = await Promise.all([axios.get(one)]);
      const rooms = data.data;
      getDataRooms(rooms);
    }
    getDeviceData();
  }, []);

  const renderRooms = () => {
    if (dataRooms.length === 0) {
      return <h1>No rooms yet</h1>;
    }

    return dataRooms.map((room) => <RoomCard key={room.id} room={room} />);
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Grid container className={classes.middleInputs}>
        {renderRooms()}
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
