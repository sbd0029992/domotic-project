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
import style from "../theme/style/Components/InputContainer";
import axios from "axios";

const useStyles = makeStyles(style);
export function RoomForm({ user, roomForm }) {
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
      if (router.query.id) {
        await axios.put("/api/rooms/" + router.query.id, room);
        toast.success("Room updated successfully");
      } else {
        await axios.post("/api/rooms", room);
        toast.success("Room created successfully");
      }
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
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                {router.query.id ? `${roomForm.update}` : `${roomForm.title}`}
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
                {roomForm.name}
              </InputLabel>
              <input
                id='roomName'
                name='roomName'
                label='Room Name'
                variant='outlined'
                placeholder={roomForm.roomName}
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
                value={
                  router.query.id
                    ? (room.idHome = dataUser.idHome)
                    : (room.idHome = user.idHome)
                }
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
                {router.query.id
                  ? `${roomForm.btnupdate}`
                  : `${roomForm.btnsave}`}
              </Button>
              <Button
                component={Link}
                href={`/rooms/list/?idHome=${dataUser.idHome}`}
                variant='contained'
                color='default'
                style={{ textDecoration: "none" }}
                disabled={router.query.id ? true : false}
                hidden={router.query.id ? true : false}
              >
                {roomForm.btnList}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </form>
    </React.Fragment>
  );
}
