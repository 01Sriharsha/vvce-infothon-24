import { db } from "../lib/db";

export const getUser = async ({
  id,
  email,
}: {
  id?: number;
  email?: string;
}) => {
  let user;
  if (id) {
    user = await db.user.findUnique({
      where: { id },
    });
  } else if (email) {
    user = await db.user.findUnique({
      where: { id },
    });
  }

  return user;
};
