const GROUPS = [
  {
    title: "Они строят экосистему",
    direction: "left",
    speed: "40s",
    logos: [
      { src: "/logo-bf.png", name: "Business First", className: "h-9 sm:h-12 md:h-16" },
      { src: "/logo-brettc.jpg", name: "B&R ETTC", className: "h-10 sm:h-14 md:h-20" },
      { src: "/logo-caier.jpeg", name: "CAIER", className: "h-12 sm:h-16 md:h-24" },
    ],
  },
  {
    title: "Они формируют энергопереход",
    direction: "right",
    speed: "45s",
    logos: [
      { src: "/logo-igtic.png", name: "IGTIC", className: "h-10 sm:h-14 md:h-20" },
      { src: "/logo-petrocouncil.png", name: "Petrocouncil", className: "h-8 sm:h-11 md:h-16" },
      { src: "/logo-unesco.png", name: "UNESCO", className: "h-10 sm:h-14 md:h-20" },
    ],
  },
];

export default function PartnersMarquee() {
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
      
      <div className="bg-white rounded-[3rem] py-12 md:py-20 shadow-[0_30px_60px_rgba(0,184,124,0.1)] border border-res-accent/20 overflow-hidden">
        <div className="space-y-16 md:space-y-24">
          {GROUPS.map((group, groupIdx) => {
            // Дублируем массив логотипов 12 раз, чтобы строка была гарантированно шире любого экрана.
            // При анимации до -50% она пройдет ровно половину (6 блоков) и бесшовно зациклится.
            const repeatedLogos = Array.from({ length: 12 }).flatMap(() => group.logos);
            
            return (
              <div key={groupIdx} className="relative flex flex-col group">
                <h3 className="mb-8 md:mb-14 text-center text-base md:text-xl font-black tracking-[0.25em] text-[#0a1f24] uppercase flex items-center justify-center gap-6 opacity-70 px-4">
                  <span className="h-[2px] bg-[#0a1f24]/20 w-12 md:w-32 rounded-full"></span>
                  {group.title}
                  <span className="h-[2px] bg-[#0a1f24]/20 w-12 md:w-32 rounded-full"></span>
                </h3>

                {/* Контейнер маскирующий края (опционально можно добавить градиенты) */}
                <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                  <div 
                    className={`flex w-max gap-16 md:gap-32 items-center px-8 ${group.direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
                    style={{ "--duration": group.speed } as React.CSSProperties}
                  >
                    {repeatedLogos.map((logo, idx) => (
                      <div
                        key={`${logo.name}-${idx}`}
                        className="flex shrink-0 items-center justify-center transition-transform duration-500 hover:scale-110 hover:brightness-110 cursor-pointer"
                      >
                        <img
                          src={logo.src}
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