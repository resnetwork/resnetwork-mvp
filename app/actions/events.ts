"use server";

import { prisma } from "@/app/lib/prisma";

export async function getPublicEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { isPublic: true },
      include: {
        creatorCompany: {
          select: { name: true, logoUrl: true }
        }
      },
      orderBy: { date: "asc" },
      take: 6
    });
    
    return events;
  } catch (error) {
    console.error("Ошибка загрузки публичных ивентов:", error);
    return [];
  }
}
