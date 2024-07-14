import { Request, Response } from "express";
import { db } from "../../lib/db";
import { Role } from "@prisma/client";
import { AuthenticatedRequest } from "../../types";

// Fetch users who need verification
export const fetchUsers = async (req: Request, res: Response) => {
  const params = req.params as { role: Role };
  console.log(params);
  
  try {
    const users = await db.user.findMany({
      where: { role: params.role }, // Assuming you want to verify students
      include: {
        student: params.role === "STUDENT",
        recruiter: params.role === "RECRUITER",
        coordinator: params.role === "COORDINATOR",
      }, // Include user details
    });
    res.json({ data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Verify user
export const verifyUser = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json({ message: "You don't have access this resource!" });
  }
  const params = req.params as { id: string };

  try {
    const user = await db.user.update({
      where: { id: parseInt(params.id) },
      data: { verified: true }, // Assuming you have a verified field
    });
    res.json({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify user" });
  }
};
