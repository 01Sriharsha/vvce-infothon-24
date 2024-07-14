import { Request, Response } from "express";
import { db } from "../../lib/db";
import { RegisterRoleSchema } from "../../lib/zod";
import { AuthenticatedRequest } from "../../types";
import { getUser } from "../../util/user";

export const updateDetails = async (req: Request, res: Response) => {
  const data = req.body as RegisterRoleSchema;
  console.log(data);
  
  let user = await db.user.findUnique({ where: { id: data.userId } });

  if (!user) {
    return res
      .json({
        message: "User not found!",
        data: user,
      })
      .status(401);
  }

  let savedUser;

  if (data.role === "STUDENT" && data.student) {
    savedUser = await db.student.create({
      data: {
        user: { connect: { id: user.id } },
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
    savedUser = await db.recruiter.create({
      data: {
        user: { connect: { id: user.id } },
        companyName: data.recruiter.companyName,
        companyDescription: data.recruiter.companyDescription,
        position: data.recruiter.position,
        address: data.recruiter.address,
        phone: data.recruiter.phone,
        picture: data.recruiter.picture,
        social_links: data.recruiter.social_links,
      },
    });
  } else if (data.role === "COORDINATOR" && data.coordinator) {
    savedUser = await db.coordinator.create({
      data: {
        user: { connect: { id: user.id } },
        department: data.coordinator.department,
        position: data.coordinator.position,
        address: data.coordinator.address,
        phone: data.coordinator.phone,
        picture: data.coordinator.picture,
        social_links: data.coordinator.social_links,
      },
    });
  }

  if (!savedUser) {
    return res.status(500).json({ data: "Failed to save user details" });
  }

  return res.status(201).json({ message: "Data saved successfully!" });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user.id;

  const user = await getUser({ id: userId });

  return res.status(200).json({ data: user });
};
