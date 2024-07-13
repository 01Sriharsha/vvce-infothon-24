import { compareSync, hash } from "bcryptjs";
import { Request, Response } from "express";
import { db } from "../../lib/db";
import { LoginSchema, RegisterSchema } from "../../lib/zod";
import { generateToken } from "../../util/token";

export const register = async (req: Request, res: Response) => {
  const body = req.body;

  const parsedSchema = RegisterSchema.safeParse(body);

  if (parsedSchema.error) {
    return res.json({ message: "Invalid data" }).status(400);
  }

  const { data } = parsedSchema;

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    return res.json({ message: "User already exists!" }).status(401);
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
    return res.json({ message: "Invalid data" }).status(400);
  }

  const { data } = parsedSchema;

  const existingUser = await db.user.findUnique({
    where: { email: data.email },
  });

  if (!existingUser) {
    return res.json({ message: "User not found!" }).status(401);
  }

  const isValidPass = compareSync(data.password, existingUser.password);

  if (!isValidPass) {
    return res.json({ message: "Invalid credentials!" }).status(401);
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
