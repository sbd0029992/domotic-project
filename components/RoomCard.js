import { Box, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/RoomCard";

const useStyles = makeStyles(style);
export function RoomCard({ room }) {
  const classes = useStyles();
  return (
    <Link href={`/rooms/${room.id}`} key={room.id}>
      <a style={{ textDecoration: "none" }}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Grid container spacing={2} justifyContent='center'>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                {room.roomName.charAt(0).toUpperCase() + room.roomName.slice(1)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </a>
    </Link>
  );
}
