"use server";

import Parser from "rss-parser";

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['enclosure', 'enclosure'],
      ['description', 'description'],
      ['source', 'source']
    ],
  }
});

// Google News RSS Search query
const GOOGLE_NEWS_URL = 'https://news.google.com/rss/search?q=' + encodeURIComponent('экология OR ESG OR "зеленая энергетика" OR стартапы Казахстан') + '&hl=ru&gl=KZ&ceid=KZ:ru';

// Очищает HTML от тегов
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

export async function getRSSNews() {
  const allNews = [];

  try {
    const feedData = await parser.parseURL(GOOGLE_NEWS_URL);
    
    for (const item of feedData.items) {
      // Описание Google News часто содержит просто повторение заголовка или лишний HTML
      // Мы берем snippet
      const cleanDescription = stripHtml(item.contentSnippet || item.description || "");
      
      // Имя источника в Google News идет после " - " в заголовке или в теге source
      let sourceName = "Новости";
      let cleanTitle = item.title || "";
      
      if (item.source) {
        sourceName = typeof item.source === 'string' ? item.source : item.source._;
      } else if (cleanTitle.includes(" - ")) {
        const parts = cleanTitle.split(" - ");
        sourceName = parts.pop()?.trim() || "Новости";
        cleanTitle = parts.join(" - ");
      }

      // Google News не всегда отдает картинки в RSS, так что ставим дефолтную качественную эко-картинку 
      // с небольшим рандомом для красоты сетки
      const randomImages = [
        "https://images.unsplash.com/photo-1497435334941-8c899ebd9ee5?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80&auto=format&fit=crop"
      ];
      
      // Псевдослучайный выбор картинки на основе длины заголовка чтобы она не менялась каждую секунду
      const imgIndex = cleanTitle.length % randomImages.length;

      allNews.push({
        id: item.guid || item.link || Math.random().toString(),
        title: cleanTitle,
        summary: cleanDescription.substring(0, 180) + "...",
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric' }) : "Недавно",
        category: sourceName,
        image: randomImages[imgIndex],
        sourceUrl: item.link
      });
    }
  } catch (error) {
    console.error(`Ошибка при чтении Google News RSS:`, error);
  }

  // Возвращаем топ-8 релевантных новостей (чтобы заполнить всю сетку)
  return allNews.slice(0, 8);
}
