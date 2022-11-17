import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";

const useStyles = makeStyles(style);

function ProductPage({ home }) {
  const router = useRouter();
  console.log("home", home[0]);
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
        <Grid container className={classes.containerClasses}>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h2' component='h1'>
              {home[0].id}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h2' component='h1'>
              {home[0].address.charAt(0).toUpperCase() +
                home[0].address.slice(1)}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='primary'
              onClick={() => router.push("/homes/edit/" + home[0].id)}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              color='default'
              onClick={() => handlerDelete(home[0].id)}
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
  const { data: home } = await axios.get(
    `http://localhost:3000/api/homes/` + context.query.id
  );

  return {
    props: {
      home,
    },
  };
};

export default ProductPage;
