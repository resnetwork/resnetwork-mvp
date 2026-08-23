"use client";

import { useState, useEffect } from "react";
import { X, ArrowUpRight, TrendingUp } from "lucide-react";
import FocusRevealHeading from "./FocusRevealHeading";

const NEWS_ALL = [
  {
    id: 0,
    title: "Кентау признали зоной экологического бедствия",
    tag: "Климат и политика",
    date: "27 июля 2026",
    img: "https://images.unsplash.com/photo-1632103996718-4a47cf68b75e?w=900&q=80&auto=format&fit=crop",
    content:
      "Правительство официально признало город Кентау зоной экологического бедствия из-за многолетнего загрязнения от горнодобывающих предприятий. Власти анонсировали комплексную государственную программу рекультивации земель, очистки подземных вод и переселения жителей из наиболее пострадавших районов с привлечением международных экологов.",
    readTime: "3 мин",
  },
  {
    id: 1,
    title: "Экологическая ситуация в Жамбылской области",
    tag: "Водные ресурсы",
    date: "27 июля 2026",
    img: "https://images.unsplash.com/photo-1579227114496-27346f474519?w=900&q=80&auto=format&fit=crop",
    content:
      "Экологи фиксируют ухудшение качества воды в реках региона. Инициирована совместная межведомственная проверка с участием местных властей, экспертов RES Network и международных наблюдателей для оценки масштаба проблемы и разработки плана защиты водных артерий.",
    readTime: "4 мин",
  },
  {
    id: 2,
    title: "Казахстан и ЕС расширяют сотрудничество в зелёной энергетике",
    tag: "Партнёрство",
    date: "15 мая 2026",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop",
    content:
      "Подписан стратегический меморандум о расширении инвестиций в возобновляемую энергетику и водородные технологии Казахстана. ЕС выделит грантовое и льготное финансирование на развитие солнечных и ветровых электростанций в рамках европейской инициативы Global Gateway.",
    readTime: "5 мин",
  },
  {
    id: 3,
    title: "Международные инвесторы изучают возможности в Центральной Азии",
    tag: "Инвестиции",
    date: "8 мая 2026",
    img: "https://images.unsplash.com/photo-1515548212260-ac87067b15ab?w=900&q=80&auto=format&fit=crop",
    content:
      "Делегация глобальных климатических фондов посетила несколько ключевых проектов устойчивого развития в Узбекистане и Казахстане, оценивая потенциал синдицированных инвестиций в зелёную энергетику, логистику и промышленную декарбонизацию на сумму свыше $1.8 млрд.",
    readTime: "4 мин",
  },
  {
    id: 4,
    title: "Новая программа поддержки водосбережения запущена в регионе",
    tag: "Водные ресурсы",
    date: "2 апреля 2026",
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop",
    content:
      "Региональные власти совместно с международными финансовыми институтами запустили масштабную программу модернизации ирригационных систем, субсидирования капельного орошения и цифрового учета трансграничных каналов, направленную на сокращение потерь воды на 35%.",
    readTime: "3 мин",
  },
  {
    id: 5,
    title: "Astana Hub объявил грантовый конкурс для зелёных стартапов",
    tag: "Инновации",
    date: "20 марта 2026",
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&q=80&auto=format&fit=crop",
    content:
      "Технопарк выделит безвозмездное финансирование стартапам в сфере чистых технологий (CleanTech), мониторинга выбросов и переработки отходов. Победители получат акселерацию и прямой доступ к ведущим венчурным фондам региона.",
    readTime: "3 мин",
  },
  {
    id: 6,
    title: "Форум по критическим минералам пройдёт в Алматы",
    tag: "Критические минералы",
    date: "5 марта 2026",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop",
    content:
      "Саммит соберёт представителей добывающих компаний, регуляторов и технологических лидеров для обсуждения устойчивой добычи лития, меди и редкоземельных металлов, необходимых для глобального энергоперехода и аккумуляторной индустрии.",
    readTime: "4 мин",
  },
  {
    id: 7,
    title: "Отчёт: инвестиции в ВИЭ Центральной Азии выросли на 18%",
    tag: "Аналитика",
    date: "14 февраля 2026",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop",
    content:
      "Согласно свежему аналитическому отчёту RES Network и международных агентств, регион демонстрирует рекордный темп привлечения частного капитала в солнечные и ветровые парки, превысив $3.4 млрд за прошедший год.",
    readTime: "6 мин",
  },
];

export default function NewsSection() {
  const [newsData, setNewsData] = useState<any[]>(NEWS_ALL);
  const [selectedNews, setSelectedNews] = useState<any | null>(null);

  useEffect(() => {
    import("@/app/actions/news").then(({ getRSSNews }) => {
      getRSSNews().then(feedNews => {
        if (feedNews && feedNews.length > 0) {
          // Маппим данные под наш UI
          const mapped = feedNews.map(n => ({
            id: n.id,
            title: n.title,
            tag: n.category,
            date: n.date,
            img: n.image,
            content: n.summary,
            readTime: "RSS",
            sourceUrl: n.sourceUrl
          }));
          
          // Дополняем нашими новостями, если нужно (чтобы сетка не ломалась, нужно минимум 8)
          const combined = [...mapped, ...NEWS_ALL];
          setNewsData(combined.slice(0, 8));
        }
      });
    });
  }, []);

  const featured = newsData[0];
  const sideNews = newsData.slice(1, 3);
  const bottomGrid = newsData.slice(3, 7);

  return (
    <div className="relative w-full">
      {/* Заголовок секции с эффектом Focus Reveal */}
      <div className="mb-10">
        <FocusRevealHeading
          tokens={[
            { text: "Новости", isAccent: false },
            { text: "экосистемы", isAccent: true },
          ]}
          className="text-3xl md:text-5xl font-bold tracking-tight text-[#f2ede2]"
          align="left"
        />
      </div>

      {/* Верхний Bento-ряд новостей (Главная новость + Боковые карточки + Виджет инсайтов) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        
        {/* Главная большая новость (Left 7 cols) */}
        <div
          onClick={() => setSelectedNews(featured)}
          className="lg:col-span-7 relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#063325]/75 to-[#041a13]/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.7)] group cursor-pointer flex flex-col justify-between"
        >
          <div className="relative overflow-hidden h-72 md:h-96">
            <img
              src={featured?.img}
              alt={featured?.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041a13] via-[#041a13]/30 to-transparent" />
            <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-black/75 border border-emerald-400/30 text-emerald-300 backdrop-blur-md">
              {featured?.tag}
            </span>
          </div>

          <div className="p-8">
            <span className="text-xs text-emerald-400/70 font-mono block mb-2">{featured?.date}</span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#f2ede2] leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2">
              {featured?.title}
            </h3>
            <p className="mt-3 text-sm md:text-base text-[#9fb7a8] leading-relaxed line-clamp-2">
              {featured?.content}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors">
              <span>Подробнее</span>
              <ArrowUpRight size={15} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Правая колонка (2 новости + инсайт виджет) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {sideNews.map((news) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="flex gap-4 items-center p-4 rounded-3xl border border-emerald-500/20 bg-[#06241a]/60 backdrop-blur-md cursor-pointer hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#062d21]/75 transition-all duration-300 group"
            >
              <img
                src={news.img}
                alt={news.title}
                className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-2xl shrink-0"
              />
              <div className="flex-1 pr-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {news.tag}
                  </span>
                  <span className="text-[10px] text-emerald-400/60 font-mono">{news.readTime}</span>
                </div>
                <h4 className="font-bold text-sm md:text-base text-[#f2ede2] group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h4>
                <span className="text-[11px] text-emerald-400/70 font-mono mt-1 block">{news.date}</span>
              </div>
            </div>
          ))}

          {/* Инсайт-виджет недели */}
          <div className="p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#063b2c]/80 to-[#041d14]/95 backdrop-blur-xl relative overflow-hidden flex-1 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
                <TrendingUp size={15} />
                <span>Тренд недели в ЦА</span>
              </div>
              <h4 className="text-lg font-bold text-[#f2ede2] leading-snug">
                +18% рост прямых инвестиций в солнечную генерацию региона
              </h4>
              <p className="text-xs text-[#9fb7a8] mt-2 leading-relaxed">
                Инвестиционный портфель ветровых и солнечных станций 5 стран Центральной Азии превысил $4.2 млрд.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Нижняя 4-колоночная сетка остальных новостей */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {bottomGrid.map((news) => (
          <div
            key={news.id}
            onClick={() => setSelectedNews(news)}
            className="rounded-3xl border border-emerald-500/20 bg-[#06241a]/50 backdrop-blur-md overflow-hidden cursor-pointer hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-[#062d21]/70 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              <div className="relative h-40 overflow-hidden">
                <img
                  src={news.img}
                  alt={news.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/70 border border-emerald-400/30 text-emerald-300 backdrop-blur-md">
                  {news.tag}
                </span>
              </div>
              <div className="p-5">
                <span className="text-[10px] text-emerald-400/70 font-mono block mb-1.5">{news.date}</span>
                <h4 className="font-bold text-sm md:text-base text-[#f2ede2] group-hover:text-emerald-300 transition-colors leading-snug line-clamp-2">
                  {news.title}
                </h4>
              </div>
            </div>

            <div className="px-5 pb-5 pt-1 flex items-center justify-between text-xs text-emerald-400 font-bold">
              <span>Читать</span>
              <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Детальный Pop-up новости */}
      {selectedNews && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-b from-[#064e3b]/95 to-[#041a13]/98 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in zoom-in-95 duration-200"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <img
              src={selectedNews.img}
              alt={selectedNews.title}
              className="w-full object-cover h-72 md:h-96"
            />

            <div className="p-8 md:p-12">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30">
                  {selectedNews.tag}
                </span>
                <span className="text-xs text-emerald-400/70 font-mono">{selectedNews.date}</span>
                <span className="text-xs text-emerald-400/60 font-mono">· {selectedNews.readTime} чтения</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold mt-2 mb-6 leading-tight text-[#f2ede2]">
                {selectedNews.title}
              </h3>

              <p className="text-base md:text-lg leading-relaxed text-[#9fb7a8] whitespace-pre-line">
                {selectedNews.content}
              </p>

              <div className="mt-10 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-emerald-400/80">Информационная служба RES Network</span>
                
                <div className="flex gap-3 w-full sm:w-auto">
                  {selectedNews.sourceUrl && (
                    <a
                      href={selectedNews.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none text-center px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors"
                    >
                      Читать оригинал
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-full text-xs font-bold text-emerald-300 bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/60 transition-colors cursor-pointer"
                  >
                    Закрыть
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
