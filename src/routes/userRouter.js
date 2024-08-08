import { Router } from "express";
import { authController } from "../controllers";

const userRouter = new Router();

userRouter.post("/api/login", authController.login);


export default userRouter;
