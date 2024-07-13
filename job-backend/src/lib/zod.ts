import z from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  email: z.string().email("Invalid email").min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
  role: z.enum(["STUDENT", "RECRUITER", "COORDINATOR"]),
});

export const RegisterRoleSchema = z.object({
  userId: z.number(),
  role: z.enum(["STUDENT", "RECRUITER", "COORDINATOR"]),
  student: z
    .object({
      USN: z.string().min(1, { message: "USN cannot be empty" }),
      branch: z.string().min(1, { message: "Branch cannot be empty" }),
      graduationYear: z.number(),
      current_year: z.number(),
      address: z.string().optional(),
      phone: z.string().optional(),
      picture: z.string().optional(),
      resume: z.string().optional(),
      about: z.string().optional(),
      social_links: z.any().optional(),
    })
    .optional(),
  recruiter: z
    .object({
      companyName: z
        .string()
        .min(1, { message: "Company Name cannot be empty" }),
      companyDescription: z
        .string()
        .min(1, { message: "Company Description cannot be empty" }),
      position: z.string().min(1, { message: "Position cannot be empty" }),
      address: z.string().optional(),
      phone: z.string().optional(),
      picture: z.string().optional(),
    })
    .optional(),
  coordinator: z
    .object({
      department: z.string().min(1, { message: "Department cannot be empty" }),
      position: z.string().min(1, { message: "Position cannot be empty" }),
      address: z.string().optional(),
      phone: z.string().optional(),
      picture: z.string().optional(),
    })
    .optional(),
});

export const LoginSchema = z.object({
  email: z.string().min(1, "Email cannot be empty"),
  password: z.string().min(1, "Password cannot be empty"),
});

export const JobSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  duration: z.string().min(1, { message: "Duration is required" }),
  package: z.string().min(1, { message: "Package is required" }),
  min_cgpa: z.string().min(1, { message: "Minimum CGPA is required" }),
});

export type RegisterSchema = z.infer<typeof RegisterSchema>;
export type LoginSchema = z.infer<typeof LoginSchema>;
export type JobSchema = z.infer<typeof JobSchema>;
export type RegisterRoleSchema = z.infer<typeof RegisterRoleSchema>;
