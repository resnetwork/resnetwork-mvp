import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export const revalidate = 60; // кэш на 60 секунд

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await prisma.event.findMany({
      where: { 
        isPublic: true,
        OR: [
          { date: { gte: today } },
          { endDate: { gte: today } }
        ]
      },
      select: {
        id: true,
        title: true,
        description: true,
        date: true,
        endDate: true,
        format: true,
        locationCity: true,
        locationStreet: true,
        locationVenue: true,
        imageUrl: true,
        isPublic: true,
        featuredOrder: true,
        eventType: true,
        sourceUrl: true,
        twoGisUrl: true,
        creatorCompany: {
          select: { name: true }
        }
      },
      orderBy: { date: "asc" },
      take: 12
    });
    
    return NextResponse.json(events);
  } catch (error) {
    console.error("Ошибка загрузки публичных ивентов:", error);
    return NextResponse.json([]);
  }
}
