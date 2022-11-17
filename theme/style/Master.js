export default (theme) => ({
  mainContainer: {
    // height: "100vh",
  },
  containerClasses: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "300px",
  },
  inputContainer: {
    width: "100%",
  },
  titlePage: {
    color: "#fff",
    fontWeight: "bold",
  },
  titleContainer: {
    margin: "3%",
  },
  middleInputs: {
    display: "grid",
    gap: "20px",
    justifyItems: "center",

    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
    [theme.breakpoints.between("sm", "md")]: {
      gridTemplateColumns: "1fr 1fr",
      gridTemplateRows: "1fr 1fr ",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
    },
  },
});
