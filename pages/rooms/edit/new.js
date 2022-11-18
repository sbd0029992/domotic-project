import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  InputLabel,
  Link,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "../../../theme/style/Components/InputContainer";
import axios from "axios";
import { withIronSession } from "next-iron-session";

const useStyles = makeStyles(style);

export default function NewPage({ user }) {
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);

  const [room, setRoom] = useState({
    idHome: "",
    roomName: "",
  });

  const router = useRouter();

  useEffect(() => {
    const getRoom = async () => {
      const { data } = await axios.get("/api/rooms/" + router.query.id);
      setRoom(data);
    };

    if (router.query?.id) {
      getRoom(router.query.id);
    }
  }, []);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/api/rooms/" + router.query.id, room);
      toast.success("Room updated successfully");

      router.push("/rooms/list/?idHome=" + dataUser.idHome);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
    console.log(room);
  };

  const handleChange = ({ target: { name, value } }) => {
    setRoom({ ...room, [name]: value });
  };

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
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                Actualidar Habitación
              </Typography>
            </Grid>
            <Grid
              style={{ width: "100%" }}
              item
              className={classes.inputContainer}
            >
              <InputLabel
                style={{ marginBottom: "10px" }}
                className={classes.labelInput}
                id='idRoom'
              >
                Nombre de Habitación
              </InputLabel>
              <input
                id='roomName'
                name='roomName'
                label='Room Name'
                variant='outlined'
                placeholder='Nombre de Habitación'
                type='text'
                onChange={handleChange}
                value={room.roomName}
                required
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "10px",
                  fontSize: "16px",
                }}
                inputProps={{ pattern: "[A-Za-z0-9 ]{3,30}" }}
                fullWidth
              />
              <input
                id='idHome'
                name='idHome'
                label='idHome'
                value={room.idHome}
                hidden={true}
              />
            </Grid>
            <Grid
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
              }}
              item
              className={classes.buttonSingIn}
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
      </form>
    </React.Fragment>
  );
}
