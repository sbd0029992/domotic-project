import { Box, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/DeviceCard";

const useStyles = makeStyles(style);
export function AccessCard({ access }) {
  const classes = useStyles();
  return (
    <Link
      href={`/accesss/${access.idUser}?idUser=${access.idUser}&idDevice=${access.idDevice}`}
    >
      <a style={{ textDecoration: "none" }}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Grid container spacing={2}>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                <strong>User Name: </strong>
                {access.userName.charAt(0).toUpperCase() +
                  access.userName.slice(1)}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                <strong>Device Name: </strong>
                {access.deviceName.charAt(0).toUpperCase() +
                  access.deviceName.slice(1)}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                <strong>Room Name: </strong>
                {access.roomName.charAt(0).toUpperCase() +
                  access.roomName.slice(1)}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1'>
                <strong>Permission ID: </strong>{" "}
                {access.status == "1" ? "Granted" : "Denied"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </a>
    </Link>
  );
}
