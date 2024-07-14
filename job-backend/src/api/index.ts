import { Router } from "express";
import authRouter from "./auth/auth.router";
import userRouter from "./user/user.router";
import recruiterRouter from "./recruiter/recruiter.router";
import generateRouter from "./generate/generate.router";
import { adminRouter } from "./admin/admin.router";

export default function apiRouter() {
  const router = Router();
  router.use("/auth", authRouter());
  router.use("/user", userRouter());
  router.use("/recruiter", recruiterRouter());
  router.use("/transcribe", generateRouter());
  router.use("/admin", adminRouter());
  return router;
}
