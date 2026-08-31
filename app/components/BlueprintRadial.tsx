"use client";

import { useState } from "react";
import { ArrowUpRight, X, Sparkles, ChevronRight, Sun, CloudSun, Droplet, Leaf, Factory, Gem } from "lucide-react";
import FocusRevealHeading from "./FocusRevealHeading";

interface WedgeData {
  id: string;
  index: number;
  title: string;
  shortTitle: string;
  tag: string;
  goal: string;
  summary: string;
  details: string;
  projects: string[];
  image: string;
  path: string;
  dotAngle: number;
  btnPositionClass: string;
}

const WEDGES: WedgeData[] = [
  {
    id: "clean-energy",
    index: 0,
    title: "Возобновляемая энергетика",
    shortTitle: "Возобновляемая энергетика",
    tag: "Генерация и сети",
    goal: "15+ ГВт мощности к 2030 г.",
    summary: "Масштабирование солнечной, ветровой и гидрогенерации в Центральной Азии.",
    details: "Комплексное развитие проектов солнечной и ветровой энергетики, внедрение промышленных систем накопления энергии (BESS), модернизация региональных межсистемных линий электропередач для трансграничного обмена чистой энергией.",
    projects: ["СЭС Жанакорган 500 МВт", "ВЭС Ерейментау 250 МВт", "Камбаратинская ГЭС-1", "BESS накопители 100 МВт*ч"],
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&q=80&auto=format&fit=crop", // Wind turbines in green hills
    path: "M127.85 41.5807C125.089 36.7978 126.719 30.6623 131.61 28.0978C166.771 9.66253 205.926 -0.00126222 245.726 0.00293272C285.526 0.00712766 324.678 9.67917 359.836 28.1218C364.726 30.6874 366.355 36.8232 363.593 41.6056L254.361 230.708C250.511 237.373 240.89 237.372 237.042 230.706L127.85 41.5807Z",
    dotAngle: 0,
    btnPositionClass: "top-[-38px] left-1/2 -translate-x-1/2",
  },
  {
    id: "climate-policy",
    index: 1,
    title: "Климат и углеродная политика",
    shortTitle: "Климат & ETS",
    tag: "Регулирование и углерод",
    goal: "Carbon Neutrality 2060",
    summary: "Гармонизация законодательства и запуск региональной системы торговли квотами (ETS).",
    details: "Создание единой региональной платформы мониторинга выбросов CO2, гармонизация климатических стандартов стран Центральной Азии с европейским CBAM, развитие рынка верифицированных углеродных офсетов.",
    projects: ["Единый углеродный реестр ЦА", "Национальная система ETS", "ESG-стандарты для листинга"],
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=900&q=80&auto=format&fit=crop", // Lush forest canopy & carbon sink
    path: "M363.549 41.5806C366.31 36.7977 372.439 35.1417 377.105 38.0955C410.651 59.3284 438.597 88.4048 458.494 122.875C478.39 157.345 489.59 196.088 491.197 235.756C491.42 241.274 486.921 245.753 481.398 245.752L263.015 245.706C255.318 245.704 250.509 237.372 254.357 230.706L363.549 41.5806Z",
    dotAngle: 60,
    btnPositionClass: "top-[15%] right-[-45px] md:right-[-90px]",
  },
  {
    id: "water-resources",
    index: 2,
    title: "Водные ресурсы и ирригация",
    shortTitle: "Водные ресурсы",
    tag: "Экосистемы и ирригация",
    goal: "-35% потерь воды в сельском хозяйстве",
    summary: "Трансграничное управление бассейнами рек и цифровизация учета воды.",
    details: "Модернизация гидротехнических сооружений, автоматизация шлюзов на трансграничных каналах рек Сырдарья и Амударья, масштабное внедрение систем капельного орошения и восстановление экосистемы Приаралья.",
    projects: ["Smart Water Бассейна Арала", "Автоматизация каналов БАК", "Программа сохранения ледников Тянь-Шаня"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=900&q=80&auto=format&fit=crop", // Pure turquoise alpine lake / water resource
    path: "M481.403 245.704C486.926 245.704 491.424 250.184 491.2 255.702C489.584 295.371 478.376 334.111 458.472 368.578C438.569 403.044 410.616 432.115 377.065 453.341C372.398 456.293 366.27 454.636 363.51 449.853L254.357 260.703C250.509 254.036 255.321 245.704 263.018 245.704L481.403 245.704Z",
    dotAngle: 120,
    btnPositionClass: "bottom-[15%] right-[-45px] md:right-[-90px]",
  },
  {
    id: "green-finance",
    index: 3,
    title: "Зелёное финансирование & ESG",
    shortTitle: "Зелёные финансы",
    tag: "Инвестиции и фонды",
    goal: "$5B+ частных инвестиций",
    summary: "Привлечение ESG-инвестиций, выпуск зелёных облигаций и синдицированное финансирование.",
    details: "Создание синдицированных пулов международных инвесторов, выпуск суверенных и корпоративных Green Bonds через финансовый хаб AIFC, грантовые программы поддержки зеленых стартапов и МСБ.",
    projects: ["Green Bonds AIFC", "Central Asia Climate Fund", "ESG-верификация банковских портфелей"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format&fit=crop", // Modern glass financial skyscraper
    path: "M238.338 261.448C241.61 255.783 249.788 255.784 253.06 261.45L362.252 450.576C364.607 454.656 363.195 459.83 359.095 461.98C324.148 480.303 285.232 489.908 245.675 489.904C206.117 489.9 167.205 480.287 132.262 461.957C128.161 459.806 126.75 454.631 129.106 450.552L238.338 261.448Z",
    dotAngle: 180,
    btnPositionClass: "bottom-[-38px] left-1/2 -translate-x-1/2",
  },
  {
    id: "sustainable-industry",
    index: 4,
    title: "Устойчивая промышленность",
    shortTitle: "CleanTech & Индустрия",
    tag: "Декарбонизация",
    goal: "-40% выбросов предприятий",
    summary: "Декарбонизация тяжелой индустрии, энергоэффективность и зеленый водород.",
    details: "Внедрение технологий улавливания и утилизации углерода (CCUS), переход металлургических комбинатов на электродуговую плавку, пилотные заводы по производству зеленого водорода и развитие циркулярной экономики.",
    projects: ["Зеленый водород Мангистау (Hyrasia)", "Электроплавка стали в Темиртау", "CleanTech Акселератор"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80&auto=format&fit=crop", // High-tech CleanTech automation & industry
    path: "M127.849 449.822C125.088 454.605 118.959 456.261 114.293 453.307C80.7467 432.074 52.8008 402.998 32.9044 368.528C13.008 334.058 1.8083 295.316 0.201364 255.648C-0.0221799 250.129 4.47716 245.651 10 245.652L228.382 245.698C236.079 245.699 240.889 254.032 237.04 260.698L127.849 449.822Z",
    dotAngle: 240,
    btnPositionClass: "bottom-[15%] left-[-45px] md:left-[-90px]",
  },
  {
    id: "critical-minerals",
    index: 5,
    title: "Критические минералы",
    shortTitle: "Критические металлы",
    tag: "Батарейные металлы",
    goal: "100% соблюдение стандартов IRMA",
    summary: "Ответственная добыча лития, редкоземельных металлов и меди для энергоперехода.",
    details: "Экологически чистая добыча и глубокая переработка стратегических металлов (литий, никель, кобальт, медь, редкоземельные элементы), необходимых для глобального производства солнечных батарей и тяговых аккумуляторов.",
    projects: ["Литиевый кластер ВКО", "Редкоземельные металлы Аксу", "Медный проект Актогай"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&q=80&auto=format&fit=crop", // Futuristic crystalline mineral & lithium structure
    path: "M10 245.704C4.47716 245.704 -0.0212433 241.224 0.203455 235.706C1.81873 196.037 13.0269 157.296 32.931 122.829C52.8352 88.3629 80.7879 59.2917 114.339 38.0655C119.006 35.1127 125.135 36.77 127.895 41.5535L237.049 230.706C240.896 237.372 236.085 245.704 228.388 245.704L10 245.704Z",
    dotAngle: 300,
    btnPositionClass: "top-[15%] left-[-45px] md:left-[-90px]",
  },
];

export default function BlueprintRadial() {
  const [activeWedge, setActiveWedge] = useState<WedgeData | null>(null);
  const [hoveredWedge, setHoveredWedge] = useState<WedgeData | null>(null);

  const displayWedge = hoveredWedge || activeWedge;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20 relative">
      
      {/* Заголовок (Слева Title, справа краткое пояснение) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 mb-8 lg:mb-12 items-end">
        <div className="lg:col-span-7">
          <FocusRevealHeading
            tokens={[
              { text: "Ключевые", isAccent: false },
              { text: "направления", isAccent: true },
            ]}
            className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight"
            align="left"
          />
        </div>
        <div className="lg:col-span-5">
          <p className="text-res-text-muted text-sm md:text-base leading-relaxed">
            Отслеживайте региональные данные по ключевым направлениям перехода к чистой энергии Центральной Азии.
          </p>
        </div>
      </div>

      {/* Центральный визуальный сегментированный круг (OceanCentral Style) */}
      <div className="relative flex items-center justify-center my-8 md:my-16">
        
        {/* Фоновое свечение */}
        <div className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] bg-res-accent/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Контейнер колеса с внешними кнопками */}
        <div className="relative w-[340px] h-[340px] sm:w-[440px] sm:h-[440px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
          
          {/* Внешняя светящаяся орбита с точками */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_120s_linear_infinite]"
            viewBox="0 0 562 562"
            fill="none"
          >
            <circle
              cx="281"
              cy="281"
              r="268"
              stroke="url(#orbit_gradient)"
              strokeWidth="1.2"
              strokeDasharray="4 6"
              opacity="0.4"
            />
            {WEDGES.map((wedge) => (
              <circle
                key={`dot-${wedge.id}`}
                cx="281"
                cy="13"
                r="4.5"
                fill={displayWedge?.id === wedge.id ? "#E0EAB8" : "#02B779"}
                transform={`rotate(${wedge.dotAngle} 281 281)`}
                className="transition-all duration-300 shadow-[0_0_10px_#02B779]"
              />
            ))}
            <defs>
              <linearGradient id="orbit_gradient" x1="0" y1="0" x2="562" y2="562" gradientUnits="userSpaceOnUse">
                <stop stopColor="#02B779" />
                <stop offset="0.5" stopColor="#E0EAB8" />
                <stop offset="1" stopColor="#2E8656" />
              </linearGradient>
            </defs>
          </svg>

          {/* SVG Segmented Pie Wheel (Exact OceanCentral geometry) */}
          <svg
            className="w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[440px] md:h-[440px] lg:w-[490px] lg:h-[490px] drop-shadow-[0_15px_40px_rgba(0,0,0,0.8)]"
            viewBox="0 0 492 492"
            fill="none"
          >
            <defs>
              {WEDGES.map((wedge) => (
                <clipPath id={`clip-${wedge.id}`} key={`clip-${wedge.id}`}>
                  <path d={wedge.path} />
                </clipPath>
              ))}
            </defs>

            {/* Photographic Images for each wedge */}
            <g className="wedge-images">
              {WEDGES.map((wedge) => {
                const isHovered = displayWedge?.id === wedge.id;
                return (
                  <g
                    key={`img-group-${wedge.id}`}
                    clipPath={`url(#clip-${wedge.id})`}
                    className="cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setHoveredWedge(wedge)}
                    onMouseLeave={() => setHoveredWedge(null)}
                    onClick={() => setActiveWedge(wedge)}
                  >
                    <image
                      href={wedge.image}
                      preserveAspectRatio="xMidYMid slice"
                      width="492"
                      height="492"
                      className={`transition-all duration-700 ease-out origin-center ${
                        isHovered ? "scale-110 brightness-115" : "scale-100 brightness-75 hover:brightness-90"
                      }`}
                    />
                    {/* Color tint overlay */}
                    <path
                      d={wedge.path}
                      fill={isHovered ? "rgba(2, 183, 121, 0.15)" : "rgba(2, 73, 63, 0.35)"}
                      className="transition-colors duration-300"
                    />
                  </g>
                );
              })}
            </g>

            {/* Wedge outline borders */}
            <g className="wedge-borders pointer-events-none">
              {WEDGES.map((wedge) => {
                const isHovered = displayWedge?.id === wedge.id;
                return (
                  <path
                    key={`border-${wedge.id}`}
                    d={wedge.path}
                    stroke={isHovered ? "#E0EAB8" : "rgba(161, 187, 148, 0.4)"}
                    strokeWidth={isHovered ? "3.5" : "1.8"}
                    fill="none"
                    className="transition-all duration-300"
                  />
                );
              })}
            </g>
          </svg>

          {/* Центральный сияющий значок солнца */}
          <div
            className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-[#02493F]/90 border border-res-accent/50 shadow-[0_0_35px_rgba(2,183,121,0.5)] flex items-center justify-center cursor-pointer hover:scale-110 transition-all duration-300 backdrop-blur-2xl group"
            onClick={() => setActiveWedge(WEDGES[0])}
          >
            {/* Фоновое сияние солнца */}
            <div className="absolute inset-0 rounded-full bg-[#AFE552]/20 blur-md animate-pulse pointer-events-none" />
            <div className="relative z-10 flex items-center justify-center text-[#E0EAB8] group-hover:text-white transition-colors">
              <Sun size={28} className="animate-[spin_30s_linear_infinite] text-[#E0EAB8] group-hover:text-[#AFE552] transition-colors drop-shadow-[0_0_12px_#AFE552]" />
            </div>
          </div>

          {/* Интерактивные кнопки вокруг колеса (как на OceanCentral) */}
          {WEDGES.map((wedge) => {
            const isHovered = displayWedge?.id === wedge.id;
            return (
              <button
                key={`btn-${wedge.id}`}
                onClick={() => setActiveWedge(wedge)}
                onMouseEnter={() => setHoveredWedge(wedge)}
                onMouseLeave={() => setHoveredWedge(null)}
                className={`absolute z-30 hidden sm:flex items-center gap-2 px-3.5 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-[10px] md:text-xs tracking-wider uppercase transition-all duration-300 shadow-xl cursor-pointer backdrop-blur-xl border ${
                  wedge.btnPositionClass
                } ${
                  isHovered
                    ? "bg-res-accent text-[#020b14] border-white shadow-[0_0_25px_rgba(0,240,255,0.6)] scale-105 z-40"
                    : "glass-panel text-res-text border-res-accent/30 hover:border-res-accent hover:text-white"
                }`}
              >
                <span>{wedge.shortTitle}</span>
                <ArrowUpRight size={14} className={`transition-transform duration-300 ${isHovered ? "translate-x-0.5 -translate-y-0.5" : ""}`} />
              </button>
            );
          })}

        </div>
      </div>

      {/* Мобильный список направлений (для экранов < 640px) */}
      <div className="grid grid-cols-2 gap-2.5 sm:hidden mt-6">
        {WEDGES.map((wedge) => (
          <button
            key={`mob-${wedge.id}`}
            onClick={() => setActiveWedge(wedge)}
            className="flex items-center justify-between p-3 rounded-2xl glass-panel border border-res-accent/30 text-left hover:border-res-accent transition-colors"
          >
            <span className="text-xs font-bold text-white leading-tight">{wedge.shortTitle}</span>
            <ChevronRight size={14} className="text-res-accent shrink-0" />
          </button>
        ))}
      </div>

      {/* Детальный Pop-up / Modal при клике на направление */}
      {activeWedge && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveWedge(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-3xl overflow-hidden border border-res-accent/50 bg-[#041220] shadow-[0_25px_80px_rgba(0,0,0,0.9)] backdrop-blur-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveWedge(null)}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-black/60 border border-res-accent/30 text-res-accent hover:text-white hover:bg-black/80 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="relative h-56 md:h-72 w-full overflow-hidden">
              <img
                src={activeWedge.image}
                alt={activeWedge.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041220] via-[#041220]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-res-accent/20 border border-res-accent/40 text-res-accent text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                  {activeWedge.tag}
                </span>
                <h3 className="text-2xl md:text-4xl font-black text-white mt-2 leading-tight">
                  {activeWedge.title}
                </h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-res-accent-light uppercase tracking-wider">Ключевой ориентир:</span>
                <span className="text-xs font-black text-white bg-white/10 px-3 py-1 rounded-lg border border-white/10">{activeWedge.goal}</span>
              </div>

              <p className="text-sm md:text-base text-res-text-muted leading-relaxed mb-6">
                {activeWedge.details}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-res-accent mb-3">
                  Флагманские проекты в регионе:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeWedge.projects.map((proj, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-res-panel border border-res-accent/20 text-white"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-res-accent/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="#events"
                  onClick={() => setActiveWedge(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs md:text-sm bg-res-accent hover:bg-res-accent-light text-[#020b14] transition-all"
                >
                  Смотреть события по направлению <ArrowUpRight size={16} />
                </a>
                <button
                  onClick={() => setActiveWedge(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs md:text-sm text-res-text-muted hover:text-white border border-white/10 hover:border-white/30 transition-all cursor-pointer"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
