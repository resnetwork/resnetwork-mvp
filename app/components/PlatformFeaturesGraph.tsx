"use client";

import { useRef, useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const FEATURES = [
  {
    id: "networking",
    title: "НЕТВОРКИНГ И ВСТРЕЧИ",
    description: "Назначайте B2B встречи до начала мероприятий. Умный матчмейкинг.",
    position: "top-left",
  },
  {
    id: "catalog",
    title: "КАТАЛОГ КОМПАНИЙ",
    description: "Проверенные резиденты платформы, быстрый поиск партнеров и CRM.",
    position: "top-right",
  },
  {
    id: "events",
    title: "БИЛЕТЫ И АФИША",
    description: "Удобная регистрация на события, QR-бейджи и персональное расписание.",
    position: "bottom-left",
  },
  {
    id: "investments",
    title: "ПОИСК ИНВЕСТОРОВ",
    description: "Питчинг проектов, прямая связь с фондами и венчурными ангелами ЦА.",
    position: "bottom-right",
  },
];

export default function PlatformFeaturesGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number }[]>([]);

  useEffect(() => {
    const updateLines = () => {
      if (!containerRef.current || !centerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerRect = centerRef.current.getBoundingClientRect();

      const centerX = centerRect.left - containerRect.left + centerRect.width / 2;
      const centerY = centerRect.top - containerRect.top + centerRect.height / 2;

      const newLines = FEATURES.map((feature) => {
        const el = document.getElementById(`feature-${feature.id}`);
        if (!el) return { x1: centerX, y1: centerY, x2: centerX, y2: centerY };
        
        const rect = el.getBoundingClientRect();
        
        // Find closest point on the feature block to connect to
        let targetX = rect.left - containerRect.left;
        let targetY = rect.top - containerRect.top + rect.height / 2;

        if (feature.position.includes("right")) {
          targetX = rect.left - containerRect.left;
        } else {
          targetX = rect.right - containerRect.left;
        }

        return {
          x1: centerX,
          y1: centerY,
          x2: targetX,
          y2: targetY,
        };
      });

      setLines(newLines);
    };

    updateLines();
    // Use setTimeout to ensure DOM is fully rendered before calculating lines
    setTimeout(updateLines, 100);
    window.addEventListener("resize", updateLines);
    return () => window.removeEventListener("resize", updateLines);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#030e09] text-res-text py-24 overflow-hidden flex flex-col items-center justify-center border-t border-res-accent/10">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-res-accent/5 via-[#030e09] to-[#030e09] pointer-events-none"></div>

      <div className="text-center mb-16 md:mb-24 z-10">
        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">
          Усилено платформой <br className="hidden md:block" />
          <span className="text-res-accent-light">RES PLATFORM</span>
        </h2>
        <p className="text-res-text-muted max-w-2xl mx-auto px-4">
          Специально разработанная экосистема объединяет всё необходимое для успешной работы на рынке зеленой энергетики Центральной Азии.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto px-4 h-[600px] flex items-center justify-center">
        
        {/* SVG Линии */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          {lines.map((line, i) => (
            <path
              key={i}
              d={`M ${line.x1} ${line.y1} L ${line.x2} ${line.y2}`}
              stroke="var(--color-res-accent)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className="opacity-40"
            />
          ))}
          {/* Световые лучи (декор) */}
          {lines.map((line, i) => (
             <circle key={`dot-${i}`} cx={line.x2} cy={line.y2} r="4" fill="var(--color-res-accent-light)" className="animate-pulse shadow-[0_0_10px_var(--color-res-accent-light)]" />
          ))}
        </svg>

        {/* Центральный Узел */}
        <div 
          ref={centerRef}
          className="relative z-10 w-32 h-32 md:w-48 md:h-48 rounded-full border border-res-accent-light/50 bg-[#061e14] shadow-[0_0_50px_rgba(2,183,121,0.2)] flex items-center justify-center hover:scale-105 transition-transform duration-500 cursor-pointer group"
        >
          <div className="absolute inset-2 rounded-full border border-res-accent/20 border-dashed animate-[spin_20s_linear_infinite]" />
          <div className="text-center">
            <span className="block text-res-accent-light font-black text-sm md:text-lg uppercase tracking-widest group-hover:text-white transition-colors">
              RES<br/>PLATFORM
            </span>
          </div>
        </div>

        {/* Узлы функционала */}
        {FEATURES.map((feature) => (
          <div 
            key={feature.id} 
            id={`feature-${feature.id}`}
            className={`absolute z-10 w-[240px] md:w-[280px] p-6 hover:bg-[#061e14] hover:shadow-2xl border border-transparent hover:border-res-accent/20 rounded-2xl transition-all duration-300 ${
              feature.position === "top-left" ? "top-[10%] left-0 md:left-[10%] text-left md:text-right" :
              feature.position === "top-right" ? "top-[10%] right-0 md:right-[10%] text-left" :
              feature.position === "bottom-left" ? "bottom-[10%] left-0 md:left-[10%] text-left md:text-right" :
              "bottom-[10%] right-0 md:right-[10%] text-left"
            }`}
          >
            <h3 className="text-res-text font-bold text-sm md:text-base uppercase tracking-widest mb-2 flex flex-col">
              {feature.title}
              <div className={`h-0.5 bg-res-accent w-12 mt-2 ${feature.position.includes("left") ? "md:ml-auto" : ""}`} />
            </h3>
            <p className="text-res-text-muted text-xs md:text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 z-10">
        <a href="/res365" className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm bg-res-accent text-[#061e14] hover:bg-res-accent-light hover:shadow-[0_0_30px_rgba(175,229,82,0.5)] transition-all duration-300">
          Платформа для резидентов <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
