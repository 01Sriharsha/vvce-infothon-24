import { Router } from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import recruiterRouter from "./recruiter/recruiter.router";

export default function apiRouter() {
  const router = Router();
  router.use("/auth", authRouter());
  router.use("/user", userRouter());
  router.use("/recruiter", recruiterRouter());
  return router;
}
