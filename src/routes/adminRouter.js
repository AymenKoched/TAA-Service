import express from "express";
import { adminController } from "@/controllers";
import passport from "@/utils/passport";
import authorizeRoles from "@/middleware";


const adminRouter = express.Router();



// In each route we should add the admin authentification middleware


adminRouter.get("/api/admin/users",
  passport.authenticate('jwt', { session: false }),
  authorizeRoles.default('admin'),
  adminController.getAllUsers
);


adminRouter.get("/api/admin/users/:id", 
  passport.authenticate('jwt', { session: false }), 
  authorizeRoles.default('admin'), 
  adminController.getUserById
);

adminRouter.post("/api/admin/users",
  passport.authenticate('jwt', { session: false }),
  authorizeRoles.default('admin'), 
  adminController.createUser);

adminRouter.put("/api/admin/users/:id", 
  passport.authenticate('jwt', { session: false }),
  authorizeRoles.default('admin'),
  adminController.updateUser
);

adminRouter.delete("/api/admin/users/:id", 
  passport.authenticate('jwt', { session: false }),
  authorizeRoles.default('admin'),
  adminController.deleteUser
);


export default adminRouter;