import { Router } from "express";
import { login, register } from "./auth.controller";

export default function authRouter() {
  const router = Router();
  router.post("/register", register);
  router.post("/login", login);
  return router;
}
