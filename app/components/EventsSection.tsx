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
    <div className="relative w-full overflow-hidden" ref={ref}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-2">
          <button
            onClick={() => {
              const el = document.getElementById('events-scroll-container');
              if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-res-accent/30 bg-res-panel text-res-accent-light hover:text-[#061e14] hover:bg-res-accent hover:border-res-accent transition-all cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('events-scroll-container');
              if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
            }}
            className="w-10 h-10 rounded-full flex items-center justify-center border border-res-accent/30 bg-res-panel text-res-accent-light hover:text-[#061e14] hover:bg-res-accent hover:border-res-accent transition-all cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Горизонтальный скролл */}
      <div 
        id="events-scroll-container"
        className="flex gap-4 md:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar"
        style={{ scrollBehavior: 'smooth' }}
      >
        {dbEvents.map((event, i) => {
          // Parse date for visual display
          let month = "---";
          let day = "--";
          const dateObj = new Date(event.date);
          if (!isNaN(dateObj.getTime())) {
            month = dateObj.toLocaleDateString('ru-RU', { month: 'long' }).replace('.', '').toUpperCase();
            day = dateObj.getDate().toString().padStart(2, '0');
          } else {
            // "20-22 мая 2026"
            const parts = event.date.split(" ");
            if (parts.length >= 2) {
              day = parts[0];
              const monthRaw = parts[1].toLowerCase().replace(',', '');
              const MONTH_MAP: Record<string, string> = {
                "янв": "ЯНВАРЬ", "января": "ЯНВАРЬ",
                "фев": "ФЕВРАЛЬ", "февраля": "ФЕВРАЛЬ",
                "мар": "МАРТ", "марта": "МАРТ",
                "апр": "АПРЕЛЬ", "апреля": "АПРЕЛЬ",
                "май": "МАЙ", "мая": "МАЙ",
                "июн": "ИЮНЬ", "июня": "ИЮНЬ",
                "июл": "ИЮЛЬ", "июля": "ИЮЛЬ",
                "авг": "АВГУСТ", "августа": "АВГУСТ",
                "сен": "СЕНТЯБРЬ", "сентября": "СЕНТЯБРЬ",
                "окт": "ОКТЯБРЬ", "октября": "ОКТЯБРЬ",
                "ноя": "НОЯБРЬ", "ноября": "НОЯБРЬ",
                "дек": "ДЕКАБРЬ", "декабря": "ДЕКАБРЬ",
              };
              month = MONTH_MAP[monthRaw] || monthRaw.toUpperCase();
            } else {
              day = event.date.substring(0, 2);
              month = "СЕЙЧАС";
            }
          }

          return (
            <a
              key={event.slug + i}
              href={`/events/${event.slug}`}
              target="_blank"
              rel="noreferrer"
              className="snap-start shrink-0 group relative overflow-hidden rounded-3xl border border-[#A1BB94]/20 bg-[#14281E] transition-all duration-300 hover:-translate-y-2 hover:border-[#02B779] hover:shadow-[0_15px_40px_rgba(2,183,121,0.25)] flex flex-col w-[270px] md:w-[320px] h-[450px]"
            >
              {/* Верхняя половина с картинкой */}
              <div className="relative h-1/2 overflow-hidden w-full">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-85 group-hover:opacity-100"
                  onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14281E] via-transparent to-transparent" />
              </div>

              {/* Нижняя половина с инфой */}
              <div className="p-6 flex flex-col flex-1">
                <div className="mb-3 font-black tracking-widest text-lg md:text-xl flex flex-col leading-none">
                  <span className="text-xs uppercase font-mono text-[#A1BB94]">{month}</span>
                  <span className="text-3xl text-[#E0EAB8] mt-0.5">{day}</span>
                </div>
                
                <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-2 group-hover:text-[#E0EAB8] transition-colors line-clamp-3">
                  {event.title}
                </h3>
                
                <p className="mt-auto flex items-center gap-2 text-xs font-medium text-[#A1BB94]">
                  <MapPin size={14} className="text-[#02B779]" />
                  <span className="truncate">{event.location}</span>
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}