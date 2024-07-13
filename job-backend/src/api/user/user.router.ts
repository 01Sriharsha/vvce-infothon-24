import { Router } from "express";
import { me, updateDetails } from "./user.controller";
import { authMiddleware } from "../../middleware/auth-middleware";

export default function userRouter() {
  const router = Router();
  router.post("/update", authMiddleware, updateDetails);
  router.get("/me", authMiddleware, me);
  return router;
}
