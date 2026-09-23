"use client";

import { useState } from "react";
import { ArrowUpRight, X, ChevronRight } from "lucide-react";
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
  labelLines: string[];
  textX: number;
  textY: number;
  textAnchor: "start" | "middle" | "end";
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
    image: "/dir_1.jpg", 
    path: "M 500,500 L 100.00,500.00 L 100.14,489.53 L 100.55,479.07 L 101.23,468.62 L 102.19,458.19 L 103.42,447.79 L 104.92,437.43 L 106.70,427.11 L 108.74,416.84 L 111.05,406.62 L 113.63,396.47 L 116.47,386.39 L 119.58,376.39 L 122.94,366.48 L 126.57,356.65 L 130.45,346.93 L 134.58,337.31 L 138.97,327.80 L 143.60,318.40 L 148.47,309.14 L 153.59,300.00 Z",
    labelLines: ["Возобновляемая", "энергетика"],
    textX: 55, textY: 383, textAnchor: "end",
  },
  {
    id: "climate-policy",
    index: 1,
    title: "Климат и углеродная политика",
    shortTitle: "Климат и политика",
    tag: "Регулирование и углерод",
    goal: "Carbon Neutrality 2060",
    summary: "Гармонизация законодательства и запуск региональной системы торговли квотами (ETS).",
    details: "Создание единой региональной платформы мониторинга выбросов CO2, гармонизация климатических стандартов стран Центральной Азии с европейским CBAM, развитие рынка верифицированных углеродных офсетов.",
    projects: ["Единый углеродный реестр ЦА", "Национальная система ETS", "ESG-стандарты для листинга"],
    image: "/dir_2.jpg", 
    path: "M 500,500 L 153.59,300.00 L 158.94,291.00 L 164.53,282.14 L 170.35,273.44 L 176.39,264.89 L 182.66,256.50 L 189.14,248.27 L 195.84,240.22 L 202.74,232.35 L 209.85,224.66 L 217.16,217.16 L 224.66,209.85 L 232.35,202.74 L 240.22,195.84 L 248.27,189.14 L 256.50,182.66 L 264.89,176.39 L 273.44,170.35 L 282.14,164.53 L 291.00,158.94 L 300.00,153.59 Z",
    labelLines: ["Климат и", "политика"],
    textX: 170, textY: 175, textAnchor: "end",
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
    image: "/dir_3.jpg", 
    path: "M 500,500 L 300.00,153.59 L 309.14,148.47 L 318.40,143.60 L 327.80,138.97 L 337.31,134.58 L 346.93,130.45 L 356.65,126.57 L 366.48,122.94 L 376.39,119.58 L 386.39,116.47 L 396.47,113.63 L 406.62,111.05 L 416.84,108.74 L 427.11,106.70 L 437.43,104.92 L 447.79,103.42 L 458.19,102.19 L 468.62,101.23 L 479.07,100.55 L 489.53,100.14 L 500.00,100.00 Z",
    labelLines: ["Водные ресурсы"],
    textX: 375, textY: 55, textAnchor: "end",
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
    image: "/dir_4.jpg", 
    path: "M 500,500 L 500.00,100.00 L 510.47,100.14 L 520.93,100.55 L 531.38,101.23 L 541.81,102.19 L 552.21,103.42 L 562.57,104.92 L 572.89,106.70 L 583.16,108.74 L 593.38,111.05 L 603.53,113.63 L 613.61,116.47 L 623.61,119.58 L 633.52,122.94 L 643.35,126.57 L 653.07,130.45 L 662.69,134.58 L 672.20,138.97 L 681.60,143.60 L 690.86,148.47 L 700.00,153.59 Z",
    labelLines: ["Зелёные финансы"],
    textX: 625, textY: 55, textAnchor: "start",
  },
  {
    id: "sustainable-industry",
    index: 4,
    title: "Устойчивая промышленность",
    shortTitle: "Устойчивая индустрия",
    tag: "Декарбонизация",
    goal: "-40% выбросов предприятий",
    summary: "Декарбонизация тяжелой индустрии, энергоэффективность и зеленый водород.",
    details: "Внедрение технологий улавливания и утилизации углерода (CCUS), переход металлургических комбинатов на электродуговую плавку, пилотные заводы по производству зеленого водорода и развитие циркулярной экономики.",
    projects: ["Зеленый водород Мангистау (Hyrasia)", "Электроплавка стали в Темиртау", "CleanTech Акселератор"],
    image: "/dir_industry.jpg",
    path: "M 500,500 L 700.00,153.59 L 709.00,158.94 L 717.86,164.53 L 726.56,170.35 L 735.11,176.39 L 743.50,182.66 L 751.73,189.14 L 759.78,195.84 L 767.65,202.74 L 775.34,209.85 L 782.84,217.16 L 790.15,224.66 L 797.26,232.35 L 804.16,240.22 L 810.86,248.27 L 817.34,256.50 L 823.61,264.89 L 829.65,273.44 L 835.47,282.14 L 841.06,291.00 L 846.41,300.00 Z",
    labelLines: ["Устойчивая", "индустрия"],
    textX: 830, textY: 175, textAnchor: "start",
  },
  {
    id: "critical-minerals",
    index: 5,
    title: "Критические минералы",
    shortTitle: "Критические минералы",
    tag: "Батарейные металлы",
    goal: "100% соблюдение стандартов IRMA",
    summary: "Ответственная добыча лития, редкоземельных металлов и меди для энергоперехода.",
    details: "Экологически чистая добыча и глубокая переработка стратегических металлов (литий, никель, кобальт, медь, редкоземельные элементы), необходимых для глобального производства солнечных батарей и тяговых аккумуляторов.",
    projects: ["Литиевый кластер ВКО", "Редкоземельные металлы Аксу", "Медный проект Актогай"],
    image: "/dir_5.jpg", 
    path: "M 500,500 L 846.41,300.00 L 851.53,309.14 L 856.40,318.40 L 861.03,327.80 L 865.42,337.31 L 869.55,346.93 L 873.43,356.65 L 877.06,366.48 L 880.42,376.39 L 883.53,386.39 L 886.37,396.47 L 888.95,406.62 L 891.26,416.84 L 893.30,427.11 L 895.08,437.43 L 896.58,447.79 L 897.81,458.19 L 898.77,468.62 L 899.45,479.07 L 899.86,489.53 L 900.00,500.00 Z",
    labelLines: ["Критические", "минералы"],
    textX: 945, textY: 383, textAnchor: "start",
  },
];

export default function BlueprintRadial() {
  const [activeWedge, setActiveWedge] = useState<WedgeData | null>(null);
  const [hoveredWedge, setHoveredWedge] = useState<WedgeData | null>(null);

  return (
    <div className="w-full relative overflow-hidden py-16 md:py-24">
      
      {/* Главный контейнер для десктопа */}
      <div className="hidden md:flex flex-col relative max-w-[1600px] mx-auto w-full px-8 lg:px-12">
        
        {/* Заголовок (Сверху, по левому краю, в одну строку) */}
        <div className="w-full flex justify-start z-20 mb-8 -mt-4">
          <div className="flex gap-4 items-center whitespace-nowrap">
            <FocusRevealHeading
              tokens={[
                { text: "Ключевые ", isAccent: false },
                { text: "направления", isAccent: true },
              ]}
              className="text-4xl lg:text-5xl xl:text-[4rem] font-black tracking-tight text-white leading-none"
              align="left"
            />
          </div>
        </div>

        {/* Радиальный блок (По центру, крупнее, расширенный viewBox от обрезки) */}
        <div className="w-full lg:w-[90%] xl:w-[85%] mx-auto relative flex justify-center">
          
          <svg
            className="w-full h-auto drop-shadow-[0_15px_50px_rgba(0,255,150,0.15)] max-h-[850px]"
            viewBox="-150 -50 1300 550"
            fill="none"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {WEDGES.map((wedge) => (
                <clipPath id={`clip-${wedge.id}`} key={`clip-${wedge.id}`}>
                  <path d={wedge.path} />
                </clipPath>
              ))}
            </defs>

            {/* Wedge Images */}
            <g className="wedge-images">
              {WEDGES.map((wedge) => {
                const isHovered = hoveredWedge?.id === wedge.id;
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
                      width="1000"
                      height="1000"
                      className={`transition-transform duration-700 origin-[50%_50%] ${
                        isHovered ? "scale-[1.03]" : "scale-100"
                      }`}
                    />
                    {/* Затемнение неактивных */}
                    <path
                      d={wedge.path}
                      fill={isHovered ? "transparent" : "rgba(0, 0, 0, 0.45)"}
                      className="transition-colors duration-300 pointer-events-none"
                    />
                  </g>
                );
              })}
            </g>

            {/* Gaps between wedges (Рисуем разделители) */}
            <g className="wedge-gaps pointer-events-none">
              {WEDGES.map((wedge) => (
                <path
                  key={`gap-${wedge.id}`}
                  d={wedge.path}
                  stroke="rgba(255,255,255,0.15)" /* Более заметные разделители */
                  strokeWidth="8"
                  strokeLinejoin="round"
                  fill="none"
                />
              ))}
            </g>

            {/* SVG Текстовые Лейблы */}
            <g className="wedge-labels pointer-events-none">
              {WEDGES.map((wedge) => {
                const isHovered = hoveredWedge?.id === wedge.id;
                return (
                  <text
                    key={`text-${wedge.id}`}
                    x={wedge.textX}
                    y={wedge.textY}
                    textAnchor={wedge.textAnchor}
                    className={`transition-all duration-300 ${
                      isHovered ? "fill-[#02B779] font-black scale-[1.03] drop-shadow-[0_0_15px_rgba(2,183,121,0.5)]" : "fill-white font-bold scale-100 opacity-100 drop-shadow-lg"
                    } origin-[${wedge.textX}px_${wedge.textY}px]`}
                    style={{ fontSize: "22px", letterSpacing: "-0.5px" }}
                  >
                    {wedge.labelLines.map((line, idx) => (
                      <tspan x={wedge.textX} dy={idx === 0 ? 0 : 28} key={idx}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                );
              })}
            </g>
          </svg>

        </div>
      </div>

      {/* Мобильная версия (Вертикальный список) */}
      <div className="w-full px-4 md:hidden relative z-20">
        <div className="mb-8">
          <FocusRevealHeading
            tokens={[
              { text: "Ключевые", isAccent: false },
              { text: "направления", isAccent: true },
            ]}
            className="text-3xl font-bold tracking-tight text-white leading-[1.1]"
            align="left"
          />
        </div>
        <div className="grid grid-cols-1 gap-2.5">
          {WEDGES.map((wedge) => (
            <button
              key={`mob-${wedge.id}`}
              onClick={() => setActiveWedge(wedge)}
              className="flex items-center justify-between p-4 rounded-2xl glass-panel text-left transition-all hover:border-[#02B779]"
            >
              <span className="text-sm font-bold text-[#EDF7EE] leading-tight">{wedge.title}</span>
              <ChevronRight size={16} className="text-[#02B779] shrink-0" />
            </button>
          ))}
        </div>
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

