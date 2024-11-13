import express  from "express";
import multer from "multer";
import isAuthenticated from './../middlewares/isAthenticated.js';
import { register,login,updateProfile,logout } from "../Controller/user.controller.js";
const userRouter=express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

userRouter.route("/register").post(upload.single('file'), register);
userRouter.route("/login").post(upload.none(),login);

userRouter.route("/logout").get(logout);
userRouter.route("/profile/update").post(isAuthenticated,upload.single('file'),updateProfile);
export default userRouter;
