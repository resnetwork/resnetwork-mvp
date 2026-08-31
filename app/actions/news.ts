"use server";

import Parser from "rss-parser";

export interface GeoLocation {
  name: string;
  country: string;
  lat: number;
  lng: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  pubDate: number;
  dateFormatted: string;
  source: string;
  sourceUrl?: string;
  region: "ca" | "world";
  readTime?: string;
  location: GeoLocation;
}

// Simple parser without customFields to avoid conflicts
const parser = new Parser({
  timeout: 8000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

// ─── Geo-location keywords ────────────────────────────────────────────
const LOCATION_DB: { kw: string[]; loc: GeoLocation }[] = [
  { kw: ["астана", "astana", "нур-султан", "nur-sultan", "kegoc", "самрук"], loc: { name: "Астана", country: "Казахстан", lat: 51.17, lng: 71.45 } },
  { kw: ["алматы", "almaty"], loc: { name: "Алматы", country: "Казахстан", lat: 43.22, lng: 76.85 } },
  { kw: ["шымкент", "shymkent", "туркестан"], loc: { name: "Шымкент", country: "Казахстан", lat: 42.34, lng: 69.59 } },
  { kw: ["актау", "aktau", "мангистау", "каспий"], loc: { name: "Актау", country: "Казахстан", lat: 43.65, lng: 51.17 } },
  { kw: ["атырау", "atyrau", "тенгиз", "кашаган"], loc: { name: "Атырау", country: "Казахстан", lat: 47.09, lng: 51.92 } },
  { kw: ["текели", "tekeli", "жетысу", "талдыкорган"], loc: { name: "Текели", country: "Казахстан", lat: 44.83, lng: 78.82 } },
  { kw: ["жанатас", "жамбыл", "тараз"], loc: { name: "Тараз", country: "Казахстан", lat: 42.90, lng: 71.37 } },
  { kw: ["ерейментау", "акмола", "кокшетау"], loc: { name: "Кокшетау", country: "Казахстан", lat: 53.28, lng: 69.39 } },
  { kw: ["казахстан", "kazakhstan", "казахстане", "казахстана"], loc: { name: "Астана", country: "Казахстан", lat: 51.17, lng: 71.45 } },
  { kw: ["ташкент", "tashkent"], loc: { name: "Ташкент", country: "Узбекистан", lat: 41.30, lng: 69.24 } },
  { kw: ["навои", "navoi", "самарканд", "бухара"], loc: { name: "Самарканд", country: "Узбекистан", lat: 39.63, lng: 66.98 } },
  { kw: ["узбекистан", "uzbekistan"], loc: { name: "Ташкент", country: "Узбекистан", lat: 41.30, lng: 69.24 } },
  { kw: ["бишкек", "bishkek", "токтогул", "кыргызстан", "kyrgyzstan"], loc: { name: "Бишкек", country: "Кыргызстан", lat: 42.87, lng: 74.57 } },
  { kw: ["душанбе", "dushanbe", "рогун", "таджикистан", "tajikistan"], loc: { name: "Душанбе", country: "Таджикистан", lat: 38.56, lng: 68.79 } },
  { kw: ["ашхабад", "ashgabat", "туркменистан", "turkmenistan"], loc: { name: "Ашхабад", country: "Туркменистан", lat: 37.96, lng: 58.33 } },
  { kw: ["баку", "baku", "азербайджан", "azerbaijan"], loc: { name: "Баку", country: "Азербайджан", lat: 40.41, lng: 49.87 } },
  { kw: ["брюссель", "brussels", "евросоюз", "european union"], loc: { name: "Брюссель", country: "ЕС", lat: 50.85, lng: 4.35 } },
  { kw: ["лондон", "london", "великобритания", "uk", "bbc", "britain"], loc: { name: "Лондон", country: "Великобритания", lat: 51.51, lng: -0.13 } },
  { kw: ["вашингтон", "washington", "сша", "usa", "america", "nasa"], loc: { name: "Вашингтон", country: "США", lat: 38.91, lng: -77.04 } },
  { kw: ["берлин", "berlin", "германия", "germany"], loc: { name: "Берлин", country: "Германия", lat: 52.52, lng: 13.41 } },
  { kw: ["париж", "paris", "франция", "france", "iea"], loc: { name: "Париж", country: "Франция", lat: 48.86, lng: 2.35 } },
  { kw: ["пекин", "beijing", "китай", "china"], loc: { name: "Пекин", country: "Китай", lat: 39.90, lng: 116.41 } },
  { kw: ["сеул", "seoul", "корея", "korea", "hyundai"], loc: { name: "Сеул", country: "Южная Корея", lat: 37.57, lng: 126.98 } },
  { kw: ["токио", "tokyo", "япония", "japan"], loc: { name: "Токио", country: "Япония", lat: 35.68, lng: 139.65 } },
  { kw: ["дубай", "dubai", "оаэ", "uae", "абу-даби"], loc: { name: "Дубай", country: "ОАЭ", lat: 25.20, lng: 55.27 } },
  { kw: ["сидней", "sydney", "австралия", "australia"], loc: { name: "Сидней", country: "Австралия", lat: -33.87, lng: 151.21 } },
  { kw: ["индия", "india", "дели", "delhi"], loc: { name: "Нью-Дели", country: "Индия", lat: 28.61, lng: 77.21 } },
  { kw: ["непал", "nepal", "катманду"], loc: { name: "Катманду", country: "Непал", lat: 27.72, lng: 85.32 } },
];

function detectLocation(text: string, region: "ca" | "world"): GeoLocation {
  const lower = text.toLowerCase();
  for (const entry of LOCATION_DB) {
    for (const kw of entry.kw) {
      if (lower.includes(kw)) return entry.loc;
    }
  }
  return region === "ca"
    ? { name: "Астана", country: "Казахстан", lat: 51.17, lng: 71.45 }
    : { name: "Женева", country: "Швейцария", lat: 46.20, lng: 6.14 };
}

// ─── Feed URLs ────────────────────────────────────────────────────────
const CA_FEEDS = [
  `https://news.google.com/rss/search?q=${encodeURIComponent("Казахстан возобновляемая энергетика OR ВИЭ OR солнечная электростанция OR ветровая электростанция")}&hl=ru&gl=KZ&ceid=KZ:ru`,
  `https://news.google.com/rss/search?q=${encodeURIComponent("Центральная Азия климат OR экология OR водные ресурсы OR зеленая энергетика OR декарбонизация")}&hl=ru&gl=KZ&ceid=KZ:ru`,
  `https://news.google.com/rss/search?q=${encodeURIComponent("Central Asia renewable energy OR solar power OR wind farm OR climate transition")}&hl=en-US&gl=US&ceid=US:en`,
  `https://news.google.com/rss/search?q=${encodeURIComponent("Uzbekistan OR Kazakhstan green transition OR green economy OR decarbonization")}&hl=en-US&gl=US&ceid=US:en`,
];

const WORLD_FEEDS = [
  "https://feeds.bbci.co.uk/news/science_and_environment/rss.xml",
  "https://cleantechnica.com/feed/",
  "https://www.theguardian.com/environment/rss",
  `https://news.google.com/rss/search?q=${encodeURIComponent("renewable energy transition OR green hydrogen OR solar battery investment")}&hl=en-US&gl=US&ceid=US:en`,
  `https://news.google.com/rss/search?q=${encodeURIComponent("global climate policy OR carbon market ETS OR energy decarbonization")}&hl=en-US&gl=US&ceid=US:en`,
];

// ─── Helpers ──────────────────────────────────────────────────────────
function stripHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<[^>]*>?/gm, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function extractSourceFromTitle(title: string): { cleanTitle: string; sourceName: string } {
  if (!title.includes(" - ")) return { cleanTitle: title, sourceName: "" };
  const parts = title.split(" - ");
  const sourceName = parts.pop()?.trim() || "";
  return { cleanTitle: parts.join(" - "), sourceName };
}

// ─── Fetch single feed ───────────────────────────────────────────────
async function fetchFeed(url: string, region: "ca" | "world"): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(url);
    const items: NewsItem[] = [];

    for (const item of feed.items || []) {
      const rawTitle = item.title || "";
      if (!rawTitle.trim()) continue;

      // Extract source name from "Title - Source" format used by Google News
      const { cleanTitle, sourceName: extractedSource } = extractSourceFromTitle(rawTitle);
      const sourceName = extractedSource || feed.title?.replace(/^Google .*$/i, "").trim() || (region === "ca" ? "Центральная Азия" : "Global News");

      const rawDesc = item.contentSnippet || item.content || item.summary || "";
      const cleanDescription = stripHtml(rawDesc);
      const pubMs = item.pubDate
        ? new Date(item.pubDate).getTime()
        : item.isoDate
          ? new Date(item.isoDate).getTime()
          : Date.now();

      // Skip items with NaN timestamps
      if (isNaN(pubMs)) continue;

      const fullText = `${cleanTitle} ${cleanDescription} ${sourceName}`;
      const location = detectLocation(fullText, region);

      items.push({
        id: item.guid || item.link || `${cleanTitle}-${pubMs}`,
        title: cleanTitle.trim(),
        summary: cleanDescription.length > 220 ? cleanDescription.substring(0, 220) + "..." : cleanDescription,
        pubDate: pubMs,
        dateFormatted: new Date(pubMs).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
        source: sourceName
          .replace(/^Google News$/i, "")
          .replace(/^Google Новости$/i, "")
          .trim() || "Новости",
        sourceUrl: item.link,
        region,
        location,
        readTime: `${Math.max(2, Math.min(7, Math.ceil(cleanDescription.length / 250)))} мин`,
      });
    }

    return items;
  } catch (err: unknown) {
    console.error(`[news] Feed error for ${url.substring(0, 60)}: ${err instanceof Error ? err.message : err}`);
    return [];
  }
}

// ─── In-memory cache (24 h TTL) ─────────────────────────────────────
let cachedNews: { ts: number; data: NewsItem[] } | null = null;
const TTL = 24 * 60 * 60 * 1000;

export async function getRSSNews(): Promise<NewsItem[]> {
  const now = Date.now();

  // Return cache if valid
  if (cachedNews && now - cachedNews.ts < TTL && cachedNews.data.length >= 20) {
    return cachedNews.data;
  }

  try {
    // Fetch CA and World feeds concurrently
    const [caSettled, worldSettled] = await Promise.all([
      Promise.allSettled(CA_FEEDS.map((u) => fetchFeed(u, "ca"))),
      Promise.allSettled(WORLD_FEEDS.map((u) => fetchFeed(u, "world"))),
    ]);

    const rawCa = caSettled.filter((r) => r.status === "fulfilled").flatMap((r) => (r as PromiseFulfilledResult<NewsItem[]>).value);
    const rawWorld = worldSettled.filter((r) => r.status === "fulfilled").flatMap((r) => (r as PromiseFulfilledResult<NewsItem[]>).value);

    console.log(`[news] Raw CA items: ${rawCa.length}, Raw World items: ${rawWorld.length}`);

    // Deduplicate CA
    const seenKeys = new Set<string>();
    const dedupCa: NewsItem[] = [];
    for (const item of rawCa) {
      const key = item.title.toLowerCase().substring(0, 50);
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        dedupCa.push(item);
      }
    }

    // Deduplicate World (also skip keys already in CA)
    const dedupWorld: NewsItem[] = [];
    for (const item of rawWorld) {
      const key = item.title.toLowerCase().substring(0, 50);
      if (!seenKeys.has(key)) {
        seenKeys.add(key);
        dedupWorld.push(item);
      }
    }

    // Sort each by date desc
    dedupCa.sort((a, b) => b.pubDate - a.pubDate);
    dedupWorld.sort((a, b) => b.pubDate - a.pubDate);

    // Take up to 25 from each
    const finalCa = dedupCa.slice(0, 25);
    const finalWorld = dedupWorld.slice(0, 25);

    // Merge and sort
    const combined = [...finalCa, ...finalWorld].sort((a, b) => b.pubDate - a.pubDate);

    console.log(`[news] Final CA: ${finalCa.length}, Final World: ${finalWorld.length}, Combined: ${combined.length}`);

    if (combined.length > 0) {
      cachedNews = { ts: now, data: combined };
      return combined;
    }
  } catch (error) {
    console.error("[news] Aggregation error:", error);
  }

  // Return stale cache as last resort
  return cachedNews?.data ?? [];
}
