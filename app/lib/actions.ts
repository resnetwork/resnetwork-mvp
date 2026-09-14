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
    const sourceUrl = formData.get("sourceUrl") as string;
    const imageFile = formData.get("imageFile") as File | null;
    const isPublic = formData.get("isPublic") === "on";

    if (!title || !dateStr) {
      return { success: false, error: "Название и дата обязательны" };
    }

    let imageUrl = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = await imageFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      imageUrl = `data:${imageFile.type};base64,${base64}`;
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        date: new Date(dateStr),
        location,
        imageUrl,
        sourceUrl,
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

import { auth } from "@/auth";

export async function changePassword(newPassword: string) {
  try {
    const session = await auth();
    const userId = session?.user?.id;
    
    if (!userId) {
      return { success: false, error: "Не авторизован" };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "Пароль должен содержать минимум 6 символов" };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { password: newPassword }
    });

    if (updatedUser.email) {
      const { sendPasswordChangeEmail } = await import('@/app/lib/email');
      await sendPasswordChangeEmail(updatedUser.email, newPassword);
    }

    return { success: true };
  } catch (error) {
    console.error("Ошибка при смене пароля:", error);
    return { success: false, error: "Не удалось сменить пароль" };
  }
}

export async function deleteAccount(companyId: string) {
  try {
    const session = await auth();
    // Простейшая проверка админа
    if (!session?.user?.id) {
      return { success: false, error: "Не авторизован" };
    }

    // Находим всех пользователей компании
    const users = await prisma.user.findMany({ where: { companyId } });
    const userIds = users.map(u => u.id);

    // Находим все события, созданные этой компанией
    const events = await prisma.event.findMany({ where: { creatorCompanyId: companyId } });
    const eventIds = events.map(e => e.id);

    // Удаляем все билеты, связанные с этими событиями ИЛИ с этими пользователями
    await prisma.ticket.deleteMany({
      where: {
        OR: [
          { eventId: { in: eventIds } },
          { userId: { in: userIds } }
        ]
      }
    });

    // Удаляем все события этой компании (если они есть)
    await prisma.event.deleteMany({
      where: { creatorCompanyId: companyId }
    });

    // Удаляем всех пользователей этой компании
    await prisma.user.deleteMany({
      where: { companyId }
    });

    // Удаляем саму компанию
    await prisma.company.delete({
      where: { id: companyId }
    });

    revalidatePath("/res365/admin");
    return { success: true };
  } catch (error) {
    console.error("Ошибка при удалении аккаунта:", error);
    return { success: false, error: "Не удалось удалить аккаунт" };
  }
}

