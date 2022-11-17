import { Grid } from "@material-ui/core";
import React, { useEffect, useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../theme/style/Master";
import { HomeForm } from "../../components/HomeForm";
import { UserForm } from "../../components/UserForm";
import withSession from "../../lib/session";

const useStyles = makeStyles(style);

export default function Admin(props) {
  const classes = useStyles();
  const { homeform } = props;
  const { userUpdate } = props;
  return (
    <Grid
      className={classes.mainContainer}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container className={classes.middleInputs}>
        <HomeForm homeForm={homeform} />
        <UserForm userUpdate={userUpdate} />
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
  } else if (!user || user.role !== "admin") {
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
      homeform: response.default.homeform,
      userUpdate: response.default.userUpdate,
    },
  };
});
