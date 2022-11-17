import { Box, Grid, Typography } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import style from "../theme/style/Components/DeviceCard";

const useStyles = makeStyles(style);
export function HomeCard({ home }) {
  const classes = useStyles();
  return (
    <Link href={`/homes/${home.id}`} key={home.id}>
      <a style={{ textDecoration: "none" }}>
        <Box container sx={{ p: 2 }} className={classes.containerClasses}>
          <Grid container spacing={2}>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                <strong>Home ID: </strong>
                {home.id}
              </Typography>
            </Grid>
            <Grid item sx>
              <Typography variant='h4' component='h1' color='black'>
                <strong>Home Address: </strong>
                {home.address.charAt(0).toUpperCase() + home.address.slice(1)}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </a>
    </Link>
  );
}
