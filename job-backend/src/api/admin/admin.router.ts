import { Router } from "express";
import { fetchUsers, verifyUser } from "./admin.controller";
import { authMiddleware } from "../../middleware/auth-middleware";

export const adminRouter = () => {
  const router = Router();
  router.post("/users/:role", fetchUsers);
  router.post("/user/verify/:id", authMiddleware, verifyUser);
  return router;
};
