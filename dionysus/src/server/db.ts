import { PrismaClient } from "@prisma/client";

import { env } from "@/env";

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Auto reconnect if the database is unreachable
async function connectWithRetry() {
  try {
    await db.$connect();
    console.log("Successfully DB connected!");
  } catch (error) {
    console.error("Database connection failed! retrying in 5s....", error);
    setTimeout(connectWithRetry, 5000);
  }
}

connectWithRetry();

// Keep Neon connection alive by running a periodic query
setInterval(
  async () => {
    try {
      await db.$queryRaw`SELECT 1;`;
      console.log(" Database keep alive ping successfully.");
    } catch (error) {
      console.error("Database keep-alive ping failed.", error);
      connectWithRetry();
    }
  },
  4 * 60 * 1000,
); // Every 4 minutes
