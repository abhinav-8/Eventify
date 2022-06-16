import React, { useState, useEffect } from "react";
import {
  Snackbar,
  SnackbarContent,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import CancelIcon from "@material-ui/icons/Cancel";

import useStyles from "./styles";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const handleToastClick = (newState) => () => {
    setState({ open: true, ...newState });
  };

  const handleToastClose = () => {
    setState({ ...state, open: false });
  };

  const [closeForm, setCloseForm] = useState(false);

  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
    } else {
      dispatch(updatePost(currentId, postData));
      clear();
    }
  };

  const handleFormView = () => {
    setCloseForm(true);
  };

  return (
    <>
      {closeForm == false ? (
        <Paper>
          <Box className={classes.paper}>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              <Typography variant="h6">
                {currentId ? `Editing "${post.title}"` : "Enter Event Details"}
              </Typography>
              <CancelIcon
                style={{ marginLeft: "150px", fontSize: "20px" }}
                onClick={handleFormView}
              />
              <TextField
                name="creator"
                variant="outlined"
                label="Event"
                fullWidth
                value={postData.creator}
                onChange={(e) =>
                  setPostData({ ...postData, creator: e.target.value })
                }
              />

              <TextField
                name="title"
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={postData.title}
                onChange={(e) =>
                  setPostData({ ...postData, title: e.target.value })
                }
              />

              <TextField
                name="message"
                variant="outlined"
                label="Event Link"
                fullWidth
                value={postData.message}
                onChange={(e) =>
                  setPostData({ ...postData, message: e.target.value })
                }
              />

              <TextField
                name="tags"
                variant="outlined"
                label="Date (DD/MM/YYYY)"
                fullWidth
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value.split(",") })
                }
              />

              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, selectedFile: base64 })
                  }
                />
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth
                onClick={handleToastClick({
                  vertical: "bottom",
                  horizontal: "right",
                })}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="small"
                onClick={clear}
                fullWidth
              >
                Clear
              </Button>
            </form>
          </Box>
        </Paper>
      ) : null}

      {/* <Button style={{ color: "red" }} onClick={handleToast}>
        Open simple snackbar
      </Button> */}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleToastClose}
      >
        <Typography
          style={{
            backgroundColor: "#0af0f0",
            color: "white",
            width: "250px",
            border: "2px solid white",
            borderRadius: "5px",
          }}
        >
          EVENT ADDED!
        </Typography>
      </Snackbar>
    </>
  );
};

export default Form;
