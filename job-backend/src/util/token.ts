import jwt from "jsonwebtoken";
import { config } from "./constant";
import { AuthenticatedRequest } from "../types";

export const generateToken = async (user: AuthenticatedRequest["user"]) => {
  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.secretkey,
    { expiresIn: "1h" }
  );

  return token;
};
