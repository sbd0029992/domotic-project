export default (theme) => ({
  navbar: {
    display: "flex",
    placeContent: "center",
  },
  confirm: {
    // display: "grid",
    // gap: "10px",
    // margin: "10px",
    // padding: "1px",
    // [theme.breakpoints.down("sm")]: {
    //   gridTemplateColumns: "1fr",
    // },
    // [theme.breakpoints.between("sm", "md")]: {
    //   gridTemplateColumns: "1fr 1fr",
    //   gridTemplateRows: "1fr 1fr ",
    // },
    // [theme.breakpoints.up("md")]: {
    //   gridTemplateColumns: "1fr 1fr 1fr",
    // },
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  },
});
