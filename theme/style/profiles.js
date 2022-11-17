export default (theme) => ({
  mainContainer: {
    height: "100vh",
  },

  inputContainer: {
    width: "100%",
  },

  middleInputs: {
    display: "grid",
    gap: "50px",
    justifyItems: "center",
  },
  containerClasses: {
    backgroundColor: "#fff",
    borderRadius: "10px",

    alignItems: "center",
  },
  titlePage: {
    variant: "h4",
    component: "h1",
    color: "black",
    fontWeight: "bold",
    fontSize: "30px",
    textAlign: "center",
    height: "10%",
    gap: "80px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    height: "360px",
    width: "300px",
  },
  hr: {
    width: "50%",
  },
  hiden: {
    display: "desabled",
  },

  avatar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
