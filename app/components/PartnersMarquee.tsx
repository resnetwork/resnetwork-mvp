export default function PartnersMarquee() {
  const logos = [
    { src: "/logo-bf.png", height: 96 },
    { src: "/logo-brettc.jpg", height: 96 },
    { src: "/logo-caier.jpeg", height: 96 },
    { src: "/logo-igtic.png", height: 58 },
    { src: "/logo-petrocouncil.png", height: 92 },
    { src: "/logo-unesco.png", height: 78 },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-14">
      {logos.map((logo) => (
        <img key={logo.src} src={logo.src} alt="Партнёр" style={{ height: `${logo.height}px`, width: "auto", maxWidth: "220px", objectFit: "contain" }} />
      ))}
    </div>
  );
}