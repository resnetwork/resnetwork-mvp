"use server";

import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";

export async function seedTestData(userId: string) {
  try {
    // 1. Создаем тестовую компанию
    const company = await prisma.company.create({
      data: {
        name: "EcoTech Innovations",
        bin: "123456789012",
        status: "APPROVED",
        description: "Ведущая компания в сфере зеленой энергетики Центральной Азии.",
      },
    });

    // 2. Привязываем текущего юзера к этой компании как ADMIN
    await prisma.user.update({
      where: { id: userId },
      data: {
        companyId: company.id,
        role: "COMPANY_ADMIN",
      },
    });

    // 3. Создаем тестовый ивент от имени этой компании
    const event = await prisma.event.create({
      data: {
        title: "RES EXPO 2027",
        description: "Флагманская экологическая выставка Центральной Азии.",
        date: new Date("2027-05-20T10:00:00Z"),
        location: "EXPO Congress Centre, Астана",
        isPublic: true,
        creatorCompanyId: company.id,
      },
    });

    // 4. Генерируем билет для этого юзера на этот ивент
    await prisma.ticket.create({
      data: {
        eventId: event.id,
        userId: userId,
        status: "VALID",
      },
    });

    revalidatePath("/res365/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при сидировании:", error);
    return { success: false, error: "Ошибка при генерации тестовых данных" };
  }
}

export async function registerForEvent(eventId: string, userId: string) {
  try {
    // Проверяем, нет ли уже билета
    const existing = await prisma.ticket.findUnique({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    if (existing) {
      return { success: false, error: "Билет уже существует" };
    }

    await prisma.ticket.create({
      data: {
        eventId,
        userId,
        status: "VALID",
      }
    });

    revalidatePath("/res365/dashboard");
    revalidatePath("/res365/dashboard/tickets");
    return { success: true };
  } catch (error) {
    console.error("Ошибка регистрации:", error);
    return { success: false, error: "Ошибка при получении билета" };
  }
}

export async function createEvent(formData: FormData, userId: string, companyId: string) {
  try {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const dateStr = formData.get("date") as string;
    const location = formData.get("location") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const isPublic = formData.get("isPublic") === "on";

    if (!title || !dateStr) {
      return { success: false, error: "Название и дата обязательны" };
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(dateStr),
        location,
        imageUrl,
        isPublic,
        creatorCompanyId: companyId,
      }
    });

    revalidatePath("/res365/dashboard");
    return { success: true, eventId: event.id };
  } catch (error) {
    console.error("Ошибка при создании события:", error);
    return { success: false, error: "Не удалось создать событие" };
  }
}
