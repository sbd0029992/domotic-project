import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);

function ProductPage({ room }) {
  const router = useRouter();
  const handlerDelete = async (id) => {
    try {
      await axios.delete("/api/rooms/" + id);
      router.push("/rooms/list");
    } catch (error) {
      toast.error(error.response.data.message);
    }
    console.log(room);
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.mainContainer}>
        <Grid container className={classes.containerClasses}>
          <Grid container className={classes.RoomName}>
            <Typography variant='h2' component='h1' align='center'>
              {room.roomName.charAt(0).toUpperCase() + room.roomName.slice(1)}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push("/rooms/edit/" + room.id)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='default'
              onClick={() => handlerDelete(room.id)}
              className={classes.buttonDelete}
            >
              delete
            </Button>
          </Grid>
        </Grid>
        <ToastContainer />
      </Grid>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { data: room } = await axios.get(
    `http://localhost:3000/api/rooms/` + context.query.id
  );

  return {
    props: {
      room,
    },
  };
};

export default ProductPage;
