import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  // Hosted (Vercel / production): the Turso database named by TURSO_DATABASE_URL.
  // Local development without those variables: the SQLite file dev.db at the project
  // root (resolved to an absolute path — DATABASE_URL in .env is relative to
  // prisma/schema.prisma, which the app runtime doesn't share).
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  const adapter = tursoUrl
    ? new PrismaLibSql({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN })
    : new PrismaLibSql({ url: `file:${path.join(process.cwd(), "dev.db")}` });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
