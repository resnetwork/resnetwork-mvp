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
    <div className="w-full max-w-[1200px] mx-auto px-4 md:px-0">
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_30px_60px_rgba(0,184,124,0.1)] border border-res-accent/20">
        <div className="space-y-16">
          {GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-8 md:mb-12 text-center text-sm md:text-base font-bold tracking-[0.2em] text-[#0a1f24] uppercase flex items-center justify-center gap-4 opacity-50">
                <span className="h-px bg-[#0a1f24] w-12 md:w-24"></span>
                {group.title}
                <span className="h-px bg-[#0a1f24] w-12 md:w-24"></span>
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 items-center justify-items-center">
                {group.logos.map((logo) => (
                  <div
                    key={logo.src}
                    className="flex h-20 sm:h-24 md:h-32 w-full items-center justify-center transition-transform duration-500 hover:scale-110 cursor-pointer"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      className={`w-auto max-w-full object-contain ${logo.className}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}