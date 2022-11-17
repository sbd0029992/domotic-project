import { Grid } from "@material-ui/core";
import React from "react";
import withSession from "../../lib/session";

const reload = () => {
  window.location.reload();
};

const index = () => {
  return (
    <React.Fragment>
      <Grid
        container
        style={{ display: "flex", justifyContent: "center", color: "white" }}
      >
        {reload()}
        <h1>Navege por la pagina con la Barra de Navegacion</h1>
      </Grid>
    </React.Fragment>
  );
};

export default index;

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user.role === "admin") {
    res.setHeader("location", "/adminRegister");
    res.statusCode = 302;
    res.end();
  } else if (
    user.role === "master" ||
    user.role === "user" ||
    user.role === "guest"
  ) {
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
