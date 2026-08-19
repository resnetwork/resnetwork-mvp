"use client";

import { useState, useEffect } from "react";
import {
  Sun,
  X,
  CloudSun,
  Droplet,
  Leaf,
  Factory,
  Gem,
  Sparkles,
  TrendingUp,
  Globe2,
  CheckCircle2,
} from "lucide-react";

interface DirectionData {
  id: number;
  title: string;
  shortTitle: string;
  Icon: any;
  summary: string;
  targets: string[];
  projects: string[];
  partners: string;
}

const DIRECTIONS: DirectionData[] = [
  {
    id: 0,
    title: "Возобновляемая энергетика",
    shortTitle: "ВИЭ",
    Icon: Sun,
    summary:
      "Масштабное развитие солнечной, ветровой и малой гидрогенерации в странах Центральной Азии для достижения углеродной нейтральности и диверсификации энергобаланса.",
    targets: [
      "Доля ВИЭ в энергобалансе региона: 15–25% к 2030 г.",
      "Ввод 12+ ГВт новых солнечных и ветровых мощностей",
      "Строительство региональных систем накопления энергии (BESS)",
    ],
    projects: [
      "Солнечные парки в Навои и Самарканде (Узбекистан)",
      "Ветровые электростанции в Жанатасе и Ерейментау (Казахстан)",
      "Модернизация каскадов малых ГЭС (Кыргызстан, Таджикистан)",
    ],
    partners: "EBRD, ADB, ACWA Power, Masdar, Samruk-Energy",
  },
  {
    id: 1,
    title: "Климат и политика",
    shortTitle: "Климат",
    Icon: CloudSun,
    summary:
      "Гармонизация климатического законодательства, внедрение систем торговли выбросами (ETS), подготовка национальных планов адаптации (NAP) и диалог G2B.",
    targets: [
      "Сокращение выбросов CO2 на 15–35% по Парижскому соглашению",
      "Внедрение обязательной ESG/GRI отчётности для листинговых компаний",
      "Создание трансграничной системы углеродного регулирования",
    ],
    projects: [
      "Региональный климатический хаб в Астане",
      "Программы адаптации к засухам и волнам тепла",
      "Реформа углеродных квот и зелёного тарифообразования",
    ],
    partners: "UNEP, UNDP, МЭПР РК, Климатический совет ЦА",
  },
  {
    id: 2,
    title: "Водные ресурсы",
    shortTitle: "Вода",
    Icon: Droplet,
    summary:
      "Трансграничное управление бассейнами рек Сырдарья и Амударья, спутниковый мониторинг ледников и внедрение водосберегающего орошения в сельском хозяйстве.",
    targets: [
      "Снижение потерь воды в ирригации на 30–40%",
      "Оцифровка 100% магистральных каналов региона",
      "Сохранение бассейна Аральского и Каспийского морей",
    ],
    projects: [
      "Капельное орошение и лазерная планировка полей (Юг Казахстана, Узбекистан)",
      "Станции мониторинга таяния ледников на Тянь-Шане и Памире",
      "Реконструкция Сардобинского и Токтогульского гидроузлов",
    ],
    partners: "Всемирный Банк, МФСА, USAID Water, Швейцарское агентство SDC",
  },
  {
    id: 3,
    title: "Зелёное финансирование",
    shortTitle: "ESG Капитал",
    Icon: Leaf,
    summary:
      "Привлечение частных и институциональных зелёных инвестиций через выпуск ESG-облигаций, климатические фонды и механизмы синдикации сделок.",
    targets: [
      "Объём зелёных облигаций и кредитов: свыше $10 млрд к 2030 г.",
      "Создание первого Регионального Зелёного Банка ЦА",
      "Льготное финансирование зелёных стартапов и МСП",
    ],
    projects: [
      "Зелёная таксономия МФЦА (AIFC Green Finance Centre)",
      "Выпуск первых суверенных и корпоративных сукук/ESG-бондов",
      "Грантовые программы для климатических технологий",
    ],
    partners: "AIFC, IFC, EIB, KASE, AIX, Исламский банк развития",
  },
  {
    id: 4,
    title: "Устойчивая промышленность",
    shortTitle: "Индустрия",
    Icon: Factory,
    summary:
      "Глубокая модернизация горно-металлургических и химических предприятий, улавливание попутного газа и метана, переход на замкнутый водооборот.",
    targets: [
      "Снижение выбросов метана в нефтегазовом секторе на 30% (Global Methane Pledge)",
      "Рекультивация 50+ хвостохранилищ и промышленных зон",
      "Внедрение наилучших доступных технологий (НДТ)",
    ],
    projects: [
      "Программа рекультивации промзон Кентау и Жамбылской области",
      "Улавливание метана на месторождениях Туркменистана и Казахстана",
      "Зелёная металлургия и производство низкоуглеродной стали",
    ],
    partners: "ERG, КазМунайГаз, Узбекнефтегаз, KAZ Minerals",
  },
  {
    id: 5,
    title: "Критические минералы",
    shortTitle: "Минералы",
    Icon: Gem,
    summary:
      "Экологически безопасная геологоразведка, добыча и переработка лития, кобальта, никеля, меди и редкоземельных элементов для глобального энергоперехода.",
    targets: [
      "Локализация цепочек добавленной стоимости и глубокой переработки",
      "100% соответствие добычи мировым стандартам IRMA и ESG",
      "Интеграция в цепочки поставок аккумуляторов и чипов",
    ],
    projects: [
      "Разведка месторождений лития и тантала в Восточном Казахстане",
      "Модернизация медных и цинковых комплексов в Алмалыке (Узбекистан)",
      "Строительство лабораторий редкоземельных металлов в Алматы",
    ],
    partners: "Тау-Кен Самрук, ЕС–Казахстан Raw Materials Partnership, USGS",
  },
];

// Радиус раскрытия веера внутрь экрана
const RADIAL_RADIUS = 135;

export default function FloatingRadialDirections() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedDirection, setSelectedDirection] = useState<DirectionData | null>(null);

  // Закрытие по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSelectedDirection(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Плавающий виджет строго в правом нижнем углу с запасом от краев экрана */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 select-none">
        <div className="relative flex items-center justify-center">
          
          {/* Полупрозрачный оверлей при раскрытии веера */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-10 animate-in fade-in duration-200"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* 6 радиальных элементов, строго раскрывающихся ВВЕРХ и ВЛЕВО внутрь экрана */}
          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            {DIRECTIONS.map((dir, i) => {
              // Угол theta: от 0 (строго вверх) до PI/2 (строго влево)
              const theta = (i / (DIRECTIONS.length - 1)) * (Math.PI / 2);
              
              // Координаты смещения строго отрицательные (влево -X, вверх -Y)
              const tx = -Math.round(Math.sin(theta) * RADIAL_RADIUS);
              const ty = -Math.round(Math.cos(theta) * RADIAL_RADIUS);

              const Icon = dir.Icon;
              const isHovered = hoveredIndex === i;

              return (
                <div
                  key={dir.id}
                  className="absolute pointer-events-auto transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isOpen
                      ? `translate(${tx}px, ${ty}px) scale(1)`
                      : `translate(0px, 0px) scale(0)`,
                    opacity: isOpen ? 1 : 0,
                    transitionDelay: isOpen ? `${i * 35}ms` : `${(5 - i) * 15}ms`,
                  }}
                >
                  <div className="relative group">
                    <button
                      onClick={() => {
                        setSelectedDirection(dir);
                        setIsOpen(false);
                      }}
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      aria-label={dir.title}
                      className={`w-12 h-12 md:w-13 md:h-13 rounded-full flex items-center justify-center border transition-all duration-300 cursor-pointer shadow-2xl ${
                        isHovered
                          ? "bg-emerald-400 text-black border-emerald-200 scale-120 shadow-[0_0_30px_rgba(74,222,128,0.9)]"
                          : "bg-[#063325]/95 text-emerald-300 border-emerald-400/50 hover:border-emerald-300 hover:bg-emerald-500 hover:text-black backdrop-blur-2xl"
                      }`}
                    >
                      <Icon size={21} strokeWidth={2} />
                    </button>

                    {/* Всплывающая подсказка с названием слева от кнопки */}
                    <div
                      className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap px-3.5 py-1.5 rounded-xl bg-black/90 border border-emerald-400/50 text-xs font-bold text-emerald-200 backdrop-blur-xl pointer-events-none transition-all duration-200 shadow-2xl z-40 ${
                        isHovered
                          ? "opacity-100 scale-100 translate-x-0"
                          : "opacity-0 scale-90 translate-x-2"
                      }`}
                    >
                      <span>{dir.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Главная кнопка-триггер (Солнце) */}
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Раскрыть сферы фокуса"
            className={`relative z-30 w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 shadow-2xl border-2 ${
              isOpen
                ? "bg-gradient-to-tr from-emerald-500 to-green-300 text-black border-emerald-200 shadow-[0_0_40px_rgba(74,222,128,0.85)] scale-105 rotate-45"
                : "bg-gradient-to-tr from-emerald-700 via-emerald-600 to-emerald-500 text-white border-emerald-400/60 hover:border-emerald-300 hover:scale-110 shadow-[0_0_30px_rgba(34,197,94,0.6)]"
            }`}
          >
            {isOpen ? (
              <X size={26} strokeWidth={2.5} />
            ) : (
              <Sun size={28} strokeWidth={2} className="animate-spin" style={{ animationDuration: "14s" }} />
            )}
          </button>
        </div>
      </div>

      {/* Полноценный детальный Pop-up выбранного направления */}
      {selectedDirection && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedDirection(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl p-7 md:p-10 border border-emerald-500/40 bg-gradient-to-b from-[#064e3b]/95 to-[#041a13]/98 shadow-[0_25px_80px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Кнопка закрытия */}
            <button
              onClick={() => setSelectedDirection(null)}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Заголовок */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-13 h-13 rounded-2xl flex items-center justify-center bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 shadow-[0_0_20px_rgba(74,222,128,0.3)]">
                {(() => {
                  const Icon = selectedDirection.Icon;
                  return <Icon size={26} />;
                })()}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block">
                  Сфера фокуса ЦА
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-[#f2ede2] tracking-tight">
                  {selectedDirection.title}
                </h3>
              </div>
            </div>

            {/* Описание */}
            <p className="text-sm md:text-base leading-relaxed text-[#9fb7a8] mb-6">
              {selectedDirection.summary}
            </p>

            {/* Цели к 2030 году */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <TrendingUp size={14} />
                <span>Ключевые цели к 2030 году:</span>
              </h4>
              <div className="grid gap-2">
                {selectedDirection.targets.map((target) => (
                  <div
                    key={target}
                    className="flex items-start gap-2.5 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs md:text-sm text-[#f2ede2]"
                  >
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{target}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Реализуемые проекты */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Инициативы и проекты в регионе:</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDirection.projects.map((proj) => (
                  <span
                    key={proj}
                    className="text-xs px-3 py-1.5 rounded-xl bg-emerald-900/40 border border-emerald-500/25 text-emerald-200 font-medium"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>

            {/* Партнёры */}
            <div className="mb-8 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 text-xs text-[#9fb7a8]">
              <span className="font-bold text-emerald-300 block mb-1">Международные партнёры & институты:</span>
              <span>{selectedDirection.partners}</span>
            </div>

            {/* Кнопка закрытия */}
            <button
              onClick={() => setSelectedDirection(null)}
              className="w-full py-4 rounded-full text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/80 cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </>
  );
}
