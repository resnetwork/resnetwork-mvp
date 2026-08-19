"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin,
  X,
  Radio,
  ArrowUpRight,
} from "lucide-react";
import { geoMercator, geoPath, geoContains } from "d3-geo";
import { feature } from "topojson-client";

const PAGE_BG = "#081712";
const TEXT_LIGHT = "#f2ede2";
const TEXT_MUTED = "#9fb7a8";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
const CENTRAL_ASIA = ["Kazakhstan", "Uzbekistan", "Turkmenistan", "Kyrgyzstan", "Tajikistan"];

interface MatrixDot {
  x: number;
  y: number;
  countryId: string;
}

interface CapitalData {
  id: string;
  name: string;
  country: string;
  capital: string;
  coords: [number, number]; // [lng, lat]
  hub?: boolean;
  role: string;
  focus: string[];
  stats: string;
  metrics: { label: string; value: string }[];
}

const CA_CAPITALS: CapitalData[] = [
  {
    id: "Kazakhstan",
    name: "Казахстан",
    country: "Казахстан",
    capital: "Астана (Хаб)",
    coords: [71.45, 51.17],
    hub: true,
    role: "Центральный координационный хаб ESG-стандартов, зелёных инвестиций и климатической адаптации региона",
    focus: ["Ветровая и солнечная генерация", "Зелёные облигации", "ESG-стандарты (GRI)", "Декарбонизация"],
    stats: "32+ проекта в сети",
    metrics: [
      { label: "Цель ВИЭ к 2030", value: "15%" },
      { label: "Инвест-портфель", value: "$4.2B" },
      { label: "Снижение эмиссий", value: "-15%" },
    ],
  },
  {
    id: "Uzbekistan",
    name: "Узбекистан",
    country: "Узбекистан",
    capital: "Ташкент",
    coords: [69.24, 41.30],
    hub: false,
    role: "Крупнейший центр модернизации солнечной энергетики, энергоэффективности и водосбережения",
    focus: ["Масштабные солнечные парки", "Энергоэффективность", "Капельное орошение", "Зелёные технологии"],
    stats: "18+ проектов в сети",
    metrics: [
      { label: "Цель ВИЭ к 2030", value: "25%" },
      { label: "Солнечные мощности", value: "5+ ГВт" },
      { label: "Экономия воды", value: "30%" },
    ],
  },
  {
    id: "Kyrgyzstan",
    name: "Кыргызстан",
    country: "Кыргызстан",
    capital: "Бишкек",
    coords: [74.59, 42.87],
    hub: false,
    role: "Развитие малой гидрогенерации, сохранение высокогорных экосистем и экотуризма",
    focus: ["Малые и средние ГЭС", "Горные экосистемы", "Зелёный водород", "Экотуризм"],
    stats: "12+ проектов в сети",
    metrics: [
      { label: "Доля гидрогенерации", value: "90%" },
      { label: "Потенциал малых ГЭС", value: "1.2 ГВт" },
      { label: "Защита ледников", value: "4 нацпарка" },
    ],
  },
  {
    id: "Tajikistan",
    name: "Таджикистан",
    country: "Таджикистан",
    capital: "Душанбе",
    coords: [68.78, 38.56],
    hub: false,
    role: "Главный гидроэнергетический резерв Центральной Азии и координация трансграничных вод",
    focus: ["Крупная гидроэнергетика", "Мониторинг ледников", "Трансграничное сотрудничество"],
    stats: "9+ проектов в сети",
    metrics: [
      { label: "Чистая генерация", value: "98%" },
      { label: "Гидропотенциал", value: "527 млрд кВтч" },
      { label: "Водные запасы ЦА", value: "60%" },
    ],
  },
  {
    id: "Turkmenistan",
    name: "Туркменистан",
    country: "Туркменистан",
    capital: "Ашхабад",
    coords: [58.38, 37.96],
    hub: false,
    role: "Снижение промышленных выбросов метана, борьба с опустыниванием и развитие чистых газов",
    focus: ["Улавливание метана", "Озеленение и барьеры", "Зелёный водород", "Экомониторинг"],
    stats: "7+ проектов в сети",
    metrics: [
      { label: "Снижение метана", value: "-20%" },
      { label: "Зелёный пояс", value: "140M деревьев" },
      { label: "Солнечный потенциал", value: "300 дн/год" },
    ],
  },
];

const CANVAS_W = 1600;
const CANVAS_H = 850;
const STEP = 13;

/**
 * Заголовок с эффектом Focus Reveal без сиротливого переноса слов (неразрывная связка «Центральной Азии»)
 */
function FocusRevealHeading() {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.25 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tokens = [
    { text: "Единая", isAccent: false },
    { text: "экосистема", isAccent: false },
    { text: "Центральной Азии", isAccent: true, isNoWrap: true },
  ];

  return (
    <h2
      ref={headingRef}
      className="text-3xl md:text-5xl lg:text-[46px] font-bold tracking-tight text-center flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 select-none mx-auto"
      style={{ color: TEXT_LIGHT }}
    >
      {tokens.map((token, index) => (
        <span
          key={token.text}
          className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            token.isNoWrap ? "whitespace-nowrap" : ""
          } ${
            token.isAccent
              ? "text-emerald-400 font-extrabold drop-shadow-[0_0_20px_rgba(74,222,128,0.45)]"
              : ""
          }`}
          style={{
            filter: isVisible ? "blur(0px)" : "blur(14px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : "translateY(14px) scale(0.93)",
            transitionDelay: `${index * 130 + 50}ms`,
          }}
        >
          {token.text}
        </span>
      ))}
    </h2>
  );
}

export default function CentralAsiaMap() {
  const [activeCountry, setActiveCountry] = useState<CapitalData | null>(null);
  const [hoveredCountryId, setHoveredCountryId] = useState<string | null>(null);
  const [dots, setDots] = useState<MatrixDot[]>([]);
  const [features, setFeatures] = useState<any[]>([]);
  const [projectionFn, setProjectionFn] = useState<any>(null);
  const [badgePositions, setBadgePositions] = useState<{ [id: string]: { x: number; y: number } }>({});

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 1. Инициализация геометрии и пре-калькуляция точек
  useEffect(() => {
    let cancelled = false;

    fetch(geoUrl)
      .then((r) => r.json())
      .then((topo) => {
        if (cancelled) return;
        const objectName = Object.keys(topo.objects)[0];
        const all = (feature(topo, topo.objects[objectName]) as any).features;
        const caFeatures = all.filter((f: any) => CENTRAL_ASIA.includes(f.properties.name));
        const caCollection = {
          type: "FeatureCollection",
          features: caFeatures,
        };

        const projection = geoMercator().fitExtent(
          [
            [25, 20],
            [CANVAS_W - 25, CANVAS_H - 20],
          ],
          caCollection as any
        );

        setFeatures(caFeatures);
        setProjectionFn(() => projection);

        const badgePosMap: { [id: string]: { x: number; y: number } } = {};
        CA_CAPITALS.forEach((c) => {
          const pt = projection(c.coords);
          if (pt) {
            badgePosMap[c.id] = {
              x: (pt[0] / CANVAS_W) * 100,
              y: (pt[1] / CANVAS_H) * 100,
            };
          }
        });
        setBadgePositions(badgePosMap);

        const calculatedDots: MatrixDot[] = [];
        for (let x = 20; x < CANVAS_W - 20; x += STEP) {
          for (let y = 15; y < CANVAS_H - 15; y += STEP) {
            const coords = projection.invert ? projection.invert([x, y]) : null;
            if (coords) {
              const matchedFeature = caFeatures.find((f: any) => geoContains(f, coords));
              if (matchedFeature) {
                calculatedDots.push({
                  x,
                  y,
                  countryId: matchedFeature.properties.name,
                });
              }
            }
          }
        }

        setDots(calculatedDots);
      })
      .catch((err) => console.error("Geo load error:", err));

    return () => {
      cancelled = true;
    };
  }, []);

  // Наведение курсора по всей территории карты
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !projectionFn || features.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const canvasX = (clientX / rect.width) * CANVAS_W;
      const canvasY = (clientY / rect.height) * CANVAS_H;

      const coords = projectionFn.invert ? projectionFn.invert([canvasX, canvasY]) : null;
      if (coords) {
        const found = features.find((f: any) => geoContains(f, coords));
        setHoveredCountryId(found ? found.properties.name : null);
      } else {
        setHoveredCountryId(null);
      }
    },
    [projectionFn, features]
  );

  const handleMouseLeave = useCallback(() => {
    setHoveredCountryId(null);
  }, []);

  // Клик по территории страны
  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current || !projectionFn || features.length === 0) return;

      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const canvasX = (clientX / rect.width) * CANVAS_W;
      const canvasY = (clientY / rect.height) * CANVAS_H;

      const coords = projectionFn.invert ? projectionFn.invert([canvasX, canvasY]) : null;
      if (coords) {
        const found = features.find((f: any) => geoContains(f, coords));
        if (found) {
          const countryData = CA_CAPITALS.find((c) => c.id === found.properties.name);
          if (countryData) setActiveCountry(countryData);
        }
      }
    },
    [projectionFn, features]
  );

  // 60 FPS батчевый рендер точек, четких контуров и неоновых дуг
  useEffect(() => {
    if (dots.length === 0 || !projectionFn || features.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const pathGen = geoPath(projectionFn, ctx);

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      const currentHighlight = hoveredCountryId || activeCountry?.id || null;

      // 1. Контуры и подложка стран
      features.forEach((feat: any) => {
        const countryName = feat.properties.name;
        const isHighlight = currentHighlight === countryName;

        ctx.beginPath();
        pathGen(feat);

        ctx.fillStyle = isHighlight
          ? "rgba(34, 197, 94, 0.22)"
          : "rgba(22, 163, 74, 0.07)";
        ctx.fill();

        ctx.lineWidth = isHighlight ? 2.4 : 1.4;
        ctx.strokeStyle = isHighlight
          ? "rgba(74, 222, 128, 0.95)"
          : "rgba(34, 197, 94, 0.45)";
        
        if (isHighlight) {
          ctx.shadowColor = "#4ade80";
          ctx.shadowBlur = 10;
        }
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 2. Неоновые точки матрицы
      const normalDots: MatrixDot[] = [];
      const highlightDots: MatrixDot[] = [];

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        if (currentHighlight && d.countryId === currentHighlight) {
          highlightDots.push(d);
        } else {
          normalDots.push(d);
        }
      }

      ctx.beginPath();
      for (let i = 0; i < normalDots.length; i++) {
        const d = normalDots[i];
        ctx.moveTo(d.x + 2.0, d.y);
        ctx.arc(d.x, d.y, 2.0, 0, Math.PI * 2);
      }
      ctx.fillStyle = currentHighlight
        ? "rgba(34, 197, 94, 0.45)"
        : "rgba(34, 197, 94, 0.75)";
      ctx.fill();

      if (highlightDots.length > 0) {
        ctx.beginPath();
        for (let i = 0; i < highlightDots.length; i++) {
          const d = highlightDots[i];
          ctx.moveTo(d.x + 3.0, d.y);
          ctx.arc(d.x, d.y, 3.0, 0, Math.PI * 2);
        }
        ctx.fillStyle = "#4ade80";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 3. Неоновые дуги связей
      const hubCoord = CA_CAPITALS.find((c) => c.hub)!.coords;
      const hubPos = projectionFn(hubCoord) || [0, 0];
      const spokes = CA_CAPITALS.filter((c) => !c.hub);

      spokes.forEach((spoke, idx) => {
        const spokePos = projectionFn(spoke.coords);
        if (!spokePos) return;

        const isArcActive =
          currentHighlight === spoke.id || currentHighlight === "Kazakhstan";

        const midX = (hubPos[0] + spokePos[0]) / 2 - 40;
        const midY = (hubPos[1] + spokePos[1]) / 2 - 40;

        ctx.beginPath();
        ctx.moveTo(hubPos[0], hubPos[1]);
        ctx.quadraticCurveTo(midX, midY, spokePos[0], spokePos[1]);
        ctx.strokeStyle = isArcActive
          ? "rgba(74, 222, 128, 0.95)"
          : "rgba(34, 197, 94, 0.35)";
        ctx.lineWidth = isArcActive ? 2.4 : 1.4;
        ctx.setLineDash(isArcActive ? [6, 4] : [4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);

        const photonT = (time * 0.5 + idx * 0.25) % 1;
        const invT = 1 - photonT;
        const px = invT * invT * hubPos[0] + 2 * invT * photonT * midX + photonT * photonT * spokePos[0];
        const py = invT * invT * hubPos[1] + 2 * invT * photonT * midY + photonT * photonT * spokePos[1];

        ctx.beginPath();
        ctx.arc(px, py, isArcActive ? 4.5 : 3.0, 0, Math.PI * 2);
        ctx.fillStyle = "#86efac";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = isArcActive ? 14 : 7;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [dots, projectionFn, features, hoveredCountryId, activeCountry]);

  // Закрытие модального окна по Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCountry(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      className="relative w-full pt-16 pb-16 md:pt-24 md:pb-24 flex flex-col items-center justify-center overflow-hidden select-none bg-[#081712]"
    >
      {/* Мягкое плавное изумрудное сияние позади карты */}
      <div
        className="absolute w-[1200px] md:w-[1800px] h-[550px] md:h-[800px] rounded-full blur-[240px] pointer-events-none opacity-20 z-0"
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 50%, #16a34a 0%, #064e3b 40%, transparent 75%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Заголовок с эффектом Focus Reveal */}
      <div className="relative z-20 w-full max-w-5xl mx-auto text-center px-6 mb-8 md:mb-12">
        <FocusRevealHeading />
      </div>

      {/* Полноэкранный блок карты */}
      <div className="relative w-full max-w-[1600px] mx-auto px-2 md:px-6 flex flex-col items-center justify-center z-10">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleContainerClick}
          className="relative w-full aspect-[1600/850] max-h-[85vh] flex items-center justify-center cursor-pointer"
        >
          {/* Canvas с неоновой матрицей, четкими границами и дугами */}
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="w-full h-full object-contain pointer-events-none relative z-10"
          />

          {/* Парящие плашки столиц (Floating Badges) с точной привязкой */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {CA_CAPITALS.map((c) => {
              const pos = badgePositions[c.id];
              if (!pos) return null;

              const isHovered = hoveredCountryId === c.id;
              const isActive = activeCountry?.id === c.id;

              return (
                <div
                  key={c.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCountry(c);
                  }}
                  onMouseEnter={() => setHoveredCountryId(c.id)}
                  onMouseLeave={() => setHoveredCountryId(null)}
                  className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                  }}
                >
                  {/* Мобильный компактный пин */}
                  <div className="md:hidden flex flex-col items-center">
                    <div
                      className={`w-2.5 h-2.5 rounded-full border border-emerald-300 transition-all ${
                        isActive || isHovered
                          ? "bg-emerald-300 shadow-[0_0_15px_#4ade80] scale-125"
                          : c.hub
                          ? "bg-emerald-400 animate-ping"
                          : "bg-emerald-500"
                      }`}
                    />
                    <span className="mt-1 px-1.5 py-0.5 rounded bg-black/80 border border-emerald-500/40 text-[9px] font-bold text-emerald-200 whitespace-nowrap shadow-lg backdrop-blur-md">
                      {c.capital.split(" ")[0]}
                    </span>
                  </div>

                  {/* Десктопный полноценный бейдж */}
                  <div
                    className={`hidden md:flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl ${
                      isActive || isHovered
                        ? "bg-emerald-500 text-white border-emerald-200 shadow-[0_0_35px_rgba(74,222,128,0.9)] ring-2 ring-emerald-300/60 scale-105"
                        : "bg-black/80 text-emerald-100 border-emerald-500/40 hover:border-emerald-400 hover:bg-black/95"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full ${
                        c.hub ? "bg-emerald-300 animate-ping" : "bg-emerald-400"
                      }`}
                    />
                    <span className="text-sm font-bold whitespace-nowrap">
                      {c.name} ({c.capital.split(" ")[0]})
                    </span>
                    {c.hub && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-extrabold uppercase tracking-wider">
                        HUB
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Мобильная лента быстрого выбора стран под картой */}
        <div className="flex md:hidden items-center justify-start gap-2 overflow-x-auto w-full pt-4 pb-2 px-1 no-scrollbar">
          {CA_CAPITALS.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCountry(c)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 text-xs font-semibold backdrop-blur-md active:scale-95 transition-all hover:bg-emerald-900 hover:text-white shadow-lg"
            >
              <span className={`w-2 h-2 rounded-full ${c.hub ? "bg-emerald-400 animate-pulse" : "bg-emerald-500"}`} />
              <span>{c.name}</span>
              {c.hub && (
                <span className="text-[8px] px-1 py-0.5 rounded bg-emerald-500 text-black font-extrabold">HUB</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Элегантный модальный Pop-up с подробной информацией о стране */}
      {activeCountry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveCountry(null)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#064e3b]/95 to-[#041d14]/98 p-6 md:p-8 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.85)] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

            <button
              onClick={() => setActiveCountry(null)}
              className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-200 hover:text-white hover:bg-emerald-900 transition-all cursor-pointer"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 flex items-center gap-2 mb-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                {activeCountry.hub ? "Центральный Координационный Хаб" : "Партнёр Региональной Сети"}
              </span>
            </div>

            <h3 className="relative z-10 text-3xl font-bold tracking-tight" style={{ color: TEXT_LIGHT }}>
              {activeCountry.country}
            </h3>

            <div className="relative z-10 flex items-center gap-1.5 mt-1 mb-4 text-emerald-300 text-sm font-medium">
              <MapPin size={15} className="text-emerald-400" />
              <span>{activeCountry.capital}</span>
              <span className="text-xs text-emerald-400/60 ml-2">
                ({activeCountry.coords[1].toFixed(2)}° N, {activeCountry.coords[0].toFixed(2)}° E)
              </span>
            </div>

            <p className="relative z-10 text-sm leading-relaxed mb-6" style={{ color: TEXT_MUTED }}>
              {activeCountry.role}
            </p>

            <div className="relative z-10 grid grid-cols-3 gap-2.5 mb-6">
              {activeCountry.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-2xl bg-emerald-950/50 border border-emerald-500/25 text-center"
                >
                  <div className="text-sm font-extrabold text-emerald-300">{m.value}</div>
                  <div className="text-[10px] text-emerald-400/70 mt-0.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="relative z-10 mb-6">
              <span className="block text-xs font-bold uppercase tracking-wider text-emerald-400/80 mb-2.5">
                Ключевые направления:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCountry.focus.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-3 py-1.5 rounded-xl bg-emerald-900/40 border border-emerald-500/30 text-emerald-100/90 font-medium backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#events"
              onClick={() => setActiveCountry(null)}
              className="relative z-10 flex items-center justify-between w-full px-5 py-4 rounded-2xl font-bold text-sm text-white bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 transition-all duration-300 shadow-xl shadow-emerald-950/80 group cursor-pointer"
            >
              <span>Смотреть мероприятия {activeCountry.country === "Казахстан" ? "в Казахстане" : "в регионе"}</span>
              <ArrowUpRight size={17} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}