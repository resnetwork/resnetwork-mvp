"use server";

import fs from "fs";
import path from "path";
import Parser from "rss-parser";
import { 
  getMediaSources, 
  getMonitoringState, 
  saveMonitoringState, 
  isSourceDue, 
  buildSourceSearchQuery,
  MediaSource 
} from "@/app/lib/mediaIntelligence";

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

const NEWS_CACHE_FILE = path.join(process.cwd(), "app/data/aggregated_news.json");

const parser = new Parser({
  timeout: 7000,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
});

// ─── Geo-location mapping by country / city ────────────────────────────
const REGIONAL_LOCATIONS: Record<string, GeoLocation> = {
  "Kazakhstan": { name: "Астана", country: "Казахстан", lat: 51.17, lng: 71.45 },
  "Uzbekistan": { name: "Ташкент", country: "Узбекистан", lat: 41.30, lng: 69.24 },
  "Kyrgyzstan": { name: "Бишкек", country: "Кыргызстан", lat: 42.87, lng: 74.57 },
  "Tajikistan": { name: "Душанбе", country: "Таджикистан", lat: 38.56, lng: 68.79 },
  "Turkmenistan": { name: "Ашхабад", country: "Туркменистан", lat: 37.96, lng: 58.33 },
  "Azerbaijan": { name: "Баку", country: "Азербайджан", lat: 40.41, lng: 49.87 },
  "Central Asia": { name: "Алматы", country: "Центральная Азия", lat: 43.22, lng: 76.85 },
  "International": { name: "Париж", country: "Международный", lat: 48.86, lng: 2.35 },
  "Global": { name: "Женева", country: "Глобальный", lat: 46.20, lng: 6.14 }
};

const CITY_KEYWORD_DB: { kw: string[]; loc: GeoLocation }[] = [
  { kw: ["астана", "astana", "нур-султан", "nur-sultan", "kegoc", "самрук"], loc: { name: "Астана", country: "Казахстан", lat: 51.17, lng: 71.45 } },
  { kw: ["алматы", "almaty"], loc: { name: "Алматы", country: "Казахстан", lat: 43.22, lng: 76.85 } },
  { kw: ["шымкент", "shymkent", "туркестан"], loc: { name: "Шымкент", country: "Казахстан", lat: 42.34, lng: 69.59 } },
  { kw: ["актау", "aktau", "мангистау", "каспий"], loc: { name: "Актау", country: "Казахстан", lat: 43.65, lng: 51.17 } },
  { kw: ["атырау", "atyrau", "тенгиз", "кашаган"], loc: { name: "Атырау", country: "Казахстан", lat: 47.09, lng: 51.92 } },
  { kw: ["текели", "tekeli", "жетысу", "талдыкорган"], loc: { name: "Текели", country: "Казахстан", lat: 44.83, lng: 78.82 } },
  { kw: ["жанатас", "жамбыл", "тараз"], loc: { name: "Тараз", country: "Казахстан", lat: 42.90, lng: 71.37 } },
  { kw: ["караганда", "karaganda"], loc: { name: "Караганда", country: "Казахстан", lat: 49.80, lng: 73.08 } },
  { kw: ["ташкент", "tashkent"], loc: { name: "Ташкент", country: "Узбекистан", lat: 41.30, lng: 69.24 } },
  { kw: ["самарканд", "бухара", "навои"], loc: { name: "Самарканд", country: "Узбекистан", lat: 39.63, lng: 66.98 } },
  { kw: ["бишкек", "bishkek", "токтогул"], loc: { name: "Бишкек", country: "Кыргызстан", lat: 42.87, lng: 74.57 } },
  { kw: ["душанбе", "dushanbe", "рогун"], loc: { name: "Душанбе", country: "Таджикистан", lat: 38.56, lng: 68.79 } },
  { kw: ["ашхабад", "ashgabat"], loc: { name: "Ашхабад", country: "Туркменистан", lat: 37.96, lng: 58.33 } },
  { kw: ["баку", "baku", "socar"], loc: { name: "Баку", country: "Азербайджан", lat: 40.41, lng: 49.87 } },
  { kw: ["париж", "paris", "iea", "мэа"], loc: { name: "Париж", country: "Франция", lat: 48.86, lng: 2.35 } },
  { kw: ["лондон", "london"], loc: { name: "Лондон", country: "Великобритания", lat: 51.51, lng: -0.13 } },
  { kw: ["вашингтон", "washington", "world bank"], loc: { name: "Вашингтон", country: "США", lat: 38.91, lng: -77.04 } },
  { kw: ["брюссель", "brussels", "eu gateway"], loc: { name: "Брюссель", country: "ЕС", lat: 50.85, lng: 4.35 } },
  { kw: ["абу-даби", "dubai", "irena"], loc: { name: "Абу-Даби", country: "ОАЭ", lat: 24.45, lng: 54.37 } },
  { kw: ["пекин", "beijing"], loc: { name: "Пекин", country: "Китай", lat: 39.90, lng: 116.41 } },
  { kw: ["сидней", "sydney"], loc: { name: "Сидней", country: "Австралия", lat: -33.87, lng: 151.21 } }
];

function detectLocation(text: string, defaultLoc: GeoLocation): GeoLocation {
  const lower = text.toLowerCase();
  for (const entry of CITY_KEYWORD_DB) {
    for (const kw of entry.kw) {
      if (lower.includes(kw)) return entry.loc;
    }
  }
  return defaultLoc;
}

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

function cleanTitleText(title: string): string {
  if (!title.includes(" - ")) return title.trim();
  const parts = title.split(" - ");
  parts.pop();
  return parts.join(" - ").trim();
}

// ─── Заглушки, вакансии и нерелевантные заголовки ────────────────────
const GENERIC_TITLES = [
  "зеленые новости",
  "«зеленые» новости",
  "зелёные новости",
  "новости",
  "новости мира",
  "новости казахстана",
  "пресс-релизы",
  "пресс релизы",
  "события",
  "главная",
  "официальный сайт",
  "главная страница",
  "home",
  "news",
  "press releases",
  "about us",
  "контакты",
  "investment trends",
  "commodity markets",
  "esg data platform",
  "united nations"
];

const VACANCY_KEYWORDS = [
  "job description",
  "job details",
  "vacancy",
  "вакансия",
  "вакансии",
  "internship",
  "recruitment",
  "apply now",
  "careers",
  "career",
  "young professionals program",
  "карьера"
];

function isGenericOrVacancy(t: string): boolean {
  const lower = t.toLowerCase();
  if (VACANCY_KEYWORDS.some(v => lower.includes(v))) return true;
  const norm = lower.replace(/[^a-zа-я0-9]/gi, " ").trim();
  // Отсекаем слишком короткие заголовки (меньше 25 символов) — это почти всегда названия статических разделов меню
  return GENERIC_TITLES.some(g => norm === g.replace(/[^a-zа-я0-9]/gi, " ").trim()) || norm.length < 25;
}

/**
 * Извлечение реального заголовка статьи со страницы ведомства
 */
async function resolveRealHeadline(link: string): Promise<{ title?: string; summary?: string } | null> {
  try {
    const res = await fetch(link, { 
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" }, 
      redirect: "follow",
      signal: AbortSignal.timeout(3500) 
    });
    const html = await res.text();
    
    let realTitle: string | null = null;
    const h1 = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
    if (h1 && h1[1].replace(/<[^>]*>/g, "").trim().length > 15) {
      realTitle = h1[1].replace(/<[^>]*>/g, "").trim();
    }
    if (!realTitle) {
      const h4 = html.match(/<h4[^>]*>(.*?)<\/h4>/i);
      if (h4 && h4[1].replace(/<[^>]*>/g, "").trim().length > 15) {
        realTitle = h4[1].replace(/<[^>]*>/g, "").trim();
      }
    }
    if (!realTitle) {
      const h2 = html.match(/<h2[^>]*>(.*?)<\/h2>/i);
      if (h2 && h2[1].replace(/<[^>]*>/g, "").trim().length > 15) {
        realTitle = h2[1].replace(/<[^>]*>/g, "").trim();
      }
    }

    const cleanHtml = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "");
    
    const pMatches = [...cleanHtml.matchAll(/<p[^>]*>(.*?)<\/p>/gi)]
      .map(m => m[1].replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim())
      .filter(p => p.length > 50 && !p.toLowerCase().includes("подписаться") && !p.toLowerCase().includes("все права"));

    const summary = pMatches.length > 0 ? pMatches[0] : undefined;

    if (realTitle && !isGenericOrVacancy(realTitle)) {
      return { title: realTitle, summary };
    }
  } catch {
    // fallback
  }
  return null;
}

// ─── Опрос новостей ТОЛЬКО с официального сайта источника из Excel ────
async function fetchNewsForSource(source: MediaSource): Promise<NewsItem[]> {
  try {
    const { query, lang, regionParam } = buildSourceSearchQuery(source);
    const url = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=${lang}&gl=${regionParam}&ceid=${regionParam}:${lang}`;
    
    const feed = await parser.parseURL(url);
    const items: NewsItem[] = [];
    const isRegional = ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Azerbaijan", "Central Asia"].includes(source.region);
    const defaultLoc = REGIONAL_LOCATIONS[source.region] || REGIONAL_LOCATIONS["Kazakhstan"];

    for (const item of (feed.items || []).slice(0, 4)) {
      const rawTitle = item.title || "";
      if (!rawTitle.trim()) continue;

      let title = cleanTitleText(rawTitle);
      let cleanDescription = stripHtml(item.contentSnippet || item.content || item.summary || "");

      // Если заголовок generic (например «Зеленые» новости или вакансия), резолвим или отсеиваем
      if (isGenericOrVacancy(title)) {
        if (item.link) {
          const resolved = await resolveRealHeadline(item.link);
          if (resolved?.title) {
            title = resolved.title;
            if (resolved.summary) cleanDescription = resolved.summary;
          } else {
            continue;
          }
        } else {
          continue;
        }
      }

      if (isGenericOrVacancy(title)) continue;
      
      const pubMs = item.pubDate
        ? new Date(item.pubDate).getTime()
        : item.isoDate
          ? new Date(item.isoDate).getTime()
          : Date.now();

      if (isNaN(pubMs)) continue;

      const sourceName = source.name;
      const sourceUrl = item.link || source.url;

      const fullText = `${title} ${cleanDescription} ${source.name} ${source.region}`;
      const location = detectLocation(fullText, defaultLoc);

      items.push({
        id: item.guid || item.link || `${title}-${pubMs}`,
        title,
        summary: cleanDescription.length > 220 ? cleanDescription.substring(0, 220) + "..." : cleanDescription,
        pubDate: pubMs,
        dateFormatted: new Date(pubMs).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" }),
        source: sourceName,
        sourceUrl,
        region: isRegional ? "ca" : "world",
        location,
        readTime: `${Math.max(2, Math.min(6, Math.ceil(cleanDescription.length / 250)))} мин`,
      });
    }

    return items;
  } catch (err: unknown) {
    console.error(`[mediaIntelligence] Error fetching source ${source.name}:`, err instanceof Error ? err.message : err);
    return [];
  }
}

// ─── Хранилище новостей ──────────────────────────────────────────────
function loadPersistentNews(): NewsItem[] {
  try {
    if (fs.existsSync(NEWS_CACHE_FILE)) {
      return JSON.parse(fs.readFileSync(NEWS_CACHE_FILE, "utf-8"));
    }
  } catch {
    // ignore
  }
  return [];
}

function savePersistentNews(items: NewsItem[]) {
  try {
    fs.writeFileSync(NEWS_CACHE_FILE, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    // ignore
  }
}

let cachedNews: { ts: number; data: NewsItem[] } | null = null;
const CACHE_TTL = 15 * 60 * 1000; // 15 минут

export async function getRSSNews(): Promise<NewsItem[]> {
  const now = Date.now();

  if (cachedNews && now - cachedNews.ts < CACHE_TTL && cachedNews.data.length >= 25) {
    return cachedNews.data;
  }

  // Загружаем существующие проверенные новости
  let existingItems = loadPersistentNews();

  try {
    const sources = getMediaSources();
    const state = getMonitoringState();

    // 1. Выбираем как региональные, так и глобальные источники для опроса
    const caSources = sources.filter(s => 
      ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Azerbaijan", "Central Asia"].includes(s.region)
    );
    const worldSources = sources.filter(s => 
      !["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Azerbaijan", "Central Asia"].includes(s.region)
    );

    // Берем те, у которых подошел срок, либо ключевые топ-источники
    const dueCA = caSources.filter(s => isSourceDue(s, state, now));
    const dueWorld = worldSources.filter(s => isSourceDue(s, state, now));

    const selectedCA = (dueCA.length >= 5 ? dueCA : caSources).slice(0, 10);
    const selectedWorld = (dueWorld.length >= 5 ? dueWorld : worldSources).slice(0, 8);

    console.log(`[mediaIntelligence] Polling sources: CA=${selectedCA.length}, World=${selectedWorld.length}`);

    // 2. Опрашиваем исключительно сайты из Excel (site:domain)
    const [caResults, worldResults] = await Promise.all([
      Promise.allSettled(selectedCA.map(s => fetchNewsForSource(s))),
      Promise.allSettled(selectedWorld.map(s => fetchNewsForSource(s))),
    ]);

    // Обновляем время проверки
    for (const s of [...selectedCA, ...selectedWorld]) {
      state.lastChecked[s.id] = now;
    }
    state.lastRun = now;
    saveMonitoringState(state);

    const newlyFetched = [
      ...caResults.filter(r => r.status === "fulfilled").flatMap(r => (r as PromiseFulfilledResult<NewsItem[]>).value),
      ...worldResults.filter(r => r.status === "fulfilled").flatMap(r => (r as PromiseFulfilledResult<NewsItem[]>).value),
    ];

    // 3. Объединяем с ранее собранными новостями с дедупликацией
    const allItems = [...newlyFetched, ...existingItems];
    const seenTitles = new Set<string>();
    const deduplicated: NewsItem[] = [];

    for (const item of allItems) {
      if (isGenericOrVacancy(item.title)) continue;
      const cleanKey = item.title.toLowerCase().replace(/[^a-zа-я0-9]/gi, "").slice(0, 45);
      if (!seenTitles.has(cleanKey)) {
        seenTitles.add(cleanKey);
        deduplicated.push(item);
      }
    }

    const caList = deduplicated.filter(n => n.region === "ca").sort((a, b) => b.pubDate - a.pubDate).slice(0, 30);
    const worldList = deduplicated.filter(n => n.region === "world").sort((a, b) => b.pubDate - a.pubDate).slice(0, 30);

    const combined = [...caList, ...worldList].sort((a, b) => b.pubDate - a.pubDate);
    console.log(`[mediaIntelligence] Total verified news: ${combined.length} (CA: ${caList.length}, World: ${worldList.length})`);

    if (combined.length > 0) {
      savePersistentNews(combined);
      cachedNews = { ts: now, data: combined };
      return combined;
    }
  } catch (error) {
    console.error("[mediaIntelligence] Aggregation error:", error);
  }

  return existingItems.length > 0 ? existingItems : (cachedNews?.data ?? []);
}
