export default (theme) => ({
  acordion: {
    width: "100%",
    display: "inline-grid",
    padding: "10px",
  },
  devices: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    flexWrap: "wrap",
    // padding: "0px",
    // display: "grid",
    // gap: "1px",
    // placeItems: "center",
    // gridTemplateColumns: "1fr 1fr",
    // gridTemplateRows: "1fr 1fr ",
    // marginBottom: "20px",
  },
  rootPaper: {
    //dividir a tela em 3 partes
    backgroundColor: "#F5F5F5",
    display: "grid",
    margin: "20px",
    padding: "5px",
    gap: "10px",
    width: "300px",
    borderRadius: "10px",
  },
  split: {
    padding: "0px",
    display: "grid",
    gap: "1px",
    placeItems: "center",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr 1fr ",
  },

  paperTam: {
    width: "100px",
    height: "100px",
    backgroundColor: "#b3b3b3",
    borderRadius: "10px",
    border: "2px solid #000",
    margin: "10px",
  },
  Title: {
    // fontSize: "20px",
    fontWeight: "bold",
    textAlign: "center",
  },
});
