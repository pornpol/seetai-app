import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const db = new PrismaClient();

async function seed() {
  const passwordHash = await hash("admin", 12);

  await db.user.create({
    data: {
      name: "admin",
      email: "admin@seetai.com",
      passwordHash,
      role: "ADMIN",
    },
  });
}

seed();
