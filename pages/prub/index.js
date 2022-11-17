import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import style from "../../theme/style/Login";

const useStyles = makeStyles(style);

export default function Login() {
  const [dataResponse, setdataResponse] = useState([]);

  useEffect(() => {
    async function getPageData() {
      const apiUrlEndPoint = "http://localhost:3000/api/getdata-lib";
      const response = await fetch(apiUrlEndPoint);
      const result = await response.json();
      console.log(result.products);
      setdataResponse(result.products);
    }
    getPageData();
  }, []);

  const classes = useStyles();
  return (
    <Grid
      className={classes.mainContainer}
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
    >
      <div>
        {dataResponse.map((products) => {
          return (
            <div key={products.id}>
              <h1>{products.name}</h1>
              <h1>{products.price}</h1>
            </div>
          );
        })}
      </div>
    </Grid>
  );
}
