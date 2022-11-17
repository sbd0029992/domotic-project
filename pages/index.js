import Head from "next/head";
import React from "react";
import withSession from "../lib/session";
import Login from "./login";

export default function Index(props) {
  const { login } = props;
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name='description' content='Domotic' />
      </Head>
      <Login login={login} />
    </React.Fragment>
  );
}

export async function getStaticProps({ locale }) {
  const response = await import(`../lang/${locale}.json`);
  return {
    props: {
      login: response.default.login,
    },
  };
}
