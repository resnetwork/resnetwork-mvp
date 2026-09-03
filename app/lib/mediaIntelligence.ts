import fs from "fs";
import path from "path";

export interface MediaSource {
  id: number;
  region: string;
  name: string;
  type: string;
  category: string;
  scope: string;
  frequency: "Daily" | "Weekly" | string;
  priority: "A" | "B" | string;
  format: string;
  url: string;
}

export interface MonitoringState {
  lastChecked: Record<number, number>; // sourceId -> timestamp ms
  lastRun: number;
}

const STATE_FILE = path.join(process.cwd(), "app/data/monitoring_state.json");
const SOURCES_FILE = path.join(process.cwd(), "app/data/media_sources.json");

// Интервалы в миллисекундах
const INTERVAL_DAILY = 24 * 60 * 60 * 1000;      // 1 день
const INTERVAL_WEEKLY = 7 * 24 * 60 * 60 * 1000;  // 7 дней

/**
 * Получить список всех 94 источников из Excel
 */
export function getMediaSources(): MediaSource[] {
  try {
    if (!fs.existsSync(SOURCES_FILE)) return [];
    const content = fs.readFileSync(SOURCES_FILE, "utf-8");
    return JSON.parse(content);
  } catch (err) {
    console.error("[mediaIntelligence] Error reading sources file:", err);
    return [];
  }
}

/**
 * Загрузить состояние последнего мониторинга
 */
export function getMonitoringState(): MonitoringState {
  try {
    if (fs.existsSync(STATE_FILE)) {
      const content = fs.readFileSync(STATE_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("[mediaIntelligence] Error reading state file:", err);
  }
  return { lastChecked: {}, lastRun: 0 };
}

/**
 * Сохранить состояние мониторинга
 */
export function saveMonitoringState(state: MonitoringState) {
  try {
    fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("[mediaIntelligence] Error saving state file:", err);
  }
}

/**
 * Проверить, подошло ли время для опроса источника согласно частоте (Daily / Weekly)
 */
export function isSourceDue(source: MediaSource, state: MonitoringState, now = Date.now()): boolean {
  const lastTime = state.lastChecked[source.id] || 0;
  const interval = source.frequency?.toLowerCase() === "weekly" ? INTERVAL_WEEKLY : INTERVAL_DAILY;
  return now - lastTime >= interval;
}

const SCOPE_TRANSLATIONS: Record<string, string> = {
  "Green finance": "зеленое финансирование",
  "ESG": "ESG",
  "Renewables": "ВИЭ",
  "Renewable energy": "возобновляемая энергия",
  "Decarbonization": "декарбонизация",
  "Energy transition": "энергетический переход",
  "Carbon markets": "углеродные рынки",
  "Climate policy": "климатическая политика",
  "Energy policy": "энергетическая политика",
  "Wind energy": "ветроэнергетика",
  "Solar energy": "солнечная энергетика",
  "Hydropower": "гидроэнергетика",
  "Sustainable development": "устойчивое развитие",
  "Investments": "инвестиции",
  "Green bonds": "зеленые облигации"
};

function translateScopeKeywords(scope: string, toRussian: boolean): string[] {
  if (!scope) return [];
  const words = scope.split(/,\s*|\n/).map(s => s.trim()).filter(Boolean);
  
  if (!toRussian) return words;

  return words.map(w => {
    // Ищем точное совпадение
    for (const [eng, rus] of Object.entries(SCOPE_TRANSLATIONS)) {
      if (w.toLowerCase().includes(eng.toLowerCase())) {
        return rus;
      }
    }
    // Если перевода нет, возвращаем как есть, но это редко
    return w;
  });
}

/**
 * Построить строгий запрос для поиска новостей ТОЛЬКО с официального сайта источника
 * С учетом ключевых слов из поля scope ("Что отслеживать")
 */
export function buildSourceSearchQuery(source: MediaSource): { 
  query: string; 
  lang: "ru" | "en"; 
  regionParam: "KZ" | "US"; 
  domain: string;
} {
  let domain = "";
  try {
    const u = new URL(source.url);
    domain = u.hostname.replace(/^www\./, "");
  } catch {
    domain = "";
  }

  const isRegional = ["Kazakhstan", "Uzbekistan", "Kyrgyzstan", "Tajikistan", "Turkmenistan", "Azerbaijan", "Central Asia"].includes(source.region);

  // Переводим ключевые слова для региональных источников
  const keywords = translateScopeKeywords(source.scope, isRegional);
  
  let keywordPart = "";
  if (keywords.length > 0) {
    // Собираем в OR блок: (keyword1 OR keyword2)
    keywordPart = ` (${keywords.map(kw => `"${kw}"`).join(" OR ")})`;
  }

  // Строгий запрос site:domain + (keywords) гарантирует, что все статьи будут только с этого сайта и по нужной теме
  let query = domain ? `site:${domain}${keywordPart}` : `"${source.name}"${keywordPart}`;

  if (isRegional) {
    return { query, lang: "ru", regionParam: "KZ", domain };
  } else {
    return { query, lang: "en", regionParam: "US", domain };
  }
}
