import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import style from "../theme/style/Components/TwoInputContainer";

const useStyles = makeStyles(style);
function TwoInputContainer({
  title,
  hintInputUser,
  hintInputDevice,
  idInputOne,
  idInputTwo,
}) {
  const classes = useStyles();
  return (
    <Box container sx={{ p: 2 }} className={classes.containerClasses}>
      <Grid container spacing={2} justifyContent='center'>
        <Grid item sx>
          <Typography variant='h4' component='h1' color='black'>
            {title}
          </Typography>
        </Grid>
        <Grid item className={classes.inputContainer}>
          <TextField
            id={idInputOne}
            label={hintInputUser}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item className={classes.inputContainer}>
          <TextField
            id={idInputTwo}
            label={hintInputDevice}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item className={classes.buttons}>
          <Button variant='contained' color='primary'>
            Grant
          </Button>
          <Button variant='contained' color='danger'>
            Remove
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default TwoInputContainer;
