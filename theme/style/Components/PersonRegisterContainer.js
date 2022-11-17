export default (theme) => ({
  mainContainer: {
    height: "100vh",
    //width: "200vh",
  },
  BodyRegister: {
    width: "350px",
    padding: "20px",
    border: "1px solid white",
    backgroundColor: "#F5F5F5",
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
  title: {
    marginBottom: "10px",
    color: "black",
    display: "flex",
    justifyContent: "space-between",
    "& h1": {
      fontWeight: "500",
      fontSize: "25px",
    },
    "& a": {
      alignSelf: "center",
    },
    "& h6": {
      alignSelf: "center",
      fontSize: "15px",
      fontWeight: "400",
    },
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
  comboBox: {
    backgroundColor: "white",
    borderRadius: "10px",
  },
});
