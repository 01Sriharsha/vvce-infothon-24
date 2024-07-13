import { Router } from "express";
import { register } from "./auth.controller";

export default function authRouter() {
  const router = Router();
  router.post("/register", register);
  router.post("/login", register);
  return router;
}
