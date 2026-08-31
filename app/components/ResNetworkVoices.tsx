"use client";

import { ArrowUpRight, Quote } from "lucide-react";
import { useState } from "react";

const EXPERTS = [
  {
    id: 1,
    name: "Айнур Жаканова",
    role: "Эксперт по зеленому финансированию",
    company: "AIFC Green Centre",
    quote: "Углеродная нейтральность требует не только технологий, но и масштабной трансформации рынков капитала в Центральной Азии.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Давид Смаилов",
    role: "Директор по устойчивому развитию",
    company: "EcoTech Ventures",
    quote: "Мы находимся в уникальной позиции: наш регион может перепрыгнуть устаревшие парадигмы и сразу строить чистую экономику.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Елена Кан",
    role: "Старший аналитик",
    company: "Energy Transition Institute",
    quote: "Водные ресурсы и энергетика неразделимы. Интегрированный подход — единственный способ избежать кризиса в будущем.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

export default function ResNetworkVoices() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <div className="w-full">
      <div className="mb-12 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-res-text mb-4">
          Голоса <span className="text-res-accent-light">отрасли</span>
        </h2>
        <p className="text-res-text-muted text-lg max-w-2xl">
          Ведущие эксперты, визионеры и практики, формирующие повестку устойчивого развития Центральной Азии.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {EXPERTS.map((expert) => (
          <div
            key={expert.id}
            onMouseEnter={() => setHoveredId(expert.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative rounded-3xl bg-res-panel border border-res-accent/20 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(2,183,121,0.15)] hover:border-res-accent/50 flex flex-col h-full"
          >
            {/* Изображение эксперта */}
            <div className="relative h-64 md:h-72 w-full overflow-hidden">
              <img
                src={expert.image}
                alt={expert.name}
                className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-res-panel via-res-panel/50 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-res-accent-light transition-colors">
                  {expert.name}
                </h3>
                <p className="text-sm font-medium text-res-accent">
                  {expert.role}
                </p>
                <p className="text-xs text-res-text-muted">
                  {expert.company}
                </p>
              </div>
            </div>

            {/* Цитата */}
            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between relative bg-res-panel">
              <Quote className="absolute top-4 right-4 w-12 h-12 text-res-accent/10 group-hover:text-res-accent/20 transition-colors" />
              <p className="text-res-text-muted leading-relaxed relative z-10 italic">
                "{expert.quote}"
              </p>
              
              <div className="mt-8 pt-4 border-t border-res-accent/10 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-res-text group-hover:text-res-accent transition-colors">
                <span>Профиль</span>
                <div className="w-8 h-8 rounded-full bg-res-accent/10 flex items-center justify-center group-hover:bg-res-accent group-hover:text-[#061e14] transition-all">
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
