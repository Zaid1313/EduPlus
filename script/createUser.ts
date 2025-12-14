// script/createUser.ts

import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";

await prisma.user.create({
  data: {
    name: "Admin",
    email: "admin@eduplus.com",
    password: await bcrypt.hash("password123", 10),
    role: "EDUCATOR",
  },
});
console.log("User created successfully");