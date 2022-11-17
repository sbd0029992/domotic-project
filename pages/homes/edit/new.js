import { Grid } from "@material-ui/core";
import React from "react";
import { HomeForm } from "../../../components/HomeForm";

function NewPage() {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      style={{ marginTop: "10%" }}
    >
      <HomeForm />
    </Grid>
  );
}
export default NewPage;
