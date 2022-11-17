import { Grid } from "@material-ui/core";
import { Update } from "@material-ui/icons";
import React from "react";
import { DeviceForm } from "../../../components/DeviceForm ";
import withSession from "../../../lib/session";

function NewPage({ user }) {
  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <DeviceForm deviceUpdate={user} />
    </Grid>
  );
}
export default NewPage;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});
