import express from "express";
import { getAllUsers, loginUser, registerUser } from "../controllers/user.controller";

// user router
const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/all', getAllUsers);

userRouter.post('/login', loginUser);

export default userRouter;