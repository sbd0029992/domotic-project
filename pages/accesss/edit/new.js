import { Grid } from "@material-ui/core";
import React from "react";
import { DeviceForm } from "../../../components/DeviceForm ";

function NewPage() {
  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      style={{ marginTop: "10%" }}
    >
      <DeviceForm />
    </Grid>
  );
}
export default NewPage;
