import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request , JwtPayload {
    user?: {
      id: number;
      email: string;
      role: string;
    };
  }