import React, { useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import moment from "moment";
import { useDispatch } from "react-redux";

import { likePost, deletePost } from "../../../actions/posts";
import useStyles from "./styles";

const Post = ({ post, userName , setAdminMessage}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleDelete = ()=> {
    if(userName=="admin@gmail.com")
      dispatch(deletePost(post._id))
    else 
      setAdminMessage(true)
  }
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={
          post.selectedFile ||
          "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
        }
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>

      {/* EDIT POST FEATURE */}
      {/* <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => setCurrentId(post._id)}
        >
          <MoreHorizIcon fontSize="default" />
        </Button>
      </div> */}
      <div className={classes.details}>
        <Typography variant="body2" component="h2">
          Date: {post.tags.slice(0, 1).map((tag) => `${tag} `)}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h3"
        component="h2"
      >
        {post.title}
      </Typography>

      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
      </CardContent> */}

      <CardContent>
        <a href={post.message} className={classes.link} target="_blank">
          Visit Event
        </a>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(post._id))}
        >
          <ThumbUpAltIcon fontSize="small" /> &nbsp; ATTENDING EVENT? (
          {post.likeCount})
        </Button>
      </CardActions>

      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={handleDelete}
        >
          <DeleteIcon fontSize="small" /> &nbsp; DELETE EVENT
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
