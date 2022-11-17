export default (theme) => ({
  mainContainer: {
    height: "100vh",
    //width: "200vh",
  },
  BodyRegister: {
    width: "400px",
    //height: "",
    border: "1px solid white",
    backgroundColor: "#0f3c52",
    borderRadius: "30px",
    display: "inline-block",
    "& a ": {
      textDecoration: "none !important",
    },
  },
  bodyBack: {
    backgroundColor: "white",
    borderRadius: "10px",
    color: "white",
  },
  title2: {
    textAlign: "center",
  },
  wellcome: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "50px",
    marginBottom: "50px",
  },
  textSingIn: {
    marginBottom: "30px",
  },
  buttonSingIn: {
    marginTop: "5%",
    marginBottom: "5%",
    color: "#2bc8c8",
  },
});
