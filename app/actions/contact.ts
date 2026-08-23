"use server";

import { prisma } from "@/app/lib/prisma";

export async function submitContactRequest(formData: FormData) {
  try {
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const phone = formData.get("phone")?.toString();
    const company = formData.get("company")?.toString();
    const message = formData.get("message")?.toString();

    if (!name || !email || !message) {
      return { success: false, error: "Заполните обязательные поля" };
    }

    // Сохраняем заявку в БД
    const request = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
      }
    });

    // Опционально: Отправка в Telegram
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
      const text = `🔔 *Новая заявка с сайта RES 365*
      
👤 *Имя:* ${name}
📧 *Email:* ${email}
📱 *Телефон:* ${phone || 'Не указан'}
🏢 *Компания:* ${company || 'Не указана'}

💬 *Сообщение:* 
${message}`;

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

    return { success: true };
  } catch (error) {
    console.error("Ошибка при отправке заявки:", error);
    return { success: false, error: "Ошибка на сервере. Попробуйте позже." };
  }
}
