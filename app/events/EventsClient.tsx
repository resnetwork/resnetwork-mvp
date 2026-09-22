"use client";

import { useState, useEffect } from "react";
import EventCalendar from "../components/EventCalendar";
import { formatEventDateRange } from "@/app/utils/dateFormatter";
import { registerForEvent } from "@/app/lib/actions";
import { QRCodeSVG } from "qrcode.react";
import { Calendar, MapPin, X, ArrowRight, Ticket, QrCode } from "lucide-react";

type EventType = any; // We can type this properly later, using any for quick integration from EventCarousel

export default function EventsClient({ initialEvents, userId }: { initialEvents: EventType[], userId: string | null }) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [modalEventId, setModalEventId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const EVENTS_PER_PAGE = 8;

  // Filter events based on selected date
  const filteredEvents = initialEvents.filter(e => {
    // Используем isoDate для надежного парсинга, так как e.date может быть в формате "24 СЕНТЯБРЯ"
    const d = new Date(e.isoDate || e.date);
    
    // Если дата не парсится (например, старые фейковые данные), просто показываем ивент
    if (isNaN(d.getTime())) return true;

    if (selectedDate) {
      return d.getDate() === selectedDate.getDate() && 
             d.getMonth() === selectedDate.getMonth() && 
             d.getFullYear() === selectedDate.getFullYear();
    }
    if (selectedMonth !== null) {
      return d.getMonth() === selectedMonth;
    }
    return true;
  });

  // Сброс страницы при фильтрации
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedDate, selectedMonth]);

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const currentEvents = filteredEvents.slice((currentPage - 1) * EVENTS_PER_PAGE, currentPage * EVENTS_PER_PAGE);

  return (
    <div className="flex flex-col gap-10">
      {/* Календарь-фильтр */}
      <section className="relative w-full mb-4">
        <EventCalendar 
          selectedDate={selectedDate} 
          onSelectDate={(d) => {
            setSelectedDate(d);
            if (d) setSelectedMonth(null);
          }} 
          selectedMonth={selectedMonth}
          onSelectMonth={(m) => {
            setSelectedMonth(m);
            if (m !== null) setSelectedDate(null);
          }}
        />
        {(selectedDate || selectedMonth !== null) && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-emerald-400 font-medium">
              События на {selectedDate 
                ? selectedDate.toLocaleDateString("ru-RU", { day: 'numeric', month: 'long', year: 'numeric' })
                : new Date(new Date().getFullYear(), selectedMonth!).toLocaleDateString("ru-RU", { month: 'long', year: 'numeric' })}
            </p>
            <button 
              onClick={() => {
                setSelectedDate(null);
                setSelectedMonth(null);
              }}
              className="text-xs text-white/50 hover:text-white underline transition-colors"
            >
              Сбросить фильтр
            </button>
          </div>
        )}
      </section>

      {/* Сетка карточек */}
      <section>
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-[#06241a]/20 rounded-3xl border border-emerald-900/20">
            <Calendar size={48} className="text-emerald-500/20 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Событий не найдено</h3>
            <p className="text-emerald-500/60 max-w-sm">
              На выбранную дату пока нет запланированных мероприятий. Попробуйте выбрать другую дату.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentEvents.map((event, i) => {
                if (event.isDummy) {
                  return (
                    <div 
                      key={event.id || event.slug || i} 
                      className="w-full h-[420px] rounded-[2rem] bg-gradient-to-br from-[#0a2e1d]/50 to-[#061811]/50 border border-emerald-900/20 shadow-inner flex flex-col justify-end p-6"
                    >
                      <div className="w-16 h-3 bg-emerald-500/10 rounded-full mb-4" />
                      <div className="w-full h-8 bg-emerald-500/10 rounded-xl mb-3" />
                      <div className="w-2/3 h-8 bg-emerald-500/10 rounded-xl mb-6" />
                      <div className="w-32 h-4 bg-emerald-500/10 rounded-full" />
                    </div>
                  );
                }

                return (
                  <div 
                    key={event.id || event.slug || i}
                    className="group relative w-full h-[420px] rounded-[2rem] overflow-hidden cursor-pointer shadow-2xl bg-[#06241a] flex flex-col"
                    onClick={() => setModalEventId(event.id || event.slug)}
                  >
                    {/* Изображение и градиент */}
                    <div className="absolute inset-0 z-0">
                      {(event.image || event.imageUrl) ? (
                        <img src={event.image || event.imageUrl} alt={event.title} className={`w-full h-full group-hover:scale-110 transition-transform duration-700 ease-in-out ${(event.image || event.imageUrl)?.includes('res-expo-logo') ? 'object-contain p-8 bg-white' : 'object-cover'}`} />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#0a3829] to-[#04150f]" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#06241a]/95 via-[#06241a]/60 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
                    </div>

                    {/* Контент карточки - строгая сетка с одинаковыми уровнями для всех карточек */}
                    <div className="relative z-10 flex-1 flex flex-col justify-end p-6">
                      <div className="transform transition-transform duration-500 translate-y-0 group-hover:-translate-y-2">
                        {/* Дата (строго фиксированная высота) */}
                        <div className="h-8 flex items-center mb-1">
                          <span className="bg-emerald-50 text-emerald-950 px-3 py-0.5 rounded-full font-extrabold text-sm tracking-widest uppercase shadow-md">
                            {event.date}
                          </span>
                        </div>

                        {/* Название (строго фиксированная высота) */}
                        <div className="h-[76px] mb-3 flex items-start overflow-hidden">
                          <h3 className="text-xl font-black text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] line-clamp-3">
                            {event.title}
                          </h3>
                        </div>

                        {/* Формат и локация (строго фиксированная высота для всех карточек) */}
                        <div className="h-[60px] flex flex-col justify-between mb-4">
                          <div className="flex items-center">
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30 text-sm font-bold backdrop-blur-md">
                              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                              {event.format || "Оффлайн"}
                            </span>
                          </div>
                          <div className="h-6 flex items-center text-sm font-medium text-emerald-50 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] truncate">
                            {event.location ? (
                              <div className="flex items-center gap-2 truncate">
                                <MapPin size={16} className="text-emerald-400 shrink-0" />
                                <span className="truncate">{event.location}</span>
                              </div>
                            ) : (
                              <span className="text-emerald-200">Онлайн-мероприятие</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button className="w-full py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 font-bold text-sm backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-black">
                        Подробнее <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Пагинация */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      currentPage === i + 1
                        ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                        : "bg-emerald-950/30 text-emerald-400/70 border border-emerald-900/50 hover:bg-emerald-900/50 hover:text-emerald-400"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Модальное окно (Скопировано из EventCarousel) */}
      {modalEventId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setModalEventId(null)}
          />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#06241a] rounded-3xl border border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-4 right-4 z-10">
              <button 
                onClick={() => setModalEventId(null)}
                className="w-10 h-10 rounded-full bg-black/40 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/50 flex items-center justify-center text-white/70 hover:text-white transition-all backdrop-blur-sm"
              >
                <X size={20} />
              </button>
            </div>

            {(() => {
              const event = initialEvents.find(e => (e.id === modalEventId || e.slug === modalEventId));
              if (!event) return null;

              const descriptionText = event.description || event.summary || "";

              return (
                <div className="overflow-y-auto custom-scrollbar flex-1 flex flex-col md:flex-row">
                  {/* Левая колонка */}
                  <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 relative">
                    {(event.image || event.imageUrl) ? (
                      <img src={event.image || event.imageUrl} alt={event.title} className={`w-full h-full ${(event.image || event.imageUrl)?.includes('res-expo-logo') ? 'object-contain p-8 bg-white' : 'object-cover'}`} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 flex items-center justify-center border-r border-emerald-500/20">
                        <Calendar size={64} className="text-emerald-500/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#06241a] via-[#06241a]/40 to-transparent" />
                  </div>

                  {/* Правая колонка */}
                  <div className="w-full md:w-3/5 p-6 md:p-10 flex flex-col min-h-max">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950/50 border border-emerald-500/30 w-fit mb-4">
                      {event.isPublic ? "Открытое событие" : "Закрытый клуб"}
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-6">
                      {event.title}
                    </h2>

                    <div className="flex flex-col gap-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                          <Calendar size={20} />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-emerald-500/80 font-bold block">Дата</span>
                          <span className="text-base font-semibold text-[#f2ede2]">
                            {event.isoDate ? formatEventDateRange(new Date(event.isoDate), event.endDate ? new Date(event.endDate) : null) : event.date}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                          <MapPin size={20} />
                        </div>
                        <div>
                          <span className="text-[11px] uppercase tracking-wider text-emerald-500/80 font-bold block">Локация</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-xs font-semibold">
                              {event.format || "Оффлайн"}
                            </span>
                            {event.location && (
                              <span className="text-base font-semibold text-[#f2ede2]">{event.location}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {event.twoGisUrl && (
                      <div className="mb-8 p-4 rounded-2xl border border-emerald-500/20 bg-emerald-950/30 flex flex-col sm:flex-row items-center gap-4">
                        <div className="p-2 bg-white rounded-lg shrink-0">
                          <QRCodeSVG value={event.twoGisUrl} size={80} />
                        </div>
                        <div className="text-center sm:text-left">
                          <h4 className="text-sm font-bold text-white mb-1 flex items-center justify-center sm:justify-start gap-1.5">
                            <QrCode size={16} className="text-emerald-400" /> Маршрут до места
                          </h4>
                          <p className="text-xs text-emerald-100/70 mb-3">Отсканируйте QR-код для перехода в Google Карты</p>
                          <a href={event.twoGisUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-bold text-emerald-400 hover:text-emerald-300 transition-colors uppercase tracking-wider hover:underline">
                            <MapPin size={14} /> Открыть карту
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Описание */}
                    <div className="text-emerald-100/90 text-sm md:text-base leading-relaxed space-y-4 mb-8">
                      {descriptionText ? (
                        descriptionText
                          .split(/\n{2,}/)
                          .filter((p: string) => p.trim() !== '')
                          .map((p: string, i: number) => (
                            <p key={i}>{p.replace(/\n/g, ' ')}</p>
                          ))
                      ) : (!event.details || event.details.length === 0) ? (
                        <p className="text-emerald-500/60 italic">Описание отсутствует</p>
                      ) : null}

                      {event.details && event.details.length > 0 && (
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-emerald-100/80 text-sm">
                          {event.details.map((detail: string, idx: number) => (
                            <li key={idx}>{detail}</li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {(event.sourceUrl || event.source) && (
                      <div className="mt-auto pt-6 border-t border-emerald-500/20">
                        <a
                          href={event.sourceUrl || event.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full px-8 py-4 rounded-full font-bold text-base bg-emerald-500 text-black hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                        >
                          Перейти к источнику <ArrowRight size={20} />
                        </a>
                      </div>
                    )}
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
