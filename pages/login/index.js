import { Button, Grid, Link, TextField } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { useState } from "react";
import style from "../../theme/style/Login";
import { userServiceFactory } from "../../clientServices/userService";
import useUser from "../../lib/useUser";
import LenguageSelector from "../../components/LenguageSelector";

const userService = userServiceFactory();

const useStyles = makeStyles(style);

export default function Login(props) {
  console.log("🚀 ~ file: index.js ~ line 17 ~ Login ~ props", props);
  const { login } = props;
  const classes = useStyles();
  const { user, mutateUser } = useUser({
    redirectTo: "/first",
    redirectIfFound: true,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [home, setHome] = useState("");

  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const homeHandler = (e) => {
    setHome(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      mutateUser(await userService.login(username, password, home));
    } catch (error) {
      alert(error.response.data.error);
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
      {!user ? (
        <h1>Loading....</h1>
      ) : (
        <>
          {!user.isLoggedIn && (
            <Container className={classes.containerLogin}>
              <Grid container className={classes.wellcome}>
                <Typography variant='h3' component='h1'>
                  {login.wellcome}
                </Typography>
                <Box>
                  <LenguageSelector />
                  <Typography variant='h6'>{login.account} </Typography>
                  <Link href='/register'>{login.register}</Link>
                </Box>
              </Grid>
              <Grid container className={classes.textSingIn}>
                <Typography variant='h2' component='h2'>
                  {login.signIn}
                </Typography>
              </Grid>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid container item>
                    <TextField
                      id='home'
                      label={login.idHome}
                      variant='outlined'
                      onChange={homeHandler}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid container item>
                    <TextField
                      id='userName'
                      label={login.userName}
                      variant='outlined'
                      onChange={usernameHandler}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid container item>
                    <TextField
                      id='password'
                      label={login.password}
                      variant='outlined'
                      type='password'
                      onChange={passwordHandler}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid
                    container
                    justifyContent='center'
                    className={classes.buttonSingIn}
                  >
                    <Button type='submit' variant='contained' color='primary'>
                      {login.signIn}
                    </Button>
                  </Grid>
                  {/* <Grid container justifyContent='flex-end'>
                    <Typography variant='h6'>
                      <Link href='/'>Forgot Password?</Link>
                    </Typography>
                  </Grid> */}
                </Grid>
              </form>
            </Container>
          )}
        </>
      )}
    </Grid>
  );
}

export async function getStaticProps({ locale }) {
  const response = await import(`../../lang/${locale}.json`);
  return {
    props: {
      login: response.default.login,
    },
  };
}
