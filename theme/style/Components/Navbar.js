export default (theme) => ({
  mainContainer: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginTop: "2%",
    marginBottom: "5%",
    padding: "10px",
    width: "fit-content",
    display: "flex",
    placeContent: "center",

    [theme.breakpoints.down("sm")]: {
      marginTop: "5%",
    },
  },
  navbarMain: {
    borderRadius: "10px",
  },
  items: {
    display: "flex",
  },
  Title: {
    alignSelf: "center",
    fontWeight: "300",
    fontSize: "1.2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  buttonIcon: {
    fontSize: ".8rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".5rem",
    },
  },
  menu: {
    marginTop: "40px",
  },
});
