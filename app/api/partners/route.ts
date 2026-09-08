import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.partnerCategory.findMany({
      orderBy: { order: "asc" },
      include: {
        logos: {
          orderBy: { createdAt: "asc" }
        }
      }
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Ошибка при загрузке партнеров:", error);
    return NextResponse.json([], { status: 500 });
  }
}
