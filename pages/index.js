import Head from "next/head";
import React from "react";
import Login from "./login";

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name='description' content='Domotic' />
      </Head>
      <Login />
    </React.Fragment>
  );
}
