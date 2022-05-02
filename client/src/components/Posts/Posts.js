import React from "react";
import Post from "./Post/Post";

import useStyles from "./styles.js";
const Posts = () => {
  const classes = useStyles();
  return (
    <div>
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
