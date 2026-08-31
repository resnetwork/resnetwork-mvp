"use client";

import { Landmark, Globe2, Building2, Briefcase, Handshake, Network } from "lucide-react";

export default function StatsBar() {
  const stats = [
    {
      icon: <Landmark size={20} className="text-res-accent" />,
      value: "32",
      label: "Правительства"
    },
    {
      icon: <Globe2 size={20} className="text-res-accent" />,
      value: "50+",
      label: "Межд. организации"
    },
    {
      icon: <Building2 size={20} className="text-res-accent" />,
      value: "300+",
      label: "Компании"
    },
    {
      icon: <Briefcase size={20} className="text-res-accent" />,
      value: "100+",
      label: "Инвесторы"
    },
    {
      icon: <Handshake size={20} className="text-res-accent" />,
      value: "30+",
      label: "Ассоциации"
    },
    {
      icon: <Network size={20} className="text-res-accent" />,
      value: "10 000+",
      label: "Связей создано"
    }
  ];

  return (
    <div className="w-full px-4 md:px-12 pb-3 pt-1">
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 md:gap-6 px-6 md:px-10 py-3 md:py-3.5 rounded-2xl bg-res-panel/85 backdrop-blur-2xl border border-res-accent/30 shadow-[0_8px_30px_rgba(0,240,255,0.15)]">
        {stats.map((stat, i) => (
          <div key={i} className="flex items-center gap-3 w-1/2 md:w-auto group">
            <div className="hidden lg:flex shrink-0 w-10 h-10 rounded-xl bg-res-accent/15 border border-res-accent/30 items-center justify-center text-res-accent group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-0.5">
                {stat.value}
              </div>
              <div className="text-[11px] md:text-xs font-bold uppercase tracking-wider text-res-text-muted leading-tight">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
