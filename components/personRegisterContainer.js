import { React, useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/PersonRegisterContainer";
import Paper from "@mui/material/Paper";
import { Button, Grid, TextField } from "@material-ui/core";
import { Typography, Box } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles(style);

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function personRegisterContainer(props) {
  const { registerPage } = props;
  console.log(
    "🚀 ~ file: personRegisterContainer.js ~ line 30 ~ personRegisterContainer ~ registerPage",
    registerPage
  );
  const classes = useStyles();
  const [person, setperson] = useState({
    firstName: "",
    lastName: "",
    gender: "M",
    birthDate: new Date().toISOString().split("T")[0],
    idHome: 10,
    userName: "",
    password: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (router.query.id) {
      await axios.put("/api/personRegister/" + router.query.id, person);
    } else {
      await axios.post("api/personRegister", person);
    }
    router.push("/login");
  };

  const handleChange = ({ target: { name, value } }) =>
    setperson({ ...person, [name]: value });

  useEffect(() => {
    const getPersons = async () => {
      const { data } = await axios.get(
        "/api/personRegister/" + router.query.id
      );

      setperson({
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        birthDate: data.birthDate.split("T")[0],
        idHome: data.idHome,
        userName: data.userName,
        password: data.password,
      });
    };

    if (router.query.id) {
      getPersons(router.query.id);
    }
  }, [router.query.id]);

  const renderDates = () => {
    if (router.query.id) {
      return (
        <React.Fragment>
          <Typography variant='h4' component='h1'>
            {person.id} and <strong> {person.role}</strong>
          </Typography>
        </React.Fragment>
      );
    } else {
      return null;
    }
  };

  return (
    <Grid
      className={classes.mainContainer}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <form onSubmit={handleSubmit}>
        <Container className={classes.BodyRegister}>
          <Grid container spacing={1} justifyContent='center'>
            <Grid
              container
              item
              className={classes.title}
              justifyContent='center'
            >
              <Typography variant='h4' component='h1'>
                {router.query?.id ? "Actualizar Perfil" : "Registrarse"}
              </Typography>
              <Link href='/login'>
                <Typography variant='h6' component='h6'>
                  Ingresar
                </Typography>
              </Link>
            </Grid>

            <Grid container item justifyContent='center'>
              <Grid container spacing={2}>
                <Grid container item>
                  <TextField
                    htmlFor='firstName'
                    id='firstName'
                    className={classes.bodyBack}
                    label='Nombres'
                    variant='outlined'
                    type='text'
                    name='firstName'
                    onChange={handleChange}
                    fullWidth
                    autoFocus='true'
                    required
                    value={person.firstName}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    htmlFor='lastName'
                    id='lastName'
                    className={classes.bodyBack}
                    label='Apellidos'
                    variant='outlined'
                    type='text'
                    name='lastName'
                    onChange={handleChange}
                    fullWidth
                    required
                    value={person.lastName}
                  />
                </Grid>

                <Grid item>
                  <Box sx={{ minWidth: 155 }}>
                    <FormControl fullWidth>
                      <InputLabel>gender</InputLabel>
                      <Select
                        htmlFor='gender'
                        id='gender'
                        label='Genero'
                        className={classes.comboBox}
                        variant='outlined'
                        type='text'
                        name='gender'
                        onChange={handleChange}
                        fullWidth
                        required
                        value={person.gender}
                      >
                        <MenuItem selected={true} value={"M"}>
                          Masculino
                        </MenuItem>
                        <br />
                        <MenuItem value={"F"}>Femenino</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                <Grid item>
                  <TextField
                    htmlFor='birthDate'
                    id='birthDate'
                    className={classes.bodyBack}
                    variant='outlined'
                    type='date'
                    name='birthDate'
                    onChange={handleChange}
                    fullWidth
                    required
                    inputProps={{
                      min: "1960-01-01",
                      max: new Date().toISOString().split("T")[0],
                    }}
                    value={person.birthDate}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    htmlFor='idHome'
                    id='idHome'
                    className={classes.bodyBack}
                    label='Id Hogar'
                    variant='outlined'
                    type='number'
                    name='idHome'
                    onChange={handleChange}
                    fullWidth
                    required
                    value={person.idHome}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    htmlFor='userName'
                    id='userName'
                    className={classes.bodyBack}
                    label='Nombre de Usuario'
                    variant='outlined'
                    type='text'
                    name='userName'
                    onChange={handleChange}
                    fullWidth
                    required
                    value={person.userName}
                  />
                </Grid>
                <Grid container item>
                  <TextField
                    htmlFor='password'
                    id='password'
                    className={classes.bodyBack}
                    // label='Password'
                    label='Contraseña'
                    variant='outlined'
                    type='password'
                    name='password'
                    onChange={handleChange}
                    fullWidth
                    required
                    value={person.password}
                    // value={router.query?.id ? null : person.password}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid container justify='center' className={classes.buttonSingIn}>
              <Button type='submit' variant='contained' color='primary'>
                {router.query?.id ? "Update" : "Register"}
              </Button>
            </Grid>
          </Grid>
        </Container>
        <ToastContainer />
      </form>
    </Grid>
  );
}
export default personRegisterContainer;

export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);
  return {
    props: {
      registerPage: response.default.registerPage,
    },
  };
}
