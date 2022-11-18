import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Box, Button, Grid, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../../theme/style/Components/DeviceForm";
import axios from "axios";

const useStyles = makeStyles(style);

export default function NewPage(props) {
  console.log("🚀 ~ file: new.js ~ line 13 ~ NewPage ~ props", props);
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
    <Grid>
      <form style={{ width: "300px", margin: "auto" }} onSubmit={handleSubmit}>
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
                "Modificar Datos"
              </Typography>
            </Grid>
            <Grid item className={classes.inputContainer}>
              <input
                id='address'
                name='address'
                label='address'
                variant='outlined'
                placeholder='Direccion'
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
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Grid>
  );
}

export async function getServerSideProps({ locale }) {
  const response = await import(`../../../lang/${locale}.json`);
  return {
    props: {
      homeform: response.default.homeform,
    },
  };
}
