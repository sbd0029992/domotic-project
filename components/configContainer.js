import React from "react";
import { FormControlLabel, FormGroup, Grid, Switch } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Style from "../theme/style/Components/ConfigContainer";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles(Style);

function ConfigContainer({ devices }) {
  const classes = useStyles();

  const [checked, setChecked] = React.useState();
  const toggleChecked = () => {
    setChecked((prev) => !prev);
  };
  return (
    <Grid container className={classes.container}>
      <Typography variant='h5' component='h1' className={classes.title}>
        {devices.deviceName}
      </Typography>
      <FormGroup id={devices.id}>
        <FormControlLabel
          control={<Switch checked={checked} onChange={toggleChecked} />}
        />
      </FormGroup>
    </Grid>
  );
}

export default ConfigContainer;
