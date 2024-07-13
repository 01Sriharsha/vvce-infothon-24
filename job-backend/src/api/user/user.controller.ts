import { Request, Response } from "express";
import { db } from "../../lib/db";
import { RegisterRoleSchema } from "../../lib/zod";
import { AuthenticatedRequest } from "../../types";

export const updateDetails = async (req: Request, res: Response) => {
  const body = req.body;

  const parsedSchema = RegisterRoleSchema.safeParse(body);

  const { data } = parsedSchema;

  const user = await db.user.findUnique({ where: { id: data.userId } });

  if (!user) {
    return res
      .json({
        message: "User not found!",
        data: user,
      })
      .status(401);
  }

  if (data.role === "STUDENT" && data.student) {
    await db.student.create({
      data: {
        userId: user.id,
        USN: data.student.USN,
        branch: data.student.branch,
        graduationYear: data.student.graduationYear,
        current_year: data.student.current_year,
        address: data.student.address,
        phone: data.student.phone,
        picture: data.student.picture,
        resume: data.student.resume,
        about: data.student.about,
        social_links: data.student.social_links,
      },
    });
  } else if (data.role === "RECRUITER" && data.recruiter) {
    await db.recruiter.create({
      data: {
        userId: user.id,
        companyName: data.recruiter.companyName,
        companyDescription: data.recruiter.companyDescription,
        position: data.recruiter.position,
        address: data.recruiter.address,
        phone: data.recruiter.phone,
        picture: data.recruiter.picture,
      },
    });
  } else if (data.role === "COORDINATOR" && data.coordinator) {
    await db.coordinator.create({
      data: {
        userId: user.id,
        department: data.coordinator.department,
        position: data.coordinator.position,
        address: data.coordinator.address,
        phone: data.coordinator.phone,
        picture: data.coordinator.picture,
      },
    });
  }

  return res.status(201).json({ message: "Data saved successfully!" });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;

  const user = await db.user.findUnique({ where: { id: userId } });

  return res.status(200).json({ data: user });
};
