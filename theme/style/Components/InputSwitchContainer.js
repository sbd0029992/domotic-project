export default (theem) => ({
  containerClasses: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    width: "270px",
    height: "190px",
  },
  inputContainer: {
    width: "100%",
  },
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  buttons: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "100%",
  },
});
