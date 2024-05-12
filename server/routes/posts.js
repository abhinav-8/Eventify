import express from "express";
const router = express.Router();
import {postController} from '../controllers/index.js' ;

router.get("/", postController.getPosts);
router.post("/",  postController.createPost);
router.get("/:id",  postController.getPost);
router.patch("/:id",  postController.updatePost);
router.delete("/:id",  postController.deletePost);
router.patch("/:id/likePost",  postController.likePost);

export default router;
