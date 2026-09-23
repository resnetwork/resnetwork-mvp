"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ExternalLink, MapPin, ChevronDown } from "lucide-react";
import Globe, { GlobeLocation } from "./Globe";
import { NewsItem } from "@/app/actions/news";

/* ── Seed data shown instantly before API response ─────────────── */
const SEED: NewsItem[] = [
  { id:"s1", title:"KEGOC реализует программу модернизации национальных электрических сетей", summary:"В рамках укрепления энергетической безопасности и интеграции новых мощностей ВИЭ национальный системный оператор реализует ключевые проекты по усилению линий электропередачи и балансировке единой энергосистемы Казахстана.", pubDate:Date.now()-7200000, dateFormatted:"2 сентября 2026 г.", source:"KEGOC", sourceUrl:"https://www.kegoc.kz", region:"ca", readTime:"3 мин", location:{name:"Астана",country:"Казахстан",lat:51.17,lng:71.45}},
  { id:"s2", title:"Global Renewable Power and Clean Energy Investment Outlook", summary:"According to latest official market assessments, global capital deployment into solar PV, offshore wind, and long-duration battery storage accelerates towards carbon neutrality milestones.", pubDate:Date.now()-10800000, dateFormatted:"2 сентября 2026 г.", source:"IEA", sourceUrl:"https://www.iea.org", region:"world", readTime:"4 мин", location:{name:"Париж",country:"Франция",lat:48.86,lng:2.35}},
  { id:"s3", title:"AIFC Green Finance Centre регистрирует новые выпуски зеленых облигаций", summary:"Центр зеленого финансирования МФЦА продолжает верификацию инструментов устойчивого финансирования для масштабных инфраструктурных проектов ВИЭ и промышленной декарбонизации в Центральной Азии.", pubDate:Date.now()-18000000, dateFormatted:"1 сентября 2026 г.", source:"AIFC Green Finance Centre", sourceUrl:"https://greenfinance.aifc.kz", region:"ca", readTime:"4 мин", location:{name:"Астана",country:"Казахстан",lat:51.17,lng:71.45}},
];

export default function NewsSection() {
  const [news, setNews] = useState<NewsItem[]>(SEED);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((d) => { if (d.success && d.news?.length) setNews(d.news); })
      .catch(() => {});
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return news;
    const q = search.toLowerCase();
    return news.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.summary.toLowerCase().includes(q) ||
        n.source.toLowerCase().includes(q) ||
        n.location?.name.toLowerCase().includes(q) ||
        n.location?.country.toLowerCase().includes(q)
    );
  }, [news, search]);

  const expandedItem = filtered.find((n) => n.id === expandedId) ?? null;
  const globeTarget: GlobeLocation | null = expandedItem?.location ?? null;

  const toggle = (id: string) => setExpandedId((prev) => (prev === id ? null : id));

  // Compute globe markers based on currently filtered news
  const globeMarkers = useMemo(() => {
    return {
      markers: filtered.map(item => ({
        lat: item.location.lat,
        lng: item.location.lng
      })),
      color: "#AFE552", // Changed to a brighter color for better visibility
      size: 50
    };
  }, [filtered]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-transparent glass-panel-charcoal border border-[#AFE552]/10 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      {/* decorative blurs */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#02B779]/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#AFE552]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row h-auto lg:h-[860px] relative z-10">

        {/* ─── LEFT: news accordion ─────────────────────────────── */}
        <div className="lg:w-[45%] flex flex-col bg-transparent z-10 border-b lg:border-b-0 lg:border-r border-white/10">

          {/* Header */}
          <div className="px-8 pt-10 pb-6 shrink-0">
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.1] tracking-tight uppercase">
              Глобальный & <br /> Региональный <span className="text-[#02B779]">Контекст</span>
            </h1>
            
            <div className="relative mt-8">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
              <input
                type="text"
                placeholder="Поиск по новостям, странам…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-base text-white placeholder-white/40 focus:outline-none focus:border-[#02B779] transition-colors"
              />
            </div>
          </div>

          {/* Scrollable accordion list — bigger cards, max ~5 visible */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-8 space-y-3 max-h-[400px] lg:max-h-none">
            {filtered.length === 0 && (
              <p className="text-center py-16 text-white/40 text-sm">Ничего не найдено</p>
            )}

            {filtered.map((item) => {
              const isOpen = expandedId === item.id;
              const isCA = item.region === "ca";

              return (
                <div
                  key={item.id}
                  id={`news-item-${item.id}`}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-[#02B779]/40 bg-[#02B779]/10 shadow-[0_4px_24px_rgba(2,183,121,0.15)]"
                      : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15"
                  }`}
                >
                  {/* ── Header row (always visible) ── */}
                  <button
                    type="button"
                    onClick={() => toggle(item.id)}
                    className="w-full text-left px-6 py-5 flex items-start gap-4 cursor-pointer group"
                  >
                    {/* region badge */}
                    <span className={`mt-1 shrink-0 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider ${
                      isCA
                        ? "bg-[#02B779]/15 text-[#02B779] border border-[#02B779]/30"
                        : "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                    }`}>
                      {isCA ? "ЦА" : "МИР"}
                    </span>

                    {/* title + meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-[17px] sm:text-lg leading-snug transition-colors ${
                        isOpen ? "text-white line-clamp-none mb-3" : "text-white/80 group-hover:text-white line-clamp-2"
                      }`}>
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5 text-[13px] text-white/50">
                        <span className="font-bold text-[#02B779]">{item.source}</span>
                        <span className="font-mono text-[12px]">{item.dateFormatted}</span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1.5 text-white/70">
                            <MapPin size={13} className="text-[#02B779]" />
                            <span>{item.location.name}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* chevron */}
                    <ChevronDown
                      size={22}
                      className={`shrink-0 mt-2 text-white/30 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#02B779]" : ""
                      }`}
                    />
                  </button>

                  {/* ── Expanded accordion body ── */}
                  {isOpen && (
                    <div className="px-6 pb-6 pt-0 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="ml-12 border-t border-white/10 pt-5 space-y-5">
                        {/* Location pill */}
                        {item.location && (
                          <div className="inline-flex items-center gap-2 text-[15px] font-mono text-white px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <MapPin size={16} className="text-[#02B779]" />
                            {item.location.name}, {item.location.country}
                          </div>
                        )}

                        {/* Full summary text — much larger */}
                        <p className="text-base sm:text-[17px] leading-[1.8] text-white/80">
                          {item.summary}
                        </p>

                        {/* Read time */}
                        {item.readTime && (
                          <p className="text-[13px] text-white/40 font-mono">
                            Время чтения: {item.readTime}
                          </p>
                        )}

                        {/* Source link button */}
                        {item.sourceUrl && (
                          <div className="pt-3">
                            <a
                              href={item.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-2.5 text-[15px] font-bold text-[#0A110D] bg-gradient-to-r from-[#AFE552] to-[#ECFFD3] px-7 py-3.5 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(175,229,82,0.3)]"
                            >
                              Читать на {item.source} <ExternalLink size={16} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ─── RIGHT: 3D Globe ─────────────────────────────────── */}
        <div className="lg:w-[55%] flex flex-col items-center justify-center relative min-h-[400px] p-4 overflow-hidden">

          {/* Floating location badge */}
          <div className="absolute top-5 left-5 z-10">
            {expandedItem?.location ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111D16]/90 border border-[#02B779]/30 shadow-[0_10px_30px_rgba(2,183,121,0.2)] backdrop-blur-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#02B779] animate-pulse" />
                <span className="text-sm font-mono font-bold text-white">
                  📍 {expandedItem.location.name}, {expandedItem.location.country}
                </span>
              </div>
            ) : null}
          </div>

          <Globe
            className="w-full max-w-[500px] aspect-square"
            focusLocation={globeTarget}
            markerConfig={globeMarkers}
            onMarkerClick={(marker) => {
              const matchingItem = filtered.find(item => item.location.lat === marker.lat && item.location.lng === marker.lng);
              if (matchingItem) {
                setExpandedId(matchingItem.id);
                // Optional: Scroll the accordion to the selected item
                const el = document.getElementById(`news-item-${matchingItem.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
              }
            }}
            dots={{ color: "#ffffff", size: 5, density: 4, allDots: false }}
            detail={8}
            showOutline={true}
          />
        </div>
      </div>
    </div>
  );
}
