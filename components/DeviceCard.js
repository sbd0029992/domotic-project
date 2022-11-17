import { Box, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/DeviceCard";

const useStyles = makeStyles(style);
export function DeviceCard({ device }) {
  const classes = useStyles();
  return (
    <Link href={`/devices/${device.id}`} key={device.id}>
      <a style={{ textDecoration: "none" }}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Grid container spacing={2}>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                <strong>Device Name: </strong>
                {device.deviceName.charAt(0).toUpperCase() +
                  device.deviceName.slice(1)}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                <strong>Device URL: </strong>
                {device.urlDevice}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                <strong>Room Name: </strong> {device.roomName}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </a>
    </Link>
  );
}
