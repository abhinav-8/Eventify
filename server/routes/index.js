import express from "express";
const router = express.Router();
import userRoutes from './userRoutes.js';
import postRoutes from './posts.js';

router.use("/user",userRoutes);
router.use("/posts",postRoutes);
export default router;