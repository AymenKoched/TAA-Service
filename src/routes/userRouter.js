import { Router } from "express";
import { authController } from "../controllers";
import passport from "@/utils/passport";
import authorizeRoles from "@/middleware";

const userRouter = new Router();

userRouter.post("/api/login", authController.login);

userRouter.post("/api/register", authController.register);


userRouter.get("/api/protected",passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json({ message: "Welcome to the User API" });
});

userRouter.get("/api/protected/adminonly",passport.authenticate('jwt', { session: false }), 
  authorizeRoles.default('admin'), (req, res) => {
    res.status(200).json({
      message: "Welcome to the User API" });
  });

export default userRouter;
