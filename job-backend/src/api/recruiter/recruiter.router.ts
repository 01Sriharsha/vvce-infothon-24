import { Router } from "express";
import { createJob } from "./recruiter.controller";
import { authMiddleware } from "../../middleware/auth-middleware";

export default function recruiterRouter() {
  const router = Router();
  router.post("/create/job", authMiddleware, createJob);
  return router;
}
