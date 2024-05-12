import express from "express";
const router = express.Router();
import {userController} from '../controllers/index.js' ;
import { userAuth } from "../middlewares/index.js" ;

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.patch("/",userAuth.isAuthenticated, userController.update);
router.get("/isAuthenticated", userController.isAuthenticated);
router.get("/bulk", userController.search);

export default router;