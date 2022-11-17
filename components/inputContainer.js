import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/InputContainer";

const useStyles = makeStyles(style);
function inputContainer({ title, labelHint, idInput }) {
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
            id={idInput}
            label={labelHint}
            variant='outlined'
            fullWidth
          />
        </Grid>
        <Grid item className={classes.buttonSingIn}>
          <Button variant='contained' color='primary' fullWidth>
            Create
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default inputContainer;
