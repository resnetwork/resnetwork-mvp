const GROUPS = [
  { title: "Партнёры экосистемы", logos: ["/logo-bf.png", "/logo-brettc.jpg", "/logo-caier.jpeg"] },
  { title: "Институциональные партнёры", logos: ["/logo-igtic.png", "/logo-petrocouncil.png", "/logo-unesco.png"] },
];

export default function PartnersMarquee() {
  return (
    <div className="space-y-16">
      {GROUPS.map((group) => (
        <section key={group.title}>
          <h3 className="mb-8 text-center text-sm font-bold tracking-[.16em]" style={{ color: "#245E42" }}>
            {group.title.toUpperCase()}
          </h3>
          <div className="grid grid-cols-2 items-center gap-x-12 gap-y-10 md:grid-cols-3">
            {group.logos.map((src) => (
              <div key={src} className="flex h-28 items-center justify-center">
                <img src={src} alt={group.title} className="h-20 w-44 object-contain" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}