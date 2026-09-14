"use client";

import { useEffect, useState } from "react";

type PartnerLogo = { id: string, name: string, imageUrl: string, className: string };
type PartnerCategory = { id: string, title: string, direction: string, speed: string, logos: PartnerLogo[] };

export default function PartnersMarquee() {
  const [categories, setCategories] = useState<PartnerCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/partners")
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading || categories.length === 0) return null;

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8">
      <style>{`
        @keyframes marquee-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marquee-left var(--duration) linear infinite;
        }
        .animate-marquee-right {
          animation: marquee-right var(--duration) linear infinite;
        }
        .group:hover .animate-marquee-left,
        .group:hover .animate-marquee-right {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="bg-white rounded-3xl md:rounded-[3rem] py-8 md:py-20 shadow-[0_30px_60px_rgba(0,184,124,0.1)] border border-res-accent/20 overflow-hidden">
        <div className="space-y-12 md:space-y-24">
          {categories.map((group) => {
            // Дублируем массив логотипов 12 раз, чтобы строка была гарантированно шире любого экрана.
            // При анимации до -50% она пройдет ровно половину (6 блоков) и бесшовно зациклится.
            const repeatedLogos = Array.from({ length: 12 }).flatMap(() => group.logos);
            
            return (
              <div key={group.id} className="relative flex flex-col group">
                <h3 className="mb-6 md:mb-14 text-center text-[10px] sm:text-xs md:text-xl font-black tracking-widest md:tracking-[0.25em] text-[#0a1f24] uppercase flex items-center justify-center gap-3 md:gap-6 opacity-70 px-4">
                  <span className="h-[2px] bg-[#0a1f24]/20 w-6 sm:w-12 md:w-32 rounded-full"></span>
                  {group.title}
                  <span className="h-[2px] bg-[#0a1f24]/20 w-6 sm:w-12 md:w-32 rounded-full"></span>
                </h3>

                {/* Контейнер маскирующий края (опционально можно добавить градиенты) */}
                <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div 
                    className={`flex w-max gap-8 md:gap-32 items-center px-4 md:px-8 ${group.direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
                    style={{ "--duration": group.speed } as React.CSSProperties}
                  >
                    {repeatedLogos.map((logo, idx) => (
                      <div
                        key={`${logo.id}-${idx}`}
                        className="flex shrink-0 items-center justify-center transition-transform duration-500 hover:scale-110 hover:brightness-110 cursor-pointer"
                      >
                        <img
                          src={logo.imageUrl}
                          alt={logo.name}
                          className={`w-auto object-contain ${logo.className}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}