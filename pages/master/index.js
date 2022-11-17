import React from "react";
import { Grid } from "@material-ui/core";
import { RoomForm } from "../../components/RoomForm";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Master";
import { DeviceForm } from "../../components/DeviceForm ";
import { AccessForm } from "../../components/AccessForm ";
import Navbar from "../../components/Navbar";
import withSession from "../../lib/session";

const useStyles = makeStyles(style);

export default function Master({ user, accessForm, deviceForm, roomForm }) {
  const classes = useStyles();

  return (
    <Grid
      className={classes.mainContainer}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container className={classes.middleInputs}>
        <AccessForm accessForm={accessForm} user={user} />
        <DeviceForm deviceForm={deviceForm} user={user} />
        <RoomForm roomForm={roomForm} user={user} />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = withSession(async function ({
  req,
  res,
  locale,
}) {
  const user = req.session.get("user");
  const response = await import(`../../lang/${locale}.json`);

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
  } else if (user.role !== "master") {
    res.setHeader(
      "location",
      `/switchPage/?idHome=${user.idHome}&idUser=${user.idUser}`
    );
    res.statusCode = 302;
    res.end();
  }

  return {
    props: {
      user: req.session.get("user"),
      accessForm: response.default.accessForm,
      deviceForm: response.default.deviceForm,
      roomForm: response.default.roomForm,
    },
  };
});
