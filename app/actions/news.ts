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
  { url: "https://www.inform.kz/rss/rus.xml", sourceName: "Kazinform" },
];

// Ищем ключевые слова ТОЛЬКО в заголовке, чтобы избежать случайных упоминаний "Министерства экологии" в тексте
const TITLE_ECO_REGEX = /(^|[^а-яёa-z])(эколог[а-я]*|esg|устойчив[а-я]* развит[а-я]*|зелен[а-я]* энергети[а-я]*|зелен[а-я]* экономик[а-я]*|переработк[а-я]* отходов|выброс[а-я]*|климат[а-я]*|возобновляем[а-я]* энерги[а-я]*|чист[а-я]* энерги[а-я]*|декарбонизац[а-я]*|углеродн[а-я]*|ВИЭ|стартап[а-я]*)([^а-яёa-z]|$)/iu;

// Слова-исключения (даже если есть ключевое слово, игнорируем новость)
const NEGATIVE_REGEX = /(питомц|животн|собак|кошк|дтп|убийств|криминал|погод)/iu;

// Очищает HTML от тегов
function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, '').trim();
}

// Извлекает ссылку на картинку из HTML-строки и проверяет её валидность
function extractImageFromHtml(html: string): string | null {
  if (!html) return null;
  const imgRegex = /<img[^>]+src=["']([^"'>]+)["']/i;
  const match = html.match(imgRegex);
  if (match && match[1]) {
    const url = match[1];
    // Игнорируем пиксели-трекеры, иконки и относительные пути
    if (url.startsWith('http') && !url.includes('1x1') && !url.includes('.gif')) {
      return url;
    }
  }
  return null;
}

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1497435334941-8c899ebd9ee5?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531266752426-aad472b7bbf4?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=900&q=80&auto=format&fit=crop"
];

export async function getRSSNews() {
  const allNews = [];
  const seenTitles = new Set();

  for (const feed of RSS_FEEDS) {
    try {
      const feedData = await parser.parseURL(feed.url);
      
      for (const item of feedData.items) {
        const title = item.title || "";
        if (seenTitles.has(title)) continue;

        const description = stripHtml(item.contentSnippet || item.description || "");
        
        // ПРОВЕРКА 1: Ключевое слово должно быть В ЗАГОЛОВКЕ (чтобы отсечь случайные упоминания министерств в тексте)
        // ПРОВЕРКА 2: В заголовке не должно быть стоп-слов
        if (TITLE_ECO_REGEX.test(title) && !NEGATIVE_REGEX.test(title)) {
          seenTitles.add(title);

          let imageUrl = null;
          if (item.enclosure?.url && item.enclosure.url.startsWith('http')) imageUrl = item.enclosure.url;
          else if (item.mediaContent?.$?.url && item.mediaContent.$.url.startsWith('http')) imageUrl = item.mediaContent.$.url;
          else if (item.content) imageUrl = extractImageFromHtml(item.content);
          else if (item.contentSnippet) imageUrl = extractImageFromHtml(item.contentSnippet);

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

  allNews.sort((a, b) => b.rawPubDate - a.rawPubDate);

  // Если новостей меньше 8 (потому что фильтр стал очень строгим), 
  // Next.js на фронте все равно отрисует их (просто будет меньше карточек)
  // Мы можем запрашивать больше лент, если нужно.
  return allNews.slice(0, 8);
}
