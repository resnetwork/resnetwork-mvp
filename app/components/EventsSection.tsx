"use client";
import { useEffect, useRef, useState } from "react";
import { CalendarDays, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { EVENTS } from "../data/events";

const PAGE_SIZE = 4;

export default function EventsSection() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const totalPages = Math.ceil(EVENTS.length / PAGE_SIZE);
  const pageItems = EVENTS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goPrev = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));
  const goNext = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {pageItems.map((event, i) => {
          const cardStyle = {
            boxShadow: "0 10px 30px rgba(6,29,61,.08)",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s, box-shadow 0.3s ease`,
          };
          return (
            <a key={event.slug} href={`/events/${event.slug}`} target="_blank" rel="noreferrer" className="group overflow-hidden rounded-2xl bg-white hover:-translate-y-2 hover:shadow-2xl" style={cardStyle}>
              <div className="relative overflow-hidden h-44">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                />
              </div>
              <div className="p-7">
                <span className="text-xs font-extrabold tracking-wide" style={{ color: "#318455" }}>{event.category.toUpperCase()}</span>
                <h3 className="mt-3 text-2xl font-bold" style={{ color: "#061D3D" }}>{event.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#52606F" }}>{event.summary}</p>
                <div className="mt-5 space-y-2 text-sm font-semibold" style={{ color: "#245E42" }}>
                  <p className="flex gap-2"><CalendarDays size={16}/>{event.date}</p>
                  <p className="flex gap-2"><MapPin size={16}/>{event.location}</p>
                </div>
                <span className="mt-5 inline-block text-sm font-bold group-hover:underline" style={{ color: "#245E42" }}>Открыть страницу события ↗</span>
              </div>
            </a>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-10">
          <button onClick={goPrev} aria-label="Предыдущие события" className="w-12 h-12 rounded-full flex items-center justify-center bg-white transition-transform hover:scale-105" style={{ boxShadow: "0 8px 24px rgba(6,29,61,0.12)" }}>
            <ChevronLeft size={22} color="#061D3D" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)} className="rounded-full transition-all" style={page === i ? { width: "24px", height: "8px", backgroundColor: "#318455" } : { width: "8px", height: "8px", backgroundColor: "#D6E0E8" }} />
            ))}
          </div>
          <button onClick={goNext} aria-label="Следующие события" className="w-12 h-12 rounded-full flex items-center justify-center bg-white transition-transform hover:scale-105" style={{ boxShadow: "0 8px 24px rgba(6,29,61,0.12)" }}>
            <ChevronRight size={22} color="#061D3D" />
          </button>
        </div>
      )}
    </div>
  );
}