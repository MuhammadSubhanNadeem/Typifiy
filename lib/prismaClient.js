import { PrismaClient } from "../prisma/generated/prisma";

const globalForPrisma = globalThis;

const prisma = globalForPrisma.prisma || new PrismaClient();

// Prevent multiple instances in dev
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
