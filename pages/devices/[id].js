import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";

const useStyles = makeStyles(style);

function ProductPage({ device }) {
  const router = useRouter();
  const handlerDelete = async (id) => {
    try {
      await axios.delete("/api/devices/" + id);
      router.push("/devices/list");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.mainContainer}>
        <Grid container className={classes.containerClasses}>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h2' component='h1'>
              {device.deviceName.charAt(0).toUpperCase() +
                device.deviceName.slice(1)}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h3' component='h1'>
              {device.urlDevice}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h3' component='h1'>
              {device.roomName}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push("/devices/edit/" + device.id)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='default'
              onClick={() => handlerDelete(device.id)}
              className={classes.buttonDelete}
            >
              delete
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { data: device } = await axios.get(
    `http://localhost:3000/api/devices/` + context.query.id
  );

  return {
    props: {
      device,
    },
  };
};

export default ProductPage;
