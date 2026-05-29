// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");

const globalForPrisma = globalThis as { prisma?: typeof PrismaClient.prototype };

export const prisma: typeof PrismaClient.prototype =
  globalForPrisma.prisma ?? new PrismaClient({ 
    log: ["query"],
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
