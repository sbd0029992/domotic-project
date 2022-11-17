import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/DeviceForm";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const useStyles = makeStyles(style);
export function HomeForm({ homeForm }) {
  const router = useRouter();
  const classes = useStyles();
  const [home, setHome] = useState({
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put("/api/homes/" + router.query.id, home);
        toast.success("Home updated successfully");
      } else {
        await axios.post("/api/homes", home);
        toast.success("Home created successfully");
      }
      router.push("/homes/list");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setHome({ ...home, [name]: value });
  };

  useEffect(() => {
    const getHome = async () => {
      const { data } = await axios.get("/api/homes/" + router.query.id);
      setHome(data[0]);
    };

    if (router.query?.id) {
      getHome(router.query.id);
    }
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Box
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "300px",
            padding: "20px",
          }}
          container
          sx={{ p: 2 }}
          className={classes.containerClasses}
        >
          <Grid container spacing={2} justifyContent='center'>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                {router.query.id ? `${homeForm.update}` : `${homeForm.title}`}
              </Typography>
            </Grid>
            <Grid item className={classes.inputContainer}>
              <input
                id='address'
                name='address'
                label='address'
                variant='outlined'
                placeholder={homeForm.address}
                type='text'
                onChange={handleChange}
                value={home.address}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "10px",
                  fontSize: "16px",
                }}
                required
                inputProps={{ pattern: "[A-Za-z0-9 ]{1,50}" }}
                fullWidth
              />
            </Grid>
            <Grid item className={classes.buttonSingIn}>
              <Button type='submit' variant='contained' color='primary'>
                {router.query.id
                  ? `${homeForm.btnupdate}`
                  : `${homeForm.btnsave}`}
              </Button>
              <Button
                component={Link}
                href={"/homes/list"}
                variant='contained'
                color='default'
                style={{ textDecoration: "none" }}
                disabled={router.query.id ? true : false}
                hidden={router.query.id ? true : false}
              >
                {homeForm.btnList}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </React.Fragment>
  );
}
