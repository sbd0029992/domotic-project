import { Box, Grid } from "@material-ui/core";
import React from "react";
import { RoomForm } from "../../../components/RoomForm";
import withSession from "../../../lib/session";

function NewPage({ user }) {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      style={{ marginTop: "10%" }}
    >
      <RoomForm user={user} />
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
  } else if (user.role !== "master") {
    res.setHeader(
      "location",
      `/switchPage/?idHome=${user.idHome}&idUser=${user.idUser}`
    );
    res.statusCode = 302;
    res.end();
  }

  return {
    props: { user: req.session.get("user") },
  };
});
