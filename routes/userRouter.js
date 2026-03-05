import express from 'express';
import { changeUserInfo, createUser, getAllUsers, getUser, getUserCount, loginUser, updateUserType } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get("/", getUser);
userRouter.get("/customers", getAllUsers);
userRouter.get("/count", getUserCount);
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.put("/update", changeUserInfo);
userRouter.put("/:email", updateUserType);

export default userRouter;