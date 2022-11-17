export default (theme) => ({
  mainContainer: {
    height: "100vh",
  },
  tableFormat: {
    //formato a la tabala
    width: "100%",
    borderCollapse: "collapse",
    "& td, & th": {
      border: "1px solid rgba(224, 224, 224, 1)",
      padding: "10px",
    },
    minWidth: 650,
  },
  divconfig: {
    //color de fondo
    backgroundColor: "rgba(255, 255, 255, 0.5)",

    with: "50%",
    height: "50%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    padding: "20px",
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "5px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
