"use server";

import { prisma } from "@/app/lib/prisma";

export async function getPublicEvents() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Выбираем только будущие публичные события, отсортированные по возрастанию даты
    const events = await prisma.event.findMany({
      where: { 
        isPublic: true,
        date: { gte: today }
      },
      include: {
        creatorCompany: {
          select: { name: true, logoUrl: true }
        }
      },
      orderBy: { date: "asc" },
      take: 12
    });
    
    return events;
  } catch (error) {
    console.error("Ошибка загрузки публичных ивентов:", error);
    return [];
  }
}
