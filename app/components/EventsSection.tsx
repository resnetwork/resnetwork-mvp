"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, MapPin, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { EVENTS } from "../data/events";

const PAGE_SIZE = 4;

export default function EventsSection() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [dbEvents, setDbEvents] = useState<any[]>([]);

  useEffect(() => {
    import("@/app/actions/events").then(({ getPublicEvents }) => {
      getPublicEvents().then(events => {
        // Map DB events to match the UI structure
        const mapped = events.map(e => ({
          slug: e.id,
          title: e.title,
          summary: e.description || "Без описания",
          date: new Date(e.date).toLocaleDateString(),
          location: e.location || "Онлайн",
          image: e.imageUrl || "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
          category: e.creatorCompany?.name || "Событие"
        }));
        
        // Combine DB events with hardcoded events for now (to not leave the page empty)
        setDbEvents([...mapped, ...EVENTS]);
      });
    });
  }, []);

  const totalPages = Math.ceil(dbEvents.length / PAGE_SIZE);
  const pageItems = dbEvents.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full" ref={ref}>
      {/* Сетка карточек событий */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pageItems.map((event, i) => {
          const cardStyle = {
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
          };

          return (
            <a
              key={event.slug}
              href={`/events/${event.slug}`}
              target="_blank"
              rel="noreferrer"
              className="group relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-b from-[#063325]/75 to-[#041a13]/90 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1.5 hover:border-emerald-400/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col justify-between"
              style={cardStyle}
            >
              {/* Верхняя часть с изображением и бейджами */}
              <div>
                <div className="relative overflow-hidden h-52">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.opacity = "0";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041a13] via-black/20 to-transparent" />

                  {/* Бейдж категории */}
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/70 border border-emerald-400/30 text-emerald-300 backdrop-blur-md">
                    {event.category}
                  </span>
                </div>

                <div className="p-7">
                  <h3 className="text-xl md:text-2xl font-bold text-[#f2ede2] leading-snug group-hover:text-emerald-300 transition-colors">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#9fb7a8] line-clamp-2 font-normal">
                    {event.summary}
                  </p>
                </div>
              </div>

              {/* Нижняя часть с датой, локацией и ссылкой */}
              <div className="px-7 pb-7 pt-2">
                <div className="space-y-2 text-xs md:text-sm font-medium text-emerald-200/80 mb-6">
                  <p className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-emerald-400 shrink-0" />
                    <span>{event.date}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={15} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-emerald-500/15 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span>Открыть событие</span>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-black transition-all">
                    <ArrowUpRight size={14} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Пагинация */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={goPrev}
            aria-label="Предыдущие события"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-emerald-500/30 bg-emerald-950/40 text-emerald-200 hover:text-white hover:bg-emerald-900 hover:border-emerald-400 transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className="rounded-full transition-all cursor-pointer"
                style={
                  page === i
                    ? { width: "24px", height: "8px", backgroundColor: "#22c55e" }
                    : { width: "8px", height: "8px", backgroundColor: "rgba(34, 197, 94, 0.25)" }
                }
              />
            ))}
          </div>
          <button
            onClick={goNext}
            aria-label="Следующие события"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-emerald-500/30 bg-emerald-950/40 text-emerald-200 hover:text-white hover:bg-emerald-900 hover:border-emerald-400 transition-all hover:scale-105 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}