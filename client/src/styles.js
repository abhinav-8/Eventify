import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#4842f5",
    fontFamily: "Tahoma",
  },
  image: {
    marginLeft: "15px",
  },
  addButton: {
    color: "rgba(0,183,255, 1)",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: "10px",
    fontWeight: "bolder",
  },
  loginContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh'
  },
  loginHeading: {
    marginBottom: '20px'
  },
  loginInput: {
    width: '300px',
    height: '40px',
    marginBottom: '10px',
    padding: '5px'
  },
  loginButton: {
    width: '100px',
    height: '40px',
    backgroundColor: 'blue',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px'
  },
  loginError: {
    color: 'red'
  }
}));
