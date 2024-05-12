import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId,userName,adminMessage,setAdminMessage }) => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();

  return !posts.length ? (
    <div style={{display:"flex",color:"grey",marginTop:"150px",alignItems:"center",textAlign: 'center',justifyContent: 'center',}}>
      Please try again later but currently there are no events available to attend
    </div>
  ) : (
    <Grid
      className={classes.container}
      container
      alignItems="stretch"
      spacing={10}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={4}>
          <Post post={post} setCurrentId={setCurrentId} userName={userName} setAdminMessage={setAdminMessage}/>
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
