import { Router } from "express";
import { userController } from "../controllers";

const userRouter = new Router();

userRouter.get("/api/users", userController.getAllTheUsers);

userRouter.post("/api/users", userController.createUser);

userRouter.put("/api/users/:userId", userController.updateUser);

userRouter.get("/api/users/:userId", userController.getOneUser);

userRouter.delete("/api/users/:userId", userController.deleteUser);

export default userRouter;
