import { Admin, User } from "@prisma/client";
import { db } from "../lib/db";

export const getUser = async ({
  id,
  email,
}: {
  id?: number;
  email?: string;
}) => {
  let user: User | Admin;
  if (id) {
    user = await db.admin.findUnique({
      where: { id },
    });
  } else if (email) {
    user = await db.admin.findUnique({
      where: { id },
    });
  }

  if (!user) {
    if (id) {
      user = await db.user.findUnique({
        where: { id },
      });
    } else if (email) {
      user = await db.user.findUnique({
        where: { id },
      });
    }
  }

  return user;
};
