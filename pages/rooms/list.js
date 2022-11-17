import React from "react";
import axios from "axios";
import { RoomCard } from "../../components/RoomCard";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Components/RoomCard";
import { Grid, Typography } from "@material-ui/core";
import Navbar from "../../components/Navbar";

const useStyles = makeStyles(style);

function ListPage({ rooms }) {
  const classes = useStyles();

  const renderRooms = () => {
    if (rooms.length === 0) {
      return <h1>No rooms yet</h1>;
    }

    return rooms.map((room) => <RoomCard key={room.id} room={room} />);
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
  const { data: rooms } = await axios.get(
    `http://localhost:3000/api/rooms/roomHome?idHome=${idHome}`
  );

  return {
    props: {
      rooms: rooms,
    },
  };
};

export default ListPage;
