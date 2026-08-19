import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import path from "path";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  (() => {
    const dbPath = path.join(process.cwd(), "dev.db");
    
    // В Prisma 7 передаем конфигурацию прямо в адаптер
    const adapter = new PrismaLibSql({
      url: `file:${dbPath}`
    });
    
    return new PrismaClient({ adapter, log: ["query"] });
  })();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
