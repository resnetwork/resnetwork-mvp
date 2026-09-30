import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 5,                    // Макс. кол-во соединений (для serverless лучше меньше)
      idleTimeoutMillis: 30000,  // Закрывать idle соединения через 30 сек
      connectionTimeoutMillis: 10000, // Таймаут на подключение 10 сек (вместо бесконечного ожидания)
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter, log: ["error"] });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
