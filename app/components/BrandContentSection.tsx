"use client";

import { ArrowUpRight, Building2, Globe2, Handshake, Landmark, Lightbulb, UsersRound, Sparkles } from "lucide-react";

const ECOSYSTEM = [
  { icon: Landmark, title: "Государства", text: "Министерства, ведомства и региональные органы власти" },
  { icon: Globe2, title: "Международные институты", text: "Банки развития, фонды, климатические агентства и посольства" },
  { icon: Building2, title: "Частный сектор", text: "Энергетика, ESG-индустрия, технологии, EPC и инвесторы" },
  { icon: Handshake, title: "Деловое сообщество", text: "Торговые палаты, отраслевые ассоциации и советы" },
  { icon: UsersRound, title: "Экспертное сообщество", text: "Аналитические центры, НКО, СМИ и ESG-аудиторы" },
  { icon: Lightbulb, title: "Наука и инновации", text: "Университеты, R&D лаборатории и зелёные стартапы" },
];

const CARD_HIGHLIGHTS = [
  {
    title: "Стратегические связи",
    text: "Выстраиваем долгосрочные партнерства по всей региональной экосистеме ЦА.",
    bg: "rgba(6, 78, 59, 0.45)",
    border: "rgba(34, 197, 94, 0.3)",
  },
  {
    title: "Новые партнёрства",
    text: "Создаём консорциумы, ведущие к реальным инвестиционным инициативам.",
    bg: "rgba(22, 163, 74, 0.25)",
    border: "rgba(74, 222, 128, 0.35)",
  },
  {
    title: "Совместные проекты",
    text: "Делимся экспертизой, передовыми технологиями и лучшими ESG-практиками.",
    bg: "rgba(6, 78, 59, 0.35)",
    border: "rgba(34, 197, 94, 0.25)",
  },
  {
    title: "Региональное развитие",
    text: "Привлекаем устойчивые инвестиции в климатический переход Центральной Азии.",
    bg: "rgba(34, 197, 94, 0.2)",
    border: "rgba(74, 222, 128, 0.4)",
  },
];

export default function BrandContentSection() {
  return (
    <section className="relative px-6 py-24 md:px-16 overflow-hidden" style={{ backgroundColor: "#081712" }}>
      {/* Декоративное мягкое изумрудное сияние */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[200px] pointer-events-none opacity-20"
        style={{
          background: "radial-gradient(circle, #16a34a 0%, transparent 70%)",
          top: "20%",
          right: "-10%",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md mb-5">
          <Sparkles size={13} className="text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            RES NETWORK
          </span>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] items-start">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-[#f2ede2]">
              Единая экосистема для устойчивого развития Центральной Азии
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#9fb7a8]">
              Центральная Азия становится ключевым регионом новых возможностей: энергетический переход, критические минералы, зелёные инвестиции и климатическая устойчивость требуют тесной координации между бизнесом, государствами и международными партнёрами.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {CARD_HIGHLIGHTS.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl p-6 border backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: item.bg,
                    borderColor: item.border,
                  }}
                >
                  <p className="font-bold text-[#f2ede2] text-lg">{item.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#9fb7a8]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 pt-2">
            {ECOSYSTEM.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5 backdrop-blur-md transition-all duration-300 hover:border-emerald-500/40 hover:bg-emerald-950/35"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Icon size={20} />
                </div>
                <h3 className="text-sm font-bold text-[#f2ede2]">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#9fb7a8]">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#events"
          className="mt-12 inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition-colors group"
        >
          <span>Смотреть мероприятия</span>
          <ArrowUpRight size={18} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>
    </section>
  );
}
