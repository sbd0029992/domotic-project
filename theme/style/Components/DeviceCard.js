export default (theme) => ({
  containerClasses: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "270px",
    height: "180px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    color: "#000",
    "& a ": {
      textDecoration: "none !important",
    },
  },
  inputContainer: {
    width: "100%",
  },
  TitleContainer: {
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      height: "10vh",
    },
    [theme.breakpoints.between("sm", "md")]: {
      height: "20vh",
    },
    [theme.breakpoints.up("md")]: {
      height: "20vh",
    },
  },
  titlePage: {
    color: "#fff",
    fontWeight: "bold",
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
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "1fr 1fr 1fr",
      gridTemplateRows: "1fr 1fr ",
    },
  },
});
