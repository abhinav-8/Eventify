import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
  Input,
  Snackbar,
} from "@material-ui/core";
import Axios from "axios";
import { useDispatch } from "react-redux";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { getPosts } from "./actions/posts";
import useStyles from "./styles";
import memories from "./images/memories.png";

// import video from "../src/images/video2.mp4";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [adminMessage, setAdminMessage] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [signup, setSignup] = useState(false);
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const [display, setDisplay] = useState(false);
  // const [buttonText, setButtonText] = useState("Add a new Event?");

  var handleDisplay = () => {
    if (display == false) {
      setDisplay(true);
      // setButtonText("Event Added!");
    } else {
      setDisplay(false);
      // setButtonText("Add a new Event?");
    }
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAdminMessage(false);
  };
  // const [jwt, setJwt] = useState(null);
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    if (logged == false) {
      const token = localStorage.getItem("jwt");
      if (token) handleisAuthenticated(token);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/user/signin",
        new URLSearchParams({
          userName: username,
          password: password,
        })
      );
      const data = response.data.data;
      console.log(data);
      if (response.data.success == true) {
        console.log("Login successful");
        localStorage.setItem("jwt", data.token);
        setLogged(true);
        setUsername(data.userName);
        setFirstName(data.firstName);
        setError("");
      } else {
        setError("Username or password is incorrect");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Username or password is incorrect");
    }
  };
  const handleSignup = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:5000/api/user/signup",
        new URLSearchParams({
          userName: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
        })
      );
      const data = response.data.data;
      console.log(data);
      if (response.data.success == true) {
        console.log("Signup successful");
        localStorage.setItem("jwt", data.token);
        setLogged(true);
        setUsername(data.userName);
        setFirstName(data.firstName);
        setError("");
      } else {
        setError("Validation Error or User Exists");
      }
    } catch (error) {
      console.error("Error while doing signup:", error);
      setError("Validation Error or User Exists");
    }
  };
  const handleisAuthenticated = async (token) => {
    try {
      const response = await Axios.get(
        "http://localhost:5000/api/user/isAuthenticated",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = response.data.data;
      console.log(data);
      if (response.data.success == true) {
        console.log("Signin successful");
        setUsername(data.userName);
        setFirstName(data.firstName);
        setLogged(true);
      } else {
        setLogged(false);
      }
    } catch (error) {
      console.error("Error while verifying jwt:", error);
    }
  };

  return (
    <div>
      {!logged ? (
        signup ? (
          <div className={classes.loginContainer}>
            <h2 className={classes.loginHeading}>SIGNUP TO EVENTIFY</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.loginInput}
            />
            <input
              type="text"
              placeholder="Firstname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={classes.loginInput}
            />
            <input
              type="text"
              placeholder="Lastname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={classes.loginInput}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.loginInput}
            />
            <button onClick={handleSignup} className={classes.loginButton}>
              Signup
            </button>
            <div>
              Already have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setSignup(false)}
              >
                Login
              </span>
            </div>
            {error && <p className={classes.loginError}>{error}</p>}
          </div>
        ) : (
          <div className={classes.loginContainer}>
            <h2 className={classes.loginHeading}>LOGIN TO EVENTIFY</h2>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.loginInput}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.loginInput}
            />
            <button onClick={handleLogin} className={classes.loginButton}>
              Login
            </button>
            <div>
              Don't have an account?{" "}
              <span
                style={{ color: "blue", cursor: "pointer" }}
                onClick={() => setSignup(true)}
              >
                Signup
              </span>
            </div>
            {error && <p className={classes.loginError}>{error}</p>}
          </div>
        )
      ) : (
        <Container maxWidth="lg">
          {/* <video
      autoPlay
      loop
      muted
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        left: "50%",
        top: "50%",
        height: "100%",
        objectFit: "cover",
        transform: "translate(-50%,-50%)",
        zIndex: "-1",
        objectFit: "cover",
      }}
    >
      <source src={video} type="video/mp4"></source>
    </video> */}
          <AppBar className={classes.appBar} position="static" color="inherit">
            <Typography className={classes.heading} variant="h2" align="center">
              EVENTIFY
            </Typography>
            <Snackbar
              open={adminMessage}
              autoHideDuration={1000}
              onClose={handleClose}
              message="Only Admin Can Delete Posts"
            />
            {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
          </AppBar>
          <Grid container justify="center">
            <Button
              className={classes.addButton}
              primary
              variant="outlined"
              onClick={handleDisplay}
            >
              Add a New Event?
            </Button>
            <button
              style={{
                color: "white",
                backgroundColor: "blue",
                borderRadius: "10px",
                marginLeft: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => {
                localStorage.removeItem("jwt");
                setLogged(false);
              }}
            >
              Logout
            </button>
          </Grid>
          <br />
          <br />
          <Grow in>
            <Container>
              <Grid
                container
                style={{ display: "flex", justifyContent: "center" }}
                justify="space-between"
                alignItems="stretch"
                spacing={3}
              >
                {display ? (
                  <Grid
                    align="center"
                    item
                    xs={12}
                    sm={4}
                    container
                    spacing={2}
                  >
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                    <br />
                    <br />
                  </Grid>
                ) : null}

                {/* <Grid item xs={12} sm={7}> */}

                {/* </Grid> */}
              </Grid>
              <Posts
                setCurrentId={setCurrentId}
                userName={username}
                adminMessage={adminMessage}
                setAdminMessage={setAdminMessage}
              />
            </Container>
          </Grow>
        </Container>
      )}
    </div>
  );
};

export default App;
