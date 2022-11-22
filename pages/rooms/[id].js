import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);

function ProductPage({ idContext }) {
  const router = useRouter();

  const [dataRoom, getDataRooms] = useState([]);
  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/rooms/${idContext}`;
      const [data] = await Promise.all([axios.get(one)]);
      const access = data.data;
      getDataRooms(access);
    }
    getDeviceData();
  }, []);
  const handlerDelete = async (id) => {
    try {
      await axios.delete("/api/rooms/" + id);
      router.push("/master");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.mainContainer}>
        <Grid container className={classes.containerClasses}>
          <Grid container className={classes.RoomName}>
            <Typography variant='h2' component='h1' align='center'>
              {(dataRoom?.roomName || "").charAt(0).toUpperCase() +
                (dataRoom?.roomName || "").slice(1)}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push("/rooms/edit/" + dataRoom?.id)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='default'
              onClick={() => handlerDelete(dataRoom?.id)}
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
  const idContext = context.params.id;

  return {
    props: {
      idContext: idContext,
    },
  };
};

export default ProductPage;
