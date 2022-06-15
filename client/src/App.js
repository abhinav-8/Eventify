import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Typography,
  Grow,
  Grid,
  Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import Posts from "./components/Posts/Posts";
import Form from "./components/Form/Form";
import { getPosts } from "./actions/posts";
import useStyles from "./styles";
import memories from "./images/memories.png";

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const [display, setDisplay] = useState(false);
  const [buttonText, setButtonText] = useState("Add a new Event?");

  var handleDisplay = () => {
    if (display == false) {
      setDisplay(true);
      setButtonText("Maybe Not Now...");
    } else {
      setDisplay(false);
      setButtonText("Add a new Event?");
    }
  };

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          TECH-O-WORLD
        </Typography>
        {/* <img className={classes.image} src={memories} alt="icon" height="60" /> */}
      </AppBar>

      <Grid container justify="center">
        <Button
          className={classes.addButton}
          primary
          variant="outlined"
          onClick={handleDisplay}
        >
          {buttonText}
        </Button>
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
              <Grid align="center" item xs={12} sm={4} container spacing={2}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
                <br />
                <br />
              </Grid>
            ) : null}

            {/* <Grid item xs={12} sm={7}> */}

            {/* </Grid> */}
          </Grid>
          <Posts setCurrentId={setCurrentId} />
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
