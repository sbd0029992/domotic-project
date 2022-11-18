import React, { useReducer } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Grid, Typography, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/DeviceForm";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);
export function UserForm({ userUpdate }) {
  const router = useRouter();

  const [room, setRoom] = useState({
    idUser: null,
    role: "master",
  });

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
      await axios.put("/api/users/" + router.query.id, room);
      toast.success("User updated successfully");
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
          style={{
            backgroundColor: "#fff",
            borderRadius: "10px",
            width: "270px",
            padding: "20px",
          }}
          sx={{ p: 2 }}
          className={classes.containerClasses}
        >
          <Grid
            style={{ width: "100%" }}
            container
            spacing={2}
            justifyContent='center'
          >
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                {userUpdate.title}
              </Typography>
            </Grid>
            <Grid item className={classes.inputContainer}>
              <InputLabel
                style={{ marginBottom: "10px" }}
                className={classes.labelInput}
                id='idUser'
              >
                {userUpdate.idUser}
              </InputLabel>
              <input
                type='number'
                id='idUser'
                name='idUser'
                placeholder={userUpdate.idUser}
                className={classes.selectStyle}
                value={room.idUser}
                required
                onChange={handleChange}
                style={{
                  width: "100%",
                  height: "40px",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
              {/* {!dataUsers ? (
                <h1>No users find!</h1>
              ) : (
                <select
                  id='idUser'
                  name='idUser'
                  label='User Name'
                  onChange={handleChange}
                  labelId='idUser'
                  value={room.idUser}
                  className={classes.selectStyle}
                >
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
                </select> */}
            </Grid>
            <Grid
              style={{ width: "100%" }}
              item
              className={classes.inputContainer}
            >
              <InputLabel
                style={{ marginBottom: "10px", textAlign: "left" }}
                className={classes.labelInput}
                id='role'
              >
                {userUpdate.role}
              </InputLabel>
              <select
                style={{
                  width: "100%",
                  height: "40px",
                  padding: " 10px",
                  fontSize: "1rem",
                }}
                id='role'
                name='role'
                className={classes.selectStyle}
                value={room.role}
                onChange={handleChange}
              >
                <option selected value='master'>
                  {userUpdate.master}
                </option>
                <option value='user'>{userUpdate.user}</option>
              </select>
            </Grid>

            <Grid item className={classes.buttonSingIn}>
              <Button type='submit' variant='contained' color='primary'>
                {router.query.id ? "Update Access" : "Grant Access"}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <ToastContainer />
      </form>
    </React.Fragment>
  );
}
