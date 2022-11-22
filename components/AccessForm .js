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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);
export function AccessForm({ user, accessForm }) {
  const classes = useStyles();
  const router = useRouter();
  const [access, setAccess] = useState({
    idUser: "",
    idDevice: "",
  });

  const [dataUser, setdataUser] = useState([]);
  const [dataResponse, setDataResponse] = useState([]);
  const dataResponseUsers = dataResponse[0];
  const dataResponseDevices = dataResponse[1];

  useEffect(() => {
    const getUser = async () => {
      let one = `/api/accesss/listUsers/?idHome=${user.idHome}`;
      let two = `/api/accesss/listDevices/?idHome=${user.idHome}`;
      const [data] = await Promise.all([axios.get(one)]);
      const [data2] = await Promise.all([axios.get(two)]);
      const users = data.data.users;
      const devices = data2.data.devices;
      setDataResponse([users, devices]);
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (router.query.id) {
        await axios.put("/api/accesss/" + router.query.id, access);
        toast.success("Access updated successfully");
      } else {
        await axios.post("/api/accesss", access);
        toast.success("Access created successfully");
      }
      router.push(`/accesss/list/?idHome=${dataUser.idHome}`);
    } catch (error) {
      toast.error("Sellecione un usuario y un dispositivo!");
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setAccess({ ...access, [name]: value });
  };

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await axios.get("/api/accesss/" + router.query.id);
      setAccess(data);
    };

    if (router.query?.id) {
      getRoom(router.query.id);
    }
  }, []);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                {accessForm.title}
              </Typography>
            </Grid>
            <Grid item className={classes.inputContainer}>
              <InputLabel className={classes.labelInput} id='idUser'>
                {accessForm.userName}
              </InputLabel>
              <select
                id='idUser'
                name='idUser'
                label='User Name'
                onChange={handleChange}
                labelId='idUser'
                value={access.idUser}
                className={classes.selectStyle}
              >
                <option value=''>{accessForm.selectUser}</option>
                {dataResponseUsers?.map((users) => (
                  <option
                    onChange={handleChange}
                    key={users.idUser}
                    value={users.idUser}
                  >
                    {users.userName.charAt(0).toUpperCase() +
                      users.userName.slice(1)}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item className={classes.inputContainer}>
              <InputLabel className={classes.labelInput} id='idDevice'>
                {accessForm.deviceName}
              </InputLabel>
              <select
                id='idDevice'
                name='idDevice'
                label='Device Name'
                onChange={handleChange}
                labelId='idDevice'
                value={access.idDevice}
                className={classes.selectStyle}
              >
                <option value=''>{accessForm.selectDevice}</option>
                {dataResponseDevices?.map((devices) => (
                  <option
                    onChange={handleChange}
                    key={devices.id}
                    value={devices.id}
                    selected
                  >
                    {devices.deviceName.charAt(0).toUpperCase() +
                      devices.deviceName.slice(1)}{" "}
                    en{" "}
                    {devices.roomName.charAt(0).toUpperCase() +
                      devices.roomName.slice(1)}
                  </option>
                ))}
              </select>
            </Grid>

            <Grid item className={classes.buttonSingIn}>
              <Button type='submit' variant='contained' color='primary'>
                {accessForm.btnGrant}
              </Button>
              <Button
                component={Link}
                href={`/accesss/list/?idHome=${dataUser.idHome}`}
                variant='contained'
                color='default'
                style={{ textDecoration: "none" }}
                disabled={router.query.id ? true : false}
                hidden={router.query.id ? true : false}
              >
                {accessForm.btnList}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </form>
    </React.Fragment>
  );
}
