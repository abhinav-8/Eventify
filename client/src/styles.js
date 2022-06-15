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
}));
