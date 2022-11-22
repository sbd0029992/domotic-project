import Head from "next/head";
import React from "react";
import withSession from "../lib/session";
import Login from "./login";

export default function Index() {
  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
        <meta name='description' content='Domotic' />
      </Head>
    </React.Fragment>
  );
}
export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
  } else if (!user || user.role !== "admin") {
    res.setHeader(
      "location",
      `/switchPage/?idHome=${user.idHome}&idUser=${user.idUser}`
    );
    res.statusCode = 302;
    res.end();
  }
  return {
    props: {
      userUpdate: response.default.userUpdate,
    },
  };
});
