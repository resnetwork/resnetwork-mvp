"use server";

import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
      ['description', 'description']
    ],
  }
});

const RSS_FEEDS = [
  { url: "https://tengrinews.kz/news.rss", sourceName: "Tengrinews" },
  { url: "https://inbusiness.kz/ru/rss", sourceName: "Inbusiness" },
  { url: "https://kapital.kz/rss", sourceName: "Kapital.kz" },
  { url: "https://www.inform.kz/rss/rus.xml", sourceName: "Kazinform" }, // альтернативный урл информбюро/казинформ
];

// Строгая регулярка. Ищет слова целиком с учетом кириллицы (исключает "экономика" и т.д.)
const ECO_REGEX = /(^|[^а-яёa-z])(эколог[а-я]*|esg|устойчивое развитие|зелен[а-я]* энергети[а-я]*|переработка|выбросы|климат|возобновляем[а-я]* энерги[а-я]*|чист[а-я]* энерги[а-я]*)([^а-яёa-z]|$)/iu;

// Очищает HTML от тегов
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

// Извлекает ссылку на картинку из HTML-строки
function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1497435334941-8c899ebd9ee5?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511497584788-876760111969?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508361001413-7a9dca21d08a?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=900&q=80&auto=format&fit=crop"
];

export async function getRSSNews() {
  const allNews = [];
  const seenTitles = new Set(); // Чтобы избежать дубликатов (например про тигра)

  for (const feed of RSS_FEEDS) {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      for (const item of feedData.items) {
        const title = item.title || "";
        // Пропускаем дубликаты
        if (seenTitles.has(title)) continue;

        const description = stripHtml(item.contentSnippet || item.description || "");
        const fullTextForSearch = `${title} ${description}`;

        // Строгая проверка по регулярному выражению
        if (ECO_REGEX.test(fullTextForSearch)) {
          seenTitles.add(title);

          // Пытаемся найти оригинальную картинку
          let imageUrl = null;
          if (item.enclosure?.url) imageUrl = item.enclosure.url;
          else if (item.mediaContent?.$?.url) imageUrl = item.mediaContent.$.url;
          else if (item.content) imageUrl = extractImageFromHtml(item.content);
          else if (item.contentSnippet) imageUrl = extractImageFromHtml(item.contentSnippet);

          // Если оригинальной картинки нет, берем уникальную заглушку на основе строки заголовка
          if (!imageUrl) {
            let hash = 0;
            for (let i = 0; i < title.length; i++) {
              hash = title.charCodeAt(i) + ((hash << 5) - hash);
            }
            const imgIndex = Math.abs(hash) % FALLBACK_IMAGES.length;
            imageUrl = FALLBACK_IMAGES[imgIndex];
          }

          allNews.push({
            id: item.guid || item.link || Math.random().toString(),
            title: title,
            summary: description.substring(0, 180) + "...",
            date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric' }) : "Недавно",
            category: feed.sourceName,
            image: imageUrl,
            sourceUrl: item.link,
            rawPubDate: item.pubDate ? new Date(item.pubDate).getTime() : 0
          });
        }
      }
    } catch (error) {
      console.error(`Ошибка при чтении RSS ${feed.sourceName}:`, error);
    }
  }

  // Сортируем по дате (самые свежие сначала)
  allNews.sort((a, b) => b.rawPubDate - a.rawPubDate);

  // Возвращаем топ-8 (чтобы полностью заполнить сетку)
  return allNews.slice(0, 8);
}
