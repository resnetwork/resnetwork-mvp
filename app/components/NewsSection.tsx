"use client";

import { useState, useEffect, useMemo } from "react";
import { Search, ExternalLink, MapPin, ChevronDown } from "lucide-react";
import Globe, { GlobeLocation } from "./Globe";
import { NewsItem } from "@/app/actions/news";

/* ── Seed data shown instantly before API response ─────────────── */
const SEED: NewsItem[] = [
  { id:"s1", title:"Казахстан добавляет мощности: в Текели запустили новую генерацию", summary:"В Жетысуской области расширили мощности регионального энергетического узла с акцентом на модернизацию распределительных сетей и ввод новых чистых генерирующих установок. Проект нацелен на покрытие растущего промышленного энергопотребления и снижение углеродоемкости региональной энергосистемы. Энергокомплекс за два года нарастил генерацию до 53 мегаватт.", pubDate:Date.now()-7200000, dateFormatted:"31 августа 2026 г.", source:"Inbusiness.kz", sourceUrl:"https://inbusiness.kz", region:"ca", readTime:"3 мин", location:{name:"Текели",country:"Казахстан",lat:44.83,lng:78.82}},
  { id:"s2", title:"Record solar and battery growth as clean energy shift accelerates globally", summary:"Global renewable investments reached historic milestones with battery energy storage systems (BESS) and utility-scale solar farms leading global grid decarbonization across North America, Europe, and the Asia-Pacific region. Analysts forecast continued double-digit growth through the end of the decade.", pubDate:Date.now()-10800000, dateFormatted:"31 августа 2026 г.", source:"pv magazine", sourceUrl:"https://www.pv-magazine.com", region:"world", readTime:"4 мин", location:{name:"Сидней",country:"Австралия",lat:-33.87,lng:151.21}},
  { id:"s3", title:"Корейские фонды инвестируют $340 млн в солнечные и ветровые кластеры ЦА", summary:"Международные институциональные инвесторы согласовали синдицированное финансирование новых парков ВИЭ на юге Казахстана и в Навоийской области Узбекистана в рамках расширения трансграничного зеленого коридора. Программа включает строительство солнечных электростанций суммарной мощностью более 200 МВт.", pubDate:Date.now()-18000000, dateFormatted:"30 августа 2026 г.", source:"DKNews.kz", sourceUrl:"https://dknews.kz", region:"ca", readTime:"4 мин", location:{name:"Астана",country:"Казахстан",lat:51.17,lng:71.45}},
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
      color: "#02B779",
      size: 50
    };
  }, [filtered]);

  return (
    <div className="relative w-full overflow-hidden rounded-3xl bg-[#0a1f18]/80 backdrop-blur-xl border border-[#A1BB94]/20 shadow-[0_15px_50px_rgba(0,0,0,0.5)]">
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
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#02B779]/8 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#AFE552]/8 rounded-full blur-[110px] pointer-events-none" />

      <div className="flex flex-col lg:flex-row h-auto lg:h-[860px]">

        {/* ─── LEFT: news accordion ─────────────────────────────── */}
        <div className="lg:w-[45%] flex flex-col bg-[#071610]/60 z-10 border-b lg:border-b-0 lg:border-r border-[#A1BB94]/15">

          {/* Header */}
          <div className="px-8 pt-10 pb-6 shrink-0">
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight mb-3">
              Глобальный & региональный{" "}
              <span className="text-[#AFE552]">контекст</span>
            </h2>
            <p className="text-base text-res-text-muted mb-6">
              Нажмите на заголовок — новость раскроется, а глобус повернётся к месту события.
            </p>

            {/* search */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-res-text-muted pointer-events-none" />
              <input
                type="text"
                placeholder="Поиск по новостям, странам…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-5 py-3.5 rounded-2xl bg-white/[0.04] border border-white/10 text-base text-white placeholder-res-text-muted focus:outline-none focus:border-[#02B779] transition-colors"
              />
            </div>
          </div>

          {/* Scrollable accordion list — bigger cards, max ~5 visible */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 pb-8 space-y-3">
            {filtered.length === 0 && (
              <p className="text-center py-16 text-res-text-muted text-sm">Ничего не найдено</p>
            )}

            {filtered.map((item) => {
              const isOpen = expandedId === item.id;
              const isCA = item.region === "ca";

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen
                      ? "border-[#02B779]/60 bg-[#02B779]/[0.08] shadow-[0_4px_24px_rgba(2,183,121,0.18)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/15"
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
                        ? "bg-[#02B779]/25 text-[#AFE552] border border-[#02B779]/40"
                        : "bg-cyan-500/25 text-cyan-300 border border-cyan-500/40"
                    }`}>
                      {isCA ? "ЦА" : "МИР"}
                    </span>

                    {/* title + meta */}
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-bold text-[17px] sm:text-lg leading-snug transition-colors ${
                        isOpen ? "text-white line-clamp-none mb-3" : "text-white/90 group-hover:text-white line-clamp-2"
                      }`}>
                        {item.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-2.5 text-[13px] text-res-text-muted">
                        <span className="font-bold text-[#AFE552]/90">{item.source}</span>
                        <span className="font-mono text-[12px]">{item.dateFormatted}</span>
                        {item.location && (
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin size={13} className="text-[#02B779]" />
                            <span>{item.location.name}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* chevron */}
                    <ChevronDown
                      size={22}
                      className={`shrink-0 mt-2 text-res-text-muted transition-transform duration-200 ${
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
                          <div className="inline-flex items-center gap-2 text-[15px] font-mono text-[#E0EAB8] px-4 py-2 rounded-full bg-white/5 border border-white/10">
                            <MapPin size={16} className="text-[#02B779]" />
                            {item.location.name}, {item.location.country}
                          </div>
                        )}

                        {/* Full summary text — much larger */}
                        <p className="text-base sm:text-[17px] leading-[1.8] text-[#EDF7EE]/90">
                          {item.summary}
                        </p>

                        {/* Read time */}
                        {item.readTime && (
                          <p className="text-[13px] text-res-text-muted font-mono">
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
                              className="inline-flex items-center gap-2.5 text-[15px] font-bold text-[#061E14] bg-gradient-to-r from-[#AFE552] to-[#02B779] px-7 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(2,183,121,0.3)]"
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
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-[#02B779]/60 shadow-[0_0_20px_rgba(2,183,121,0.3)] backdrop-blur-xl">
                <span className="w-2.5 h-2.5 rounded-full bg-[#AFE552] animate-pulse" />
                <span className="text-sm font-mono font-bold text-white">
                  📍 {expandedItem.location.name}, {expandedItem.location.country}
                </span>
              </div>
            ) : (
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#AFE552] mt-2 sm:mt-0 px-3 py-1 rounded-full bg-[#AFE552]/10 border border-[#AFE552]/20 shadow-[0_0_15px_rgba(175,229,82,0.15)]">
                Live News Feed · 50 материалов (25 ЦА / 25 Мир)
              </span>
            )}
          </div>

          <Globe
            className="w-full max-w-[500px] aspect-square"
            focusLocation={globeTarget}
            markerConfig={globeMarkers}
            dots={{ color: "#ffffff", size: 5, density: 4, allDots: false }}
            detail={8}
            showOutline={false}
          />

          <p className="absolute bottom-4 text-center text-xs text-[#A1BB94]">
            Глобус вращается к месту событий · Можно тянуть мышкой
          </p>
        </div>
      </div>
    </div>
  );
}
