"use client";

import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin } from "lucide-react";
import { registerForEvent } from "@/app/lib/actions";

export default function EventCarousel({ initialEvents, userId }: { initialEvents: any[], userId?: string }) {
  const [events, setEvents] = useState(initialEvents);
  const [activeId, setActiveId] = useState(initialEvents[0]?.id || null);
  const [loadingEventId, setLoadingEventId] = useState<string | null>(null);

  const handleRegister = async (eventId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Не переключаем карточку при клике на кнопку
    if (!userId) return;

    setLoadingEventId(eventId);
    const result = await registerForEvent(eventId, userId);
    if (result.success) {
      setEvents(events.map(ev => 
        ev.id === eventId 
          ? { ...ev, tickets: [{ id: "temp" }] }
          : ev
      ));
    }
    setLoadingEventId(null);
  };

  if (!events || events.length === 0) {
    return <div className="text-emerald-500/50">Нет предстоящих событий.</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[600px] w-full max-w-6xl mx-auto">
      {events.map((event, i) => {
        const isActive = activeId === event.id;
        const hasTicket = event.tickets && event.tickets.length > 0;
        
        // Генерируем разные оттенки градиентов для красивого эффекта на фоне
        const gradients = [
          "from-emerald-900/60 to-emerald-950/80",
          "from-[#081f16]/60 to-[#03100a]/80",
          "from-[#0a2e1d]/60 to-[#051810]/80",
          "from-emerald-800/60 to-emerald-950/80"
        ];
        const gradient = gradients[i % gradients.length];

        return (
          <div
            key={event.id}
            onClick={() => setActiveId(event.id)}
            className={`
              relative overflow-hidden cursor-pointer rounded-3xl
              transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
              w-full h-auto min-h-[350px] md:h-full
              ${isActive ? 'md:w-[450px]' : 'md:w-[100px] md:hover:w-[120px]'}
              bg-gradient-to-b ${gradient} border border-white/5 shadow-lg
            `}
          >
            {/* Отрисовка фона: если есть картинка, показываем её, иначе градиент */}
            {event.imageUrl ? (
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out md:hover:scale-110"
                style={{ backgroundImage: `url(${event.imageUrl})` }}
              />
            ) : null}

            {/* Overlay Gradient for depth */}
            <div className={`absolute inset-0 ${event.imageUrl ? 'bg-black/40 bg-gradient-to-t from-black/90 via-black/40 to-transparent' : 'bg-black/20'}`} />

            {/* Контент карточки (Всегда виден на мобильных, скрывается/показывается на ПК) */}
            <div 
              className={`
                absolute inset-0 p-6 md:p-8 flex flex-col justify-between
                transition-opacity duration-500 delay-100
                opacity-100 pointer-events-auto
                md:${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}
              `}
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {event.isPublic ? "Открытое событие" : "Закрытый клуб"}
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                  {event.title}
                </h3>
              </div>

              <div className="space-y-4 md:space-y-5 bg-black/50 md:bg-black/40 backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/10 mt-auto md:mt-0">
                <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-emerald-100/80">
                  <div className="flex items-center gap-2 md:gap-3">
                    <Calendar size={16} className="text-emerald-400 shrink-0" />
                    <span>
                      {new Intl.DateTimeFormat('ru-RU', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      }).format(new Date(event.date))}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 md:gap-3">
                    <MapPin size={16} className="text-emerald-400 shrink-0" />
                    <span className="truncate">{event.location || "Онлайн"}</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-white/70 line-clamp-2 md:line-clamp-none">
                  {event.description}
                </p>

                {hasTicket ? (
                  <button disabled className="w-full mt-3 md:mt-4 py-3 rounded-xl font-bold text-xs md:text-sm text-white bg-white/10 backdrop-blur-sm border border-white/20 cursor-not-allowed">
                    Вы уже участник
                  </button>
                ) : (
                  <button 
                    onClick={(e) => handleRegister(event.id, e)}
                    disabled={loadingEventId === event.id || !userId}
                    className="w-full mt-3 md:mt-4 py-3 rounded-xl font-bold text-xs md:text-sm text-black bg-emerald-500 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loadingEventId === event.id ? (
                      "Оформление..."
                    ) : (
                      <>
                        <span>Получить билет</span>
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Неактивное состояние (повернутый текст на ПК) */}
            <div 
              className={`
                hidden md:flex absolute inset-0 items-end pb-8 justify-center
                transition-opacity duration-500
                ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}
              `}
            >
              <h3 
                className="text-xl font-bold text-white/90 whitespace-nowrap tracking-wide"
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {event.title}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
