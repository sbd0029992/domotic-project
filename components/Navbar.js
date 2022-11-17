import React, { useEffect, useState } from "react";
import style from "../theme/style/Components/Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@mui/material";
import { Button, Link, Menu, MenuItem, Typography } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import UserIcon from "@material-ui/icons/AccountCircle";
import DevicesIcon from "@material-ui/icons/ToggleOn";
import PersonIcon from "@material-ui/icons/PersonAdd";
import axios from "axios";
import { useRouter } from "next/router";
import LenguageSelector from "./LenguageSelector";

const useStyles = makeStyles(style);

export default function Navbar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //useEffect get user /api/auth/user to get user data
  const [dataUser, setdataUser] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get("/api/auth/user");
      setdataUser(data);
    };
    getUser();
  }, []);

  const renderButton = () => {
    switch (dataUser.role) {
      case "admin":
        return (
          <Button href='/adminRegister'>
            <PersonIcon />
          </Button>
        );
      case "master":
        return (
          <React.Fragment>
            <Button LinkComponent={Link} component='a' href={"/master"}>
              <HomeIcon />
            </Button>
            <Button
              LinkComponent={Link}
              component='a'
              href={`/switchPage/?idHome=${dataUser.idHome}&idUser=${dataUser.idUser}`}
            >
              <DevicesIcon />
            </Button>
          </React.Fragment>
        );
      case "user" || "guest":
        return (
          <Button
            href={`/switchPage/?idHome=${dataUser.idHome}&idUser=${dataUser.idUser}`}
          >
            <DevicesIcon />
          </Button>
        );
    }
  };

  const router = useRouter();
  const { asPath } = router;

  const title = () => {
    if (asPath === "/master") {
      return "Maestro";
    } else if (asPath === "/adminRegister") {
      return "Administrador";
    } else if (asPath.includes === "/switchPage") {
      return "Switch";
    }
  };

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      className={classes.mainContainer}
      style={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        marginTop: "2%",
        marginBottom: "5%",
        padding: "10px",
        width: "fit-content",
        display: "flex",
        placeContent: "center",
      }}
    >
      <Grid item className={classes.items}>
        <Typography
          color='primary'
          variant='h4'
          component='h1'
          className={classes.Title}
        >
          {title()}
        </Typography>
        {renderButton()}
      </Grid>
      <Grid style={{ alignItems: "center" }} item className={classes.items}>
        <Button onClick={handleMenu} className={classes.buttonIcon}>
          <UserIcon />
          {dataUser.username} | id {dataUser.idUser}
        </Button>
        <Menu
          id='menu-appbar'
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "down",
            horizontal: "right",
          }}
          open={open}
          onClose={handleClose}
          className={classes.menu}
        >
          <MenuItem onClick={handleClose}>
            <a
              href={`/register/edit/${dataUser.idUser}`}
              style={{ textDecoration: "none ", color: "#000" }}
            >
              Mi Perfil
            </a>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <a
              style={{ textDecoration: "none ", color: "#000" }}
              href='/api/auth/logout'
            >
              Cerrar Sesión
            </a>
          </MenuItem>
        </Menu>
        <LenguageSelector />
      </Grid>
    </Grid>
  );
}
