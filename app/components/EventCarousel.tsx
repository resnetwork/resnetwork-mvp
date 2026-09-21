"use client";

import { useState } from "react";
import { ArrowUpRight, Calendar, MapPin, X, QrCode } from "lucide-react";
import { registerForEvent } from "@/app/lib/actions";
import { formatEventDateRange } from "@/app/utils/dateFormatter";
import { QRCodeSVG } from "qrcode.react";

export default function EventCarousel({ initialEvents, userId }: { initialEvents: any[], userId?: string }) {
  const [events, setEvents] = useState(initialEvents);
  const [activeId, setActiveId] = useState(initialEvents[0]?.id || null);
  const [modalEventId, setModalEventId] = useState<string | null>(null);
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
                ${isActive ? 'opacity-100 pointer-events-auto md:opacity-100 md:pointer-events-auto' : 'opacity-100 pointer-events-auto md:opacity-0 md:pointer-events-none'}
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
                      {formatEventDateRange(new Date(event.date), event.endDate ? new Date(event.endDate) : null)}
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

                <div className="mt-3 md:mt-4 space-y-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalEventId(event.id);
                    }}
                    className="w-full py-3 rounded-xl font-bold text-xs md:text-sm text-emerald-300 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-500/30 transition-colors flex items-center justify-center gap-2"
                  >
                    Подробнее
                  </button>

                  {hasTicket ? (
                    <button disabled className="w-full py-3 rounded-xl font-bold text-xs md:text-sm text-white bg-white/10 backdrop-blur-sm border border-white/20 cursor-not-allowed">
                      Вы уже участник
                    </button>
                  ) : (
                    <button 
                      onClick={(e) => handleRegister(event.id, e)}
                      disabled={loadingEventId === event.id || !userId}
                      className="w-full py-3 rounded-xl font-bold text-xs md:text-sm text-black bg-emerald-500 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Модальное окно события */}
      {modalEventId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setModalEventId(null)}
          />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#06241a] rounded-3xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Кнопка закрытия */}
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setModalEventId(null)}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>

            {(() => {
              const event = events.find(e => e.id === modalEventId);
              if (!event) return null;
              const hasTicket = event.tickets && event.tickets.length > 0;

              return (
                <div className="overflow-y-auto custom-scrollbar flex-1 flex flex-col md:flex-row">
                  {/* Левая колонка с картинкой (на мобильных сверху) */}
                  <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 relative">
                    {event.imageUrl ? (
                      <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 flex items-center justify-center border-r border-emerald-500/20">
                        <Calendar size={64} className="text-emerald-500/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#06241a] via-[#06241a]/40 to-transparent" />
                  </div>

                  {/* Правая колонка с контентом */}
                  <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col min-h-max">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 w-fit mb-4">
                      {event.isPublic ? "Открытое событие" : "Закрытый клуб"}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                      {event.title}
                    </h2>

                    {/* Дата и Локация */}
                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-emerald-500/80 font-bold block">Дата</span>
                          <span className="text-base font-semibold text-[#f2ede2]">
                            {formatEventDateRange(new Date(event.date), event.endDate ? new Date(event.endDate) : null)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-emerald-500/80 font-bold block">Локация</span>
                          <span className="text-base font-semibold text-[#f2ede2]">{event.location || "Онлайн"}</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Код 2GIS */}
                    {event.twoGisUrl && (
                      <div className="mb-8 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 flex flex-col sm:flex-row items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shrink-0">
                          <QRCodeSVG value={event.twoGisUrl} size={80} />
                        </div>
                        <div className="text-center sm:text-left">
                          <h3 className="text-sm font-bold text-emerald-300 mb-1 flex items-center justify-center sm:justify-start gap-1.5">
                            <QrCode size={16} />
                            Маршрут в 2GIS
                          </h3>
                          <p className="text-emerald-100/60 text-xs mb-2">
                            Отсканируйте код для прокладки маршрута.
                          </p>
                          <a href={event.twoGisUrl} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 hover:underline">
                            Или нажмите здесь
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Описание */}
                    <div className="text-emerald-100/80 text-sm md:text-base leading-relaxed space-y-4 mb-8">
                      {(event.description || "Без описания")
                        .split('\n')
                        .filter((p: string) => p.trim() !== '')
                        .map((p: string, i: number) => (
                          <p key={i}>{p}</p>
                        ))
                      }
                    </div>

                    {/* Кнопка регистрации внизу */}
                    <div className="mt-auto pt-6 border-t border-emerald-500/20">
                      {hasTicket ? (
                        <button disabled className="w-full py-4 rounded-xl font-bold text-sm text-emerald-100 bg-emerald-900/40 border border-emerald-500/30 cursor-not-allowed flex items-center justify-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          Вы уже участник события
                        </button>
                      ) : (
                        <button 
                          onClick={(e) => handleRegister(event.id, e)}
                          disabled={loadingEventId === event.id || !userId}
                          className="w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest text-black bg-emerald-500 hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingEventId === event.id ? (
                            "Оформление..."
                          ) : (
                            <>
                              <span>Получить билет</span>
                              <ArrowUpRight size={18} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
