import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, name, email } = body;

    if (!category || !name || !email) {
      return NextResponse.json({ success: false, error: "Заполните все поля" }, { status: 400 });
    }

    // Сохраняем заявку в БД
    const request = await prisma.registrationRequest.create({
      data: {
        category,
        name,
        email,
      }
    });

    // Отправка в Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      let categoryRu = category;
      if (category === "STARTUP") categoryRu = "Стартап";
      if (category === "COMPANY") categoryRu = "Компания";
      if (category === "INDIVIDUAL") categoryRu = "Физ. лицо";

      const text = `🚀 *Новая заявка на регистрацию (RES 365)*
      
📋 *Категория:* ${categoryRu}
👤 *Название/ФИО:* ${name}
📧 *Email:* ${email}

_Заявка ожидает модерации в Админ-панели._`;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: "Markdown"
        })
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return NextResponse.json({ success: false, error: "Ошибка на сервере. Попробуйте позже." }, { status: 500 });
  }
}
