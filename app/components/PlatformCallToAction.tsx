"use client";

import { useState } from "react";
import { 
  ArrowUpRight, 
  Users2, 
  Calendar, 
  QrCode, 
  Building, 
  CheckCircle2, 
  ExternalLink,
  Sparkles,
  TrendingUp,
  BarChart3
} from "lucide-react";

interface PlatformModule {
  id: string;
  tab: string;
  title: string;
  badge: string;
  description: string;
  stats: string;
  icon: any;
  preview: {
    headline: string;
    subline: string;
    accentValue: string;
    meta: { label: string; value: string }[];
  };
}

const MODULES: PlatformModule[] = [
  {
    id: "events",
    tab: "Ивенты & Билеты",
    title: "Создание и регистрация на мероприятия",
    badge: "Билетная система",
    description: "Публикуйте собственные конференции, вебинары и круглые столы или регистрируйтесь на ключевые отраслевые события в один клик с получением цифрового билета.",
    stats: "Мгновенная регистрация и QR-билеты",
    icon: Calendar,
    preview: {
      headline: "Электронный билет подтверждён",
      subline: "Заказ #EV-8924 · Астана, Конгресс-Центр",
      accentValue: "Билет активен",
      meta: [
        { label: "Событие", value: "Центральноазиатский Энергетический Форум" },
        { label: "Формат", value: "Офлайн + Онлайн трансляция" },
        { label: "Категория", value: "Делегатский доступ (Все сессии)" },
        { label: "Электронный пропуск", value: "QR-код доступен в кабинете" },
      ],
    },
  },
  {
    id: "community",
    tab: "Комьюнити",
    title: "Каталог компаний и прямые связи",
    badge: "База участников",
    description: "Единый открытый реестр зарегистрированных компаний: изучайте профили участников рынка, сферу деятельности, портфолио и находите надежных партнеров и подрядчиков.",
    stats: "Верифицированные профили компаний",
    icon: Building,
    preview: {
      headline: "Профиль компании в комьюнити",
      subline: "Верифицированный участник RES Platform",
      accentValue: "Активный резидент",
      meta: [
        { label: "Компания", value: "Qazaq Green Power Consortium" },
        { label: "Специализация", value: "Девелопмент СЭС/ВЭС, EPC-контракты" },
        { label: "Регион присутствия", value: "Казахстан, Узбекистан, Кыргызстан" },
        { label: "Связь с компанией", value: "Прямой чат и запрос контактов" },
      ],
    },
  },
  {
    id: "matchmaking",
    tab: "B2B Нетворкинг",
    title: "Прямой доступ к первым лицам индустрии",
    badge: "1-on-1 Встречи",
    description: "Назначайте персональные переговоры с руководителями компаний, инвесторами и регуляторами до начала форумов и формируйте свое расписание встреч.",
    stats: "Персональное расписание переговоров",
    icon: Users2,
    preview: {
      headline: "Встреча 1-на-1 подтверждена",
      subline: "Переговорная зона B · Стенд RES Network",
      accentValue: "21 Мая, 14:30",
      meta: [
        { label: "Участник 1", value: "Марат Сейтов (CEO, KazCleanEnergy)" },
        { label: "Участник 2", value: "Elena Rossi (Director, Enel Green)" },
        { label: "Тема", value: "Поставка оборудования и накопителей BESS" },
        { label: "Статус", value: "Подтверждено в календаре" },
      ],
    },
  },
  {
    id: "analytics",
    tab: "Статистика событий",
    title: "Сквозная аналитика регистраций и посещаемости",
    badge: "Live Dashboard",
    description: "Организаторы и резиденты платформы отслеживают метрики в реальном времени: динамику регистраций, активность аудитории, фактическую явку (check-in) и B2B встречи.",
    stats: "Live-обновление статистики 24/7",
    icon: BarChart3,
    preview: {
      headline: "Сводка посещаемости форума",
      subline: "RES Summit 2026 · Данные в реальном времени",
      accentValue: "Явка: 84.6%",
      meta: [
        { label: "Зарегистрировано участников", value: "1 280 делегатов" },
        { label: "Фактически прибыло (Check-in)", value: "1 083 человека (84.6%)" },
        { label: "Представлено компаний", value: "340+ организаций из 12 стран" },
        { label: "Проведено B2B встреч", value: "420 подтвержденных переговоров" },
      ],
    },
  },
];

export default function PlatformCallToAction() {
  const [activeTab, setActiveTab] = useState<string>("events");

  const currentModule = MODULES.find((m) => m.id === activeTab) || MODULES[0];

  return (
    <section id="platform" className="relative px-4 md:px-12 py-16 md:py-28 bg-[#0C0C0C] overflow-hidden text-white border-t border-b border-[#AFE552]/20">
      
      {/* Мягкие атмосферные фоновые ореолы */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#AFE552]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#02B779]/8 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Хедер секции */}
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12 md:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#AFE552] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-[#AFE552] uppercase">
                Закрытая цифровая экосистема
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
              RES <span className="text-[#AFE552]">PLATFORM</span>
            </h2>
            <p className="text-res-text-muted text-base md:text-lg mt-4 leading-relaxed">
              Единый цифровой рабочий кабинет для девелоперов, инвесторов, министерств и поставщиков технологий. Все контакты, компании и ивенты — в одном месте.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/res365"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-gradient-to-r from-[#AFE552] to-[#ECFFD3] text-[#0C0C0C] shadow-[0_0_30px_rgba(175,229,82,0.4)] hover:shadow-[0_0_45px_rgba(175,229,82,0.6)] hover:scale-105 transition-all duration-300"
            >
              Войти на платформу <ArrowUpRight size={17} />
            </a>
            <a
              href="/res365"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full font-bold text-sm text-white border border-white/20 hover:border-[#AFE552] hover:bg-white/5 transition-all"
            >
              Заявка на регистрацию
            </a>
          </div>
        </div>

        {/* Навигационные табы модулей */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl mb-8 overflow-x-auto custom-scrollbar">
          {MODULES.map((mod) => {
            const isActive = activeTab === mod.id;
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveTab(mod.id)}
                className={`flex items-center gap-2.5 px-5 py-3 rounded-xl font-bold text-xs md:text-sm tracking-wide transition-all duration-300 cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#AFE552] text-[#0C0C0C] shadow-[0_0_20px_rgba(175,229,82,0.45)]"
                    : "text-res-text-muted hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={16} />
                <span>{mod.tab}</span>
              </button>
            );
          })}
        </div>

        {/* Главная рабочая карточка-витрина с живым превью */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Левая колонка: Описание функционала */}
          <div className="lg:col-span-5 p-6 md:p-8 rounded-3xl glass-panel border border-[#AFE552]/30 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#AFE552]/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider text-[#AFE552] bg-[#AFE552]/15 border border-[#AFE552]/30 mb-4">
                <Sparkles size={12} />
                {currentModule.badge}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
                {currentModule.title}
              </h3>

              <p className="text-res-text-muted text-sm md:text-base leading-relaxed mb-6">
                {currentModule.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 mt-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#AFE552]">
                <TrendingUp size={16} />
                <span>{currentModule.stats}</span>
              </div>
            </div>
          </div>

          {/* Правая колонка: Реалистичный интерфейсный виджет платформы */}
          <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl bg-[#030914] border border-white/15 shadow-2xl relative overflow-hidden flex flex-col justify-between">
            {/* Хедер виджета (как в приложении) */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white tracking-wider uppercase">
                  RES365 · {currentModule.badge}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#AFE552] bg-[#AFE552]/10 px-3 py-1 rounded-full border border-[#AFE552]/30">
                {currentModule.preview.accentValue}
              </span>
            </div>

            {/* Тело виджета */}
            <div className="flex-1 py-2">
              <div className="mb-6">
                <h4 className="text-xl md:text-2xl font-black text-white tracking-tight mb-1">
                  {currentModule.preview.headline}
                </h4>
                <p className="text-xs md:text-sm text-res-text-muted">
                  {currentModule.preview.subline}
                </p>
              </div>

              {/* Таблица параметров / данных карточки */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {currentModule.preview.meta.map((item, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-res-text-muted block mb-1">
                      {item.label}
                    </span>
                    <span className="text-xs md:text-sm font-semibold text-white block">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Футер виджета с активными кнопками действия */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-res-text-muted">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Защищено двухфакторной аутентификацией</span>
              </div>

              <a
                href="/res365"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#AFE552] hover:text-white transition-colors"
              >
                Открыть в рабочем кабинете <ExternalLink size={14} />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
