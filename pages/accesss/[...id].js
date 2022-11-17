import { Button, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Pages/EditPage";

const useStyles = makeStyles(style);

function AccessPage({ access }) {
  const router = useRouter();
  const handlerDelete = async (id) => {
    try {
      await axios.delete(
        `/api/accesss/${id}?idUser=${access.idUser}&idDevice=${access.idDevice}`
      );
      router.push("/accesss/list");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  console.log(access);
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
              {access.userName.charAt(0).toUpperCase() +
                access.userName.slice(1)}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h3' component='h1'>
              {access.deviceName.charAt(0).toUpperCase() +
                access.deviceName.slice(1)}
            </Typography>
          </Grid>
          <Grid
            container
            className={classes.RoomName}
            justifyContent='flex-start'
          >
            <Typography variant='h3' component='h1'>
              {access.status == "1" ? "Granted" : "Denied"}
            </Typography>
          </Grid>
          <Grid container className={classes.buttons}>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => handlerDelete(access.id)}
              className={classes.buttonDelete}
            >
              Delete Access
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export const getServerSideProps = async (context) => {
  const { data: access } = await axios.get(
    `http://localhost:3000/api/accesss/${context.query.userId}` +
      `?idUser=${context.query.idUser}` +
      `&idDevice=${context.query.idDevice}`

    //`http://localhost:3000/api/accesss/${context.query.idUser}?idUser=${context.query.idUser}&idDevice=${context.query.idDevice}`
  );
  return {
    props: {
      access,
    },
  };
};

export default AccessPage;
