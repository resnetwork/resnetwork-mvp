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

// Запрос в Google News, строго ограничивающий ключевые слова только заголовком (intitle:) 
// и ограничивающий регион Казахстаном
const GOOGLE_NEWS_URL = 'https://news.google.com/rss/search?q=' + encodeURIComponent('intitle:экология OR intitle:ESG OR intitle:"зеленая энергетика" OR intitle:"устойчивое развитие" OR intitle:"возобновляемая энергия" Казахстан') + '&hl=ru&gl=KZ&ceid=KZ:ru';

// Очищает HTML от тегов
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

export async function getRSSNews() {
  const allNews = [];

  try {
    const feedData = await parser.parseURL(GOOGLE_NEWS_URL);
    const seenTitles = new Set();
    
    for (const item of feedData.items) {
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

      if (seenTitles.has(cleanTitle)) continue;
      seenTitles.add(cleanTitle);

      const cleanDescription = stripHtml(item.contentSnippet || item.description || "");

      // Google News не всегда отдает картинки в RSS, так что ставим дефолтную качественную эко-картинку 
      // с хешированием, чтобы на одной новости всегда была одна картинка, и они не повторялись подряд
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
      
      let hash = 0;
      for (let i = 0; i < cleanTitle.length; i++) {
        hash = cleanTitle.charCodeAt(i) + ((hash << 5) - hash);
      }
      const imgIndex = Math.abs(hash) % FALLBACK_IMAGES.length;

      allNews.push({
        id: item.guid || item.link || Math.random().toString(),
        title: cleanTitle,
        summary: cleanDescription.substring(0, 180) + "...",
        date: item.pubDate ? new Date(item.pubDate).toLocaleDateString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric' }) : "Недавно",
        category: sourceName,
        image: FALLBACK_IMAGES[imgIndex],
        sourceUrl: item.link
      });
    }
  } catch (error) {
    console.error(`Ошибка при чтении Google News RSS:`, error);
  }

  // Возвращаем топ-8 релевантных новостей
  return allNews.slice(0, 8);
}
