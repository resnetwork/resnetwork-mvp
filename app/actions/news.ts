"use server";

import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
      ['description', 'description'],
    ],
  }
});

const RSS_FEEDS = [
  { url: "https://kapital.kz/rss", sourceName: "Kapital.kz" },
  { url: "https://inbusiness.kz/ru/rss", sourceName: "Inbusiness" },
  { url: "https://tengrinews.kz/news.rss", sourceName: "Tengrinews" },
];

const KEYWORDS = [
  "эколог", "эко", "устойчивое развитие", "esg", "стартап", "зелен", 
  "климат", "переработка", "выброс", "энерги", "возобновляем", "технологи"
];

function containsKeyword(text: string): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return KEYWORDS.some(keyword => lowerText.includes(keyword));
}

// Извлекает ссылку на картинку из HTML-строки
function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const imgRegex = /<img[^>]+src="([^">]+)"/i;
  const match = html.match(imgRegex);
  return match ? match[1] : null;
}

// Очищает HTML от тегов
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

export async function getRSSNews() {
  const allNews = [];

  for (const feed of RSS_FEEDS) {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      for (const item of feedData.items) {
        // Ищем картинку в разных полях
        let imageUrl = null;
        if (item.enclosure?.url) imageUrl = item.enclosure.url;
        else if (item.mediaContent?.$?.url) imageUrl = item.mediaContent.$.url;
        else if (item.content) imageUrl = extractImageFromHtml(item.content);
        else if (item.contentSnippet) imageUrl = extractImageFromHtml(item.contentSnippet);
        
        // Описание без HTML
        const cleanDescription = stripHtml(item.contentSnippet || item.description || "");
        
        // Проверяем по ключевым словам (заголовок или описание)
        const isRelevant = containsKeyword(item.title || "") || containsKeyword(cleanDescription);
        
        if (isRelevant) {
          allNews.push({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title,
            summary: cleanDescription.substring(0, 150) + "...",
            date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric' }) : "Недавно",
            category: feed.sourceName,
            image: imageUrl || "https://images.unsplash.com/photo-1497435334941-8c899ebd9ee5?q=80&w=2070&auto=format&fit=crop", // Заглушка, если нет картинки
            sourceUrl: item.link
          });
        }
      }
    } catch (error) {
      console.error(`Ошибка при чтении RSS ${feed.sourceName}:`, error);
    }
  }

  // Сортируем по дате (если pubDate парсится нормально) и отдаем топ-10
  // Из-за разных форматов дат, мы просто возьмем первые 10 актуальных
  return allNews.slice(0, 10);
}
