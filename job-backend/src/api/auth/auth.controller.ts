import { compareSync, hash } from "bcryptjs";
import { Request, Response } from "express";
import { db } from "../../lib/db";
import { LoginSchema, RegisterSchema } from "../../lib/zod";
import { generateToken } from "../../util/token";
import { Admin, User } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const parsedSchema = RegisterSchema.safeParse(body);

  if (parsedSchema.error) {
    return res
      .status(400)
      .json({ message: parsedSchema.error.errors[0].message });
  }

  const { data } = parsedSchema;

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return res.status(401).json({ message: "User already exists!" });
  }

  const hashedPassword = await hash(data.password, 10);

  const saveduser = await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
      role: data.role,
    },
  });

  const { password, ...user } = saveduser;

  const token = await generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res
    .json({
      message: "User registered successfully",
      data: user,
    })
    .status(201);
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;

  const parsedSchema = LoginSchema.safeParse(body);

  if (parsedSchema.error) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const { data } = parsedSchema;

  let existingUser: User | Admin;
  existingUser = await db.admin.findUnique({
    where: { email: data.email },
  });

  if (!existingUser) {
    existingUser = await db.user.findUnique({
      where: { email: data.email },
    });
  }
  if (!existingUser) {
    return res.status(401).json({ message: "User not found!" });
  }

  const isValidPass = compareSync(data.password, existingUser.password);

  if (!isValidPass) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const { password, ...user } = existingUser;

  const token = await generateToken(user);

  res.cookie("token", token, {
    httpOnly: true,
    path: "/",
  });

  return res
    .json({
      message: `Welcome back ${user.name}`,
      data: user,
    })
    .status(200);
};
