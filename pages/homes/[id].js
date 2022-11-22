import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";

const useStyles = makeStyles(style);

function ProductPage({ idContext }) {
  const router = useRouter();

  const [home, getDataHomes] = useState([]);

  useEffect(() => {
    async function getDeviceData() {
      let one = `/api/homes/${idContext}`;
      const [data] = await Promise.all([axios.get(one)]);
      const homes = data.data;
      getDataHomes(homes[0]);
    }
    getDeviceData();
  }, []);

  const handlerDelete = async (id) => {
    try {
      await axios.delete("/api/homes/" + id);
      router.push("/homes/list");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid container className={classes.mainContainer}>
        <Grid
          style={{ marginTop: "0px" }}
          container
          className={classes.containerClasses}
        >
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h2' component='h1'>
              {home.length == 0 ? "Loading" : home.id}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h2' component='h1'>
              {home.address?.charAt(0).toUpperCase() + home.address?.slice(1)}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push("/homes/edit/" + home.id)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='default'
              onClick={() => handlerDelete(home.id)}
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
  const idContext = context.params.id;

  return {
    props: {
      idContext: idContext,
    },
  };
};

export default ProductPage;
