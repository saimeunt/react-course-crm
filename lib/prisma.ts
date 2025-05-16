//import { PrismaBetterSQLite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaPg } from "@prisma/adapter-pg";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "@/prisma/generated/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma || new PrismaClient().$extends(withAccelerate());
