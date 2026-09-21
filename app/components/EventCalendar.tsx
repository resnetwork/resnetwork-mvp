import React, { useRef, useState, useEffect } from "react";

const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];
const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function generateDays(count: number) {
  const days = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); 
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function EventCalendar({ 
  selectedDate, 
  onSelectDate,
  selectedMonth,
  onSelectMonth
}: { 
  selectedDate?: Date | null, 
  onSelectDate?: (date: Date | null) => void,
  selectedMonth?: number | null,
  onSelectMonth?: (month: number | null) => void
}) {
  const days = generateDays(90); 
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const isSameDay = (d1: Date | null | undefined, d2: Date) => {
    if (!d1) return false;
    return d1.getDate() === d2.getDate() && 
           d1.getMonth() === d2.getMonth() && 
           d1.getFullYear() === d2.getFullYear();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const dx = e.pageX - startX.current;
    scrollRef.current.scrollLeft = scrollLeft.current - dx;
  };

  const stopDragging = () => {
    isDragging.current = false;
  };

  return (
    <div className="relative w-full">
      {/* Мягкие градиенты по краям для плавного исчезновения */}
      <div className="absolute left-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-r from-[#03150e] to-transparent z-10 pointer-events-none rounded-l-3xl" />
      <div className="absolute right-0 top-0 bottom-0 w-10 md:w-20 bg-gradient-to-l from-[#03150e] to-transparent z-10 pointer-events-none rounded-r-3xl" />

      <div
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        style={{ overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex gap-2 px-6 md:px-10 pb-2 pt-6 cursor-grab active:cursor-grabbing select-none max-w-full [&::-webkit-scrollbar]:hidden relative"
      >

        {days.map((d, i) => {
          const isNewMonth = i === 0 || d.getDate() === 1;
          const isSelected = isSameDay(selectedDate, d);
          const isToday = isSameDay(new Date(), d);

          return (
            <React.Fragment key={i}>
              {/* Явный разделитель месяцев в виде капсулы */}
              {isNewMonth && (
                <div className={`flex items-center shrink-0 ${i === 0 ? 'mr-2' : 'ml-4 mr-2'}`}>
                  <button 
                    onClick={() => {
                      if (onSelectMonth) {
                        onSelectMonth(selectedMonth === d.getMonth() ? null : d.getMonth());
                      }
                    }}
                    className={`flex items-center justify-center border rounded-full px-5 py-2 backdrop-blur-md transition-all cursor-pointer ${
                      selectedMonth === d.getMonth()
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 border-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-105'
                        : 'bg-gradient-to-r from-[#0a2e1d] to-[#06241a] border-emerald-500/30 hover:border-emerald-500/60 hover:scale-105 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    }`}
                  >
                    <span className={`text-[10px] md:text-xs font-black uppercase tracking-[0.3em] whitespace-nowrap drop-shadow-md transition-colors ${
                      selectedMonth === d.getMonth() ? 'text-[#06241a]' : 'text-emerald-400'
                    }`}>
                      {MONTHS[d.getMonth()]}
                    </span>
                  </button>
                </div>
              )}

              <div className="flex flex-col items-center shrink-0 relative z-10 group/item">
                <button
                  onClick={() => {
                    if (isSelected && onSelectDate) {
                      onSelectDate(null); 
                    } else if (onSelectDate) {
                      onSelectDate(d);
                    }
                  }}
                  className={`w-[48px] md:w-[56px] h-[64px] md:h-[72px] rounded-xl flex flex-col items-center justify-center transition-all duration-300 ease-out relative overflow-hidden backdrop-blur-md ${
                    isSelected 
                      ? 'bg-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.4)] scale-110 z-20 border border-emerald-300' 
                      : isToday
                        ? 'bg-[#0a2e1d] border-2 border-[#02b779] shadow-[inset_0_0_15px_rgba(2,183,121,0.2)] hover:bg-[#0c3a25] hover:scale-105'
                        : 'bg-[#06241a]/60 border border-emerald-500/20 hover:border-emerald-500/60 hover:bg-[#0a2e1d] hover:scale-105'
                  }`}
                >
                  {/* Внутренний блик для активной даты */}
                  {isSelected && <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-60" />}
                  {isToday && !isSelected && <div className="absolute inset-0 bg-gradient-to-b from-[#02b779]/10 to-transparent" />}
                  
                  <span className={`relative z-10 text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-0.5 transition-colors ${
                    isSelected 
                      ? 'text-emerald-950' 
                      : isToday
                        ? 'text-[#02b779]'
                        : 'text-emerald-500/60 group-hover/item:text-emerald-400'
                  }`}>
                    {WEEKDAYS[d.getDay()]}
                  </span>
                  
                  <span className={`relative z-10 font-black text-xl md:text-2xl leading-none tracking-tighter ${
                    isSelected 
                      ? 'text-black' 
                      : isToday
                        ? 'bg-clip-text text-transparent bg-gradient-to-r from-[#4ade80] to-[#02b779]'
                        : 'text-white/90 group-hover/item:text-white'
                  }`}>
                    {d.getDate()}
                  </span>
                </button>
                
                {/* Точка под сегодняшней датой */}
                {isToday && !isSelected && (
                  <div className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-[#02b779] shadow-[0_0_8px_rgba(2,183,121,0.8)]" />
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}