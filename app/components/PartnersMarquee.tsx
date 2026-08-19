const GROUPS = [
  {
    title: "Партнёры экосистемы",
    logos: [
      { src: "/logo-bf.png", name: "Business First", className: "max-h-7 sm:max-h-11 md:max-h-16" },
      { src: "/logo-brettc.jpg", name: "B&R ETTC", className: "max-h-8 sm:max-h-12 md:max-h-16" },
      { src: "/logo-caier.jpeg", name: "CAIER", className: "max-h-10 sm:max-h-14 md:max-h-20" },
    ],
  },
  {
    title: "Институциональные партнёры",
    logos: [
      { src: "/logo-igtic.png", name: "IGTIC", className: "max-h-8 sm:max-h-12 md:max-h-16" },
      { src: "/logo-petrocouncil.png", name: "Petrocouncil", className: "max-h-6 sm:max-h-10 md:max-h-14" },
      { src: "/logo-unesco.png", name: "UNESCO", className: "max-h-8 sm:max-h-11 md:max-h-15" },
    ],
  },
];

export default function PartnersMarquee() {
  return (
    <div className="space-y-10 md:space-y-16 max-w-5xl mx-auto px-2 md:px-0">
      {GROUPS.map((group) => (
        <div key={group.title}>
          <h3 className="mb-4 md:mb-6 text-center text-xs md:text-sm font-bold tracking-[0.2em] text-emerald-400 uppercase">
            {group.title}
          </h3>

          {/* Единая большая белая карточка-подиум под категорию */}
          <div className="rounded-2xl md:rounded-3xl bg-white p-4 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transition-all duration-300 hover:shadow-[0_25px_80px_rgba(74,222,128,0.15)]">
            <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-10 items-center justify-items-center">
              {group.logos.map((logo) => (
                <div
                  key={logo.src}
                  className="flex h-12 sm:h-16 md:h-24 w-full items-center justify-center p-1 transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className={`w-auto max-w-full object-contain transition-opacity duration-300 hover:opacity-90 ${logo.className}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}