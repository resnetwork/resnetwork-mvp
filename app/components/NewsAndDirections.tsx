"use client";

import { useState } from "react";
import {
  X,
  Sun,
  CloudSun,
  Droplet,
  Leaf,
  Factory,
  Gem,
  Sparkles,
  ArrowUpRight,
  Compass,
} from "lucide-react";

const NEWS_ALL = [
  {
    title: "Кентау признали зоной экологического бедствия",
    tag: "Климат и политика",
    date: "27 июля 2026",
    img: "https://images.unsplash.com/photo-1632103996718-4a47cf68b75e?w=900&q=80&auto=format&fit=crop",
    content: "Правительство официально признало город Кентау зоной экологического бедствия из-за многолетнего загрязнения от горнодобывающих предприятий. Власти анонсировали программу рекультивации земель и переселения жителей из наиболее пострадавших районов.",
  },
  {
    title: "Экологическая ситуация в Жамбылской области",
    tag: "Климат и политика",
    date: "27 июля 2026",
    img: "https://images.unsplash.com/photo-1579227114496-27346f474519?w=900&q=80&auto=format&fit=crop",
    content: "Экологи фиксируют ухудшение качества воды в реках региона. Инициирована совместная проверка с участием местных властей и международных наблюдателей для оценки масштаба проблемы.",
  },
  {
    title: "Казахстан и ЕС расширяют сотрудничество в зелёной энергетике",
    tag: "Партнёрство",
    date: "15 мая 2026",
    img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop",
    content: "Подписан меморандум о расширении инвестиций в возобновляемую энергетику Казахстана. ЕС выделит финансирование на развитие солнечных и ветровых электростанций в рамках новой климатической стратегии.",
  },
  {
    title: "Международные инвесторы изучают возможности в Центральной Азии",
    tag: "Инвестиции",
    date: "8 мая 2026",
    img: "https://images.unsplash.com/photo-1515548212260-ac87067b15ab?w=900&q=80&auto=format&fit=crop",
    content: "Делегация международных фондов посетила несколько проектов устойчивого развития региона, оценивая потенциал долгосрочных инвестиций в зелёную инфраструктуру и промышленность.",
  },
  {
    title: "Новая программа поддержки водосбережения запущена в регионе",
    tag: "Водные ресурсы",
    date: "2 апреля 2026",
    img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=900&q=80&auto=format&fit=crop",
    content: "Региональные власти совместно с международными организациями запустили программу модернизации ирригационных систем, направленную на сокращение потерь воды в сельском хозяйстве.",
  },
  {
    title: "Astana Hub объявил новый грант для зелёных стартапов",
    tag: "Инвестиции",
    date: "20 марта 2026",
    img: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&q=80&auto=format&fit=crop",
    content: "Технопарк выделит финансирование проектам в сфере чистой энергетики и устойчивого сельского хозяйства. Приём заявок открыт до конца квартала.",
  },
  {
    title: "Форум по критическим минералам пройдёт в Алматы",
    tag: "Климат и политика",
    date: "5 марта 2026",
    img: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=900&q=80&auto=format&fit=crop",
    content: "Мероприятие соберёт представителей добывающих компаний и регуляторов для обсуждения устойчивой добычи минералов, критически важных для зелёной энергетики.",
  },
  {
    title: "Отчёт: инвестиции в ВИЭ Центральной Азии выросли на 18%",
    tag: "Партнёрство",
    date: "14 февраля 2026",
    img: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&q=80&auto=format&fit=crop",
    content: "Согласно новому отчёту международных наблюдателей, регион демонстрирует устойчивый рост вложений в солнечную и ветровую генерацию третий год подряд.",
  },
];

const DIRECTIONS = [
  {
    id: 0,
    title: "Возобновляемая энергетика",
    shortTitle: "ВИЭ",
    Icon: Sun,
    desc: "Проекты и инвестиции в солнечную, ветровую и гидроэнергетику в Центральной Азии. Развитие сетей и накопителей энергии.",
  },
  {
    id: 1,
    title: "Климат и политика",
    shortTitle: "Климат",
    Icon: CloudSun,
    desc: "Государственная политика, межгосударственные соглашения и климатические стратегии региона. Декарбонизация отраслей.",
  },
  {
    id: 2,
    title: "Водные ресурсы",
    shortTitle: "Вода",
    Icon: Droplet,
    desc: "Управление трансграничными водными ресурсами, внедрение водосберегающих технологий и защита высокогорных ледников.",
  },
  {
    id: 3,
    title: "Зелёное финансирование",
    shortTitle: "ESG Капитал",
    Icon: Leaf,
    desc: "Инвестиции, выпуск зелёных облигаций, гранты и инструменты синдикации для масштабных экологических инициатив.",
  },
  {
    id: 4,
    title: "Устойчивая промышленность",
    shortTitle: "Индустрия",
    Icon: Factory,
    desc: "Модернизация промышленного производства, улавливание метана и внедрение международных стандартов GRI.",
  },
  {
    id: 5,
    title: "Критические минералы",
    shortTitle: "Минералы",
    Icon: Gem,
    desc: "Экологически ответственная добыча и глубокая переработка редкоземельных металлов, необходимых для чистого энергоперехода.",
  },
];

const PAGE_SIZE = 4;
const RADIAL_RADIUS = 135; // Радиус вылета элементов в пикселях

export default function NewsAndDirections() {
  const [selectedDirection, setSelectedDirection] = useState<number | null>(null);
  const [selectedNews, setSelectedNews] = useState<number | null>(null);
  const [isRadialOpen, setIsRadialOpen] = useState<boolean>(false);
  const [hoveredRadialIndex, setHoveredRadialIndex] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(NEWS_ALL.length / PAGE_SIZE);
  const pageItems = NEWS_ALL.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const featuredIndex = page * PAGE_SIZE;
  const [featured, ...rest] = pageItems;

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,1.05fr)] items-start">
      {/* Левая колонка: Новости */}
      <div>
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-2 text-emerald-400">
          ЧТО НОВОГО
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#f2ede2] tracking-tight">
          Новости экосистемы
        </h2>

        {/* Главная новость */}
        <div
          onClick={() => setSelectedNews(featuredIndex)}
          className="rounded-3xl overflow-hidden mb-6 cursor-pointer border border-emerald-500/20 bg-gradient-to-b from-[#062f22]/70 to-[#041a13]/90 backdrop-blur-xl hover:-translate-y-1.5 hover:border-emerald-400/40 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-300 group"
        >
          <div className="relative overflow-hidden h-72 md:h-80">
            <img
              src={featured.img}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041a13] via-transparent to-transparent opacity-80" />
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-black/60 border border-emerald-500/30 text-emerald-300 backdrop-blur-md">
              {featured.tag}
            </span>
          </div>
          <div className="p-7 md:p-8">
            <h3 className="font-bold text-2xl md:text-3xl text-[#f2ede2] leading-snug group-hover:text-emerald-300 transition-colors">
              {featured.title}
            </h3>
            <p className="text-xs mt-3 text-emerald-400/80 font-mono">{featured.date}</p>
          </div>
        </div>

        {/* Список остальных новостей */}
        <div className="flex flex-col gap-3.5 mb-8">
          {rest.map((news, i) => (
            <div
              key={news.title}
              onClick={() => setSelectedNews(featuredIndex + i + 1)}
              className="flex gap-4 items-center p-3.5 rounded-2xl border border-emerald-500/15 bg-[#06241a]/60 backdrop-blur-md cursor-pointer hover:-translate-y-1 hover:border-emerald-500/35 hover:bg-[#062d21]/70 transition-all duration-300 group"
            >
              <img
                src={news.img}
                alt={news.title}
                className="w-16 h-16 object-cover rounded-xl flex-shrink-0"
              />
              <div>
                <span className="text-[11px] font-bold text-emerald-400">{news.tag}</span>
                <h3 className="font-semibold text-sm mt-0.5 text-[#f2ede2] group-hover:text-emerald-300 transition-colors line-clamp-2">
                  {news.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Пагинация */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  page === i
                    ? "bg-emerald-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    : "bg-emerald-950/40 text-emerald-200 border border-emerald-500/20 hover:border-emerald-500/40"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Правая колонка: Интерактивное Радиальное Меню «Направления» (Motion Radial Menu) */}
      <div className="sticky top-24">
        <span className="inline-block text-xs font-bold uppercase tracking-widest mb-2 text-emerald-400">
          ИНТЕРАКТИВНЫЙ ФОКУС
        </span>
        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-[#f2ede2] tracking-tight">
          Направления
        </h2>

        {/* Интерактивная радиальная капсула */}
        <div className="relative w-full rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#063325]/80 via-[#042017]/90 to-[#02130e]/95 p-8 md:p-10 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[440px]">
          {/* Декоративное фоновое свечение */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl animate-pulse" />
            <div className="w-64 h-64 rounded-full border border-emerald-500/10 border-dashed" />
            <div className="w-44 h-44 rounded-full border border-emerald-500/15" />
          </div>

          {/* Центральный триггер с лого солнца/компаса */}
          <div className="relative z-20 flex flex-col items-center">
            <button
              onClick={() => setIsRadialOpen((prev) => !prev)}
              aria-label="Раскрыть направления"
              className={`relative z-30 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl ${
                isRadialOpen
                  ? "bg-gradient-to-tr from-emerald-500 to-green-300 text-black shadow-[0_0_40px_rgba(74,222,128,0.8)] scale-110 rotate-45"
                  : "bg-gradient-to-tr from-emerald-700 to-emerald-500 text-white hover:scale-110 shadow-[0_0_30px_rgba(34,197,94,0.5)] border-2 border-emerald-300/60 animate-bounce"
              }`}
            >
              {isRadialOpen ? (
                <X size={34} strokeWidth={2.5} />
              ) : (
                <Sun size={38} strokeWidth={2} className="animate-spin duration-1000" style={{ animationDuration: "12s" }} />
              )}
            </button>

            <span className="mt-4 text-xs font-bold uppercase tracking-widest text-emerald-300/90 text-center select-none">
              {isRadialOpen ? "Нажмите для закрытия" : "Нажмите на солнце"}
            </span>
            <span className="text-[11px] text-[#9fb7a8] text-center mt-0.5">
              {isRadialOpen ? "Выберите сферу для открытия деталей" : "чтобы открыть 6 направлений"}
            </span>

            {/* Вылетающие радиальные элементы (6 направлений по окружности) */}
            <div className="absolute top-10 left-10 pointer-events-none">
              {DIRECTIONS.map((dir, i) => {
                const angle = (i * (2 * Math.PI / DIRECTIONS.length)) - Math.PI / 2;
                const tx = Math.round(Math.cos(angle) * RADIAL_RADIUS);
                const ty = Math.round(Math.sin(angle) * RADIAL_RADIUS);

                const Icon = dir.Icon;
                const isHovered = hoveredRadialIndex === i;

                return (
                  <div
                    key={dir.id}
                    className="absolute pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                      transform: isRadialOpen
                        ? `translate(${tx}px, ${ty}px) scale(1)`
                        : `translate(0px, 0px) scale(0)`,
                      opacity: isRadialOpen ? 1 : 0,
                      transitionDelay: isRadialOpen ? `${i * 50}ms` : "0ms",
                    }}
                  >
                    <div className="relative group -translate-x-1/2 -translate-y-1/2">
                      <button
                        onClick={() => setSelectedDirection(i)}
                        onMouseEnter={() => setHoveredRadialIndex(i)}
                        onMouseLeave={() => setHoveredRadialIndex(null)}
                        className={`w-13 h-13 md:w-14 md:h-14 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-xl ${
                          isHovered
                            ? "bg-emerald-400 text-black border-emerald-200 scale-125 shadow-[0_0_25px_rgba(74,222,128,0.9)]"
                            : "bg-[#063325]/90 text-emerald-300 border-emerald-400/40 hover:border-emerald-300 hover:bg-emerald-500 hover:text-black backdrop-blur-xl"
                        }`}
                      >
                        <Icon size={22} strokeWidth={2} />
                      </button>

                      {/* Парящий тултип с названием */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-xl bg-black/85 border border-emerald-400/40 text-[11px] font-bold text-emerald-200 backdrop-blur-md pointer-events-none transition-all duration-200 z-40 ${
                          isHovered
                            ? "opacity-100 scale-100 -top-8"
                            : "opacity-0 scale-90 top-0"
                        }`}
                      >
                        {dir.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Список-список внизу для быстрого доступа */}
          <div className="relative z-10 mt-8 pt-6 border-t border-emerald-500/15 w-full grid grid-cols-2 gap-2">
            {DIRECTIONS.map((d, i) => (
              <button
                key={d.id}
                onClick={() => setSelectedDirection(i)}
                className="flex items-center gap-2 p-2 rounded-xl text-left hover:bg-emerald-950/50 transition-colors group cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                  <d.Icon size={13} />
                </div>
                <span className="text-xs text-[#9fb7a8] group-hover:text-[#f2ede2] truncate font-medium">
                  {d.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Поп-ап выбранного направления */}
      {selectedDirection !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDirection(null)}
        >
          <div
            className="relative max-w-md w-full rounded-3xl p-8 border border-emerald-500/40 bg-gradient-to-b from-[#064e3b] to-[#041d14] shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedDirection(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
              {(() => {
                const Icon = DIRECTIONS[selectedDirection].Icon;
                return <Icon size={28} />;
              })()}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Сфера фокуса
            </span>
            <h3 className="text-2xl font-bold mt-1 mb-3 text-[#f2ede2]">
              {DIRECTIONS[selectedDirection].title}
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-[#9fb7a8]">
              {DIRECTIONS[selectedDirection].desc}
            </p>
            <button
              onClick={() => setSelectedDirection(null)}
              className="w-full py-3.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors cursor-pointer"
            >
              Понятно
            </button>
          </div>
        </div>
      )}

      {/* Поп-ап новости */}
      {selectedNews !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedNews(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-b from-[#064e3b]/95 to-[#041d14]/98 shadow-2xl backdrop-blur-2xl animate-in zoom-in-95 duration-200"
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
              src={NEWS_ALL[selectedNews].img}
              alt={NEWS_ALL[selectedNews].title}
              className="w-full object-cover h-72 md:h-96"
            />
            <div className="p-8 md:p-12">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                {NEWS_ALL[selectedNews].tag}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold mt-3 mb-2 leading-tight text-[#f2ede2]">
                {NEWS_ALL[selectedNews].title}
              </h3>
              <p className="text-xs mb-6 text-emerald-400/70 font-mono">{NEWS_ALL[selectedNews].date}</p>
              <p className="text-base md:text-lg leading-relaxed text-[#9fb7a8]">{NEWS_ALL[selectedNews].content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
