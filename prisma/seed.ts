// prisma/seed.ts

import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: "Educator",
      email: "educator@eduplus.com",
      password: await bcrypt.hash("EduPlus@123", 10),
      role: "EDUCATOR",
    },
  });

  await prisma.user.create({
    data: {
      name: "Student",
      email: "student@eduplus.com",
      password: await bcrypt.hash("EduPlus@123", 10),
      role: "STUDENT",
    },
  });

  console.log("Demo users created");
}

main()
  .catch((e) => {
    console.error("[seed.ts] error: ",e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
