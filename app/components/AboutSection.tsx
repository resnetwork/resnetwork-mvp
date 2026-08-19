"use client";

import { useState } from "react";
import {
  Landmark,
  Globe2,
  Building2,
  Briefcase,
  Handshake,
  Link2,
  ArrowUpRight,
  HeartHandshake,
} from "lucide-react";

export default function AboutSection({ onOpenContact }: { onOpenContact?: () => void }) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section id="about" className="relative w-full overflow-hidden bg-[#081712] py-16 md:py-28 select-none">
      {/* Мягкие атмосферные световые пятна (Aurora glow) без резких границ */}
      <div
        className="absolute w-[800px] md:w-[1300px] h-[500px] md:h-[750px] rounded-full blur-[260px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(ellipse at center, #16a34a 0%, #064e3b 45%, transparent 75%)",
          top: "15%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full blur-[220px] pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* Органическая Бенто-композиция с цифрами, встроенными в дизайн */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          
          {/* Главная большая карточка: Масштаб связей (10 000+) */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-7 relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#063325]/85 via-[#042017]/90 to-[#02130e]/95 p-8 md:p-12 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Link2 size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/20">
                  Единая сеть
                </span>
              </div>

              <div className="text-5xl md:text-7xl font-extrabold text-[#f2ede2] tracking-tight flex items-baseline gap-2">
                <span>10 000+</span>
              </div>
              <p className="text-lg md:text-xl font-medium text-emerald-300/90 mt-2">
                Партнёрских связей создано в регионе
              </p>
              <p className="text-sm text-[#9fb7a8] mt-3 max-w-lg leading-relaxed">
                Соединяем ключевых стейкхолдеров 5 стран в единый открытый диалог для запуска трансграничных климатических инициатив.
              </p>
            </div>

            {/* Парящие плашки-спутники */}
            <div className="mt-10 pt-6 border-t border-emerald-500/15 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-[#f2ede2]">
                <Landmark size={15} className="text-emerald-400" />
                <span><strong className="text-emerald-300">32</strong> Правительства</span>
              </div>
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 text-xs font-semibold text-[#f2ede2]">
                <Globe2 size={15} className="text-emerald-400" />
                <span><strong className="text-emerald-300">50+</strong> Межд. организаций</span>
              </div>
            </div>
          </div>

          {/* Вторая карточка: Бизнес & Инвестиции (300+ Компаний / 100+ Инвесторов) */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-5 relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#062c20]/85 via-[#041a13]/90 to-[#02130e]/95 p-8 md:p-10 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] group flex flex-col justify-between"
          >
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Briefcase size={22} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/20">
                  Инвестиции
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold text-[#f2ede2] tracking-tight">
                    300+
                  </div>
                  <div className="text-xs text-[#9fb7a8] mt-1 font-medium flex items-center gap-1.5">
                    <Building2 size={13} className="text-emerald-400" />
                    <span>Компаний</span>
                  </div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-extrabold text-[#f2ede2] tracking-tight">
                    100+
                  </div>
                  <div className="text-xs text-[#9fb7a8] mt-1 font-medium flex items-center gap-1.5">
                    <Briefcase size={13} className="text-emerald-400" />
                    <span>Инвесторов</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-[#9fb7a8] mt-4 leading-relaxed">
                Катализируем приток частного капитала и зелёного финансирования в проекты чистой энергии и водосбережения.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/15">
              <span className="text-xs text-emerald-300/80 font-medium">
                🌱 Синдикация сделок · Зелёные облигации · ESG-экспертиза
              </span>
            </div>
          </div>

          {/* Третья карточка: Сообщество и доверие (30+ Ассоциаций) */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-5 relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-[#062c20]/85 via-[#041a13]/90 to-[#02130e]/95 p-8 md:p-10 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/50 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] group flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
                  <Handshake size={24} />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/70 px-3 py-1 rounded-full border border-emerald-500/20">
                  Доверие
                </span>
              </div>

              <div className="text-4xl md:text-5xl font-extrabold text-[#f2ede2] tracking-tight">
                30+
              </div>
              <p className="text-base font-semibold text-emerald-300 mt-1">
                Отраслевых ассоциаций и институтов
              </p>
              <p className="text-sm text-[#9fb7a8] mt-3 leading-relaxed">
                Гармонизируем стандарты, проводим независимую аналитику и развиваем профессиональное ESG-сообщество региона.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/15">
              <span className="text-xs text-emerald-300/80 font-medium">
                🤝 G2B диалог · Обмен опытом · Прозрачность
              </span>
            </div>
          </div>

          {/* Четвертая карточка: Душевный манифест & CTA (Вместе создаём будущее) */}
          <div
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            className="md:col-span-7 relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#064230]/90 via-[#05281e]/90 to-[#02130e]/98 p-8 md:p-12 backdrop-blur-2xl transition-all duration-500 hover:border-emerald-400/60 hover:shadow-[0_20px_70px_rgba(0,0,0,0.7)] group flex flex-col justify-between"
          >
            <div className="absolute top-1/2 right-4 -translate-y-1/2 w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />

            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                <HeartHandshake size={16} />
                <span>Будущее строится вместе</span>
              </div>

              <h3 className="text-2xl md:text-4xl font-bold text-[#f2ede2] tracking-tight leading-snug">
                «Мы верим, что великие преобразования происходят там, где сходятся общая цель и открытые сердца.»
              </h3>
            </div>

            <div className="mt-8 pt-6 border-t border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <span className="text-xs text-[#9fb7a8]">
                Станьте частью сети уже сегодня
              </span>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2.5 px-7 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/80 group/btn cursor-pointer"
              >
                <span>Присоединиться</span>
                <ArrowUpRight
                  size={17}
                  className="transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform"
                />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
