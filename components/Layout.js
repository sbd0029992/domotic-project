import { Grid } from "@material-ui/core";
import React from "react";
import withSession from "../lib/session";
import Navbar from "./Navbar";
import { useRouter } from "next/router";

export default function ({ children }) {
  const router = useRouter();
  const { asPath } = router;
  const noNav = ["/login", "/register", "/"];
  return (
    <React.Fragment>
      {noNav.includes(asPath) ? null : (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Navbar />
        </Grid>
      )}
      <main>{children}</main>
    </React.Fragment>
  );
}
