import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import { config } from "../util/constant";

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: "Access denied, no token provided" });
  }

  try {
    const user = jwt.verify(
      token,
      config.jwt.secretkey
    ) as AuthenticatedRequest["user"];
    if (!req.user) {
      req.user = user;
    }
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};
