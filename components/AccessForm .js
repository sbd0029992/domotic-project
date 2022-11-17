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
  const router = useRouter();
  const [dataUser, setdataUser] = useState([]);
  const [dataDevices, setdataDevices] = useState([]);
  const [dataUsers, setdataUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);
  useEffect(() => {
    async function getDeviceData() {
      const apiUrlEndPoint = `http://localhost:3000/api/accesss/listDevices/?idHome=${user.idHome}`;
      const response = await fetch(apiUrlEndPoint);
      const result = await response.json();
      setdataDevices(result.devices);
    }
    getDeviceData();
  }, []);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndPoint = `http://localhost:3000/api/accesss/listUsers/?idHome=${user.idHome}`;
      const response = await fetch(apiUrlEndPoint);
      const result = await response.json();
      setdataUsers(result.users);
    }
    getPageData();
  }, []);

  const classes = useStyles();
  const [access, setAccess] = useState({
    idUser: "",
    idDevice: "",
  });
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
                {dataUsers.map((users) => (
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
                {dataDevices.map((devices) => (
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
