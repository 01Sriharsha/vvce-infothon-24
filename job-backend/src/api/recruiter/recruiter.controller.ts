import { Response } from "express";
import { AuthenticatedRequest } from "../../types";
import { JobSchema } from "../../lib/zod";
import { db } from "../../lib/db";
import { getUser } from "../../util/user";

export const createJob = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const recruiter = await getUser({ id: req.user.id });
    // Check if the user is a recruiter
    if (recruiter.role !== "RECRUITER") {
      return res
        .status(403)
        .json({ error: "Access denied, only recruiters can add jobs" });
    }

    // Validate input
    const parsedSchema = JobSchema.safeParse(req.body);

    if (parsedSchema.error) {
      return res
        .json({ message: parsedSchema.error.errors[0].message })
        .status(400);
    }

    const { data } = parsedSchema;

    // Create job
    const newJob = await db.job.create({
      data: {
        title: data.title,
        type: data.type,
        description: data.description,
        duration: data.duration,
        min_cgpa: data.min_cgpa,
        package: data.package,
        recruiterId: recruiter.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Job added successfully!", data: newJob });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
