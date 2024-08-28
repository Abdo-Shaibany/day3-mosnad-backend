import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: "admin",
      password: bcrypt.hashSync("password", 10),
      email: "admin@admin.com",
    }
  })
}

main()
  .catch((e) => console.log)
  .finally(() => prisma.$disconnect());