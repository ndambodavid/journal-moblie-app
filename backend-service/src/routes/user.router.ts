import express from "express";
import { getAllUsers, loginUser, registerUser, updateUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

// user router
const userRouter = express.Router();

userRouter.post('/register', registerUser);

userRouter.get('/all', isAuthenticated, getAllUsers);

userRouter.post('/login', loginUser);

userRouter.put('/update', isAuthenticated, updateUser);

export default userRouter;