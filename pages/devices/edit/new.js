import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  Link,
  Typography,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../../theme/style/Components/DeviceForm";
import axios from "axios";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);

export default function NewPage({ user }) {
  const classes = useStyles();
  const router = useRouter();
  const [device, setDevice] = useState({
    deviceName: "",
    urlDevice: "",
    idRoom: "",
  });

  const [data, setdataUser] = useState([]);
  const [dataResponse] = data;
  useEffect(() => {
    const getUser = async () => {
      let one = "/api/auth/user";
      const [data] = await Promise.all([axios.get(one)]);

      let idHome = data.data.idHome;
      let two = "/api/rooms/filterHome?idHome=" + idHome;
      const [data2] = await Promise.all([axios.get(two)]);
      const users = data2.data.devices;
      const rooms = data.data;
      setdataUser([users, rooms]);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put("/api/devices/" + router.query.id, device);
        toast.success("Device updated successfully");
      } else {
        await axios.post("/api/devices", device);
        toast.success("Device created successfully");
      }
      router.push(`/devices/list/?idHome=${data[1].idHome}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setDevice({ ...device, [name]: value });
  };

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await axios.get("/api/devices/" + router.query.id);
      setDevice(data);
    };

    if (router.query?.id) {
      getRoom(router.query.id);
    }
  }, []);

  return (
    <React.Fragment>
      <form style={{ width: "300px", margin: "auto" }} onSubmit={handleSubmit}>
        <Box
          container
          sx={{ p: 2 }}
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "300px",
            padding: "20px",
          }}
          className={classes.containerClasses}
        >
          <Grid container spacing={2} justifyContent='center'>
            <Grid item style={{ width: "100%" }}>
              <Typography
                variant='h4'
                component='h1'
                style={{ textAlign: "center" }}
              >
                Actualizar Dispositivo
              </Typography>
            </Grid>
            <Grid
              item
              style={{ width: "100%" }}
              className={classes.inputContainer}
            >
              <TextField
                id='deviceName'
                name='deviceName'
                label='Nombre del Dispositivo'
                variant='outlined'
                type='text'
                onChange={handleChange}
                value={device.deviceName}
                required
                inputProps={{ pattern: "[A-Za-z0-9 ]{1,50}" }}
                fullWidth
              />
            </Grid>
            <Grid
              item
              style={{ width: "100%" }}
              className={classes.inputContainer}
            >
              <TextField
                id='urlDevice'
                name='urlDevice'
                label='Url del Dispositivo'
                variant='outlined'
                type='text'
                onChange={handleChange}
                value={device.urlDevice}
                required
                //inputProps only numbers
                inputProps={{ pattern: "[0-9-.-/]{1,50}" }}
                fullWidth
              />
            </Grid>
            <Grid
              item
              style={{ width: "100%" }}
              className={classes.inputContainer}
            >
              <InputLabel className={classes.labelInput} id='idRoom'>
                Habitacion
              </InputLabel>
              {!dataResponse ? (
                <h1>Sin Habitaciones </h1>
              ) : (
                <select
                  id='idRoom'
                  name='idRoom'
                  onChange={handleChange}
                  value={device.idRoom}
                  style={{
                    width: "100%",
                    height: "40px",
                    padding: " 10px",
                    fontSize: "1rem",
                  }}
                  fullWidth
                >
                  {dataResponse.map((devices) => (
                    <option
                      onChange={handleChange}
                      key={devices.id}
                      value={devices.id}
                    >
                      {devices.roomName.charAt(0).toUpperCase() +
                        devices.roomName.slice(1)}{" "}
                    </option>
                  ))}
                </select>
              )}
            </Grid>
            <Grid
              item
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Button
                style={{ fontSize: "12px" }}
                type='submit'
                variant='contained'
                color='primary'
              >
                Actualizar
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </form>
    </React.Fragment>
  );
}
