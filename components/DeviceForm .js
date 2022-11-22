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
import style from "../theme/style/Components/DeviceForm";
import axios from "axios";
import { TextField } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);
export function DeviceForm({ user, deviceForm }) {
  const router = useRouter();
  const classes = useStyles();
  const [device, setDevice] = useState({
    deviceName: "",
    urlDevice: "",
    idRoom: "",
  });

  const [dataUser, setdataUser] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);

  const [dataResponse, setdataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      if (router.query.id) {
        let one = `/api/rooms/filterHome/?idHome=${dataUser.idHome}`;
        const [data] = await Promise.all([axios.get(one)]);
        const rooms = data.data.devices;
        setdataResponse(rooms);
      } else {
        let two = `/api/rooms/filterHome/?idHome=${user.idHome}`;
        const [data] = await Promise.all([axios.get(two)]);
        const rooms = data.data.devices;
        setdataResponse(rooms);
      }
    }
    getPageData();
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
      router.push(`/devices/list/?idHome=${dataUser.idHome}`);
    } catch (error) {
      toast.error("Seleccione Una Habitacion!");
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
      <form onSubmit={handleSubmit}>
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
                {router.query.id
                  ? `${deviceForm.update}`
                  : `${deviceForm.title}`}
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
                label={deviceForm.deviceName}
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
                label={deviceForm.urlDevice}
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
                {deviceForm.roomName}
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
                  <option selected value=''>
                    {deviceForm.selectRoom}
                  </option>
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
                {router.query.id
                  ? `${deviceForm.btnupdate}`
                  : `${deviceForm.btnsave}`}
              </Button>
              <Button
                component={Link}
                href={`/devices/list/?idHome=${dataUser.idHome}`}
                variant='contained'
                color='default'
                style={{ textDecoration: "none" }}
                disabled={router.query.id ? true : false}
              >
                {deviceForm.btnList}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </form>
    </React.Fragment>
  );
}
