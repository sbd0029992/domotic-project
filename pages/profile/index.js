import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import style from "../../theme/style/profiles";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange } from "@mui/material/colors";
const useStyles = makeStyles(style);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Master() {
  const classes = useStyles();
  return (
    <Grid
      className={classes.mainContainer}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <Grid container className={classes.middleInputs}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Typography className={classes.titlePage}>profiles</Typography>

          <Box
            className={classes.formContainer}
            component='form'
            sx={{
              "& > :not(style)": { m: 1, width: "45ch" },
            }}
          >
            <TextField
              className={classes.hiden}
              required
              id='outlined-required'
              label='firstName'
              value='mateo'
            />
            <TextField
              className={classes.hiden}
              required
              id='outlined-required'
              label='lastName'
              value='galarga'
            />
            <TextField
              className={classes.hiden}
              required
              id='filled-number'
              label='age'
              type='number'
              defaultValue='24'
              InputLabelProps={{
                shrink: true,
              }}
            />

            <FormControl defaultValue='Male' className={classes.hiden}>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='Male'
                name='radio-buttons-group'
              >
                <FormControlLabel
                  value='F'
                  control={<Radio />}
                  label='Female'
                />
                <FormControlLabel value='M' control={<Radio />} label='Male' />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
