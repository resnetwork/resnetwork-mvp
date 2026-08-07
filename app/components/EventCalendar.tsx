"use client";
import { useRef, useState } from "react";

const MONTHS = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const WEEKDAYS = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

function generateDays(count: number) {
  const days = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push(d);
  }
  return days;
}

export default function EventCalendar() {
  const days = generateDays(60);
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

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
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={stopDragging}
      onMouseLeave={stopDragging}
      style={{ overflowX: "auto", overflowY: "hidden", scrollbarWidth: "none", msOverflowStyle: "none" }}
      className="flex gap-2 pb-1 cursor-grab active:cursor-grabbing select-none max-w-full [&::-webkit-scrollbar]:hidden"
    >
      {days.map((d, i) => {
        const isNewMonth = i === 0 || d.getDate() === 1;
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, height: "84px" }}>
            <div style={{ fontSize: "12px", color: "#5B6B62", height: "16px", lineHeight: "16px" }}>
              {isNewMonth ? MONTHS[d.getMonth()] : "\u00A0"}
            </div>
            <button
              onClick={() => setSelected(i)}
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "8px",
                borderWidth: "1px",
                borderStyle: "solid",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "4px",
                backgroundColor: selected === i ? "#2E8656" : "#FFFFFF",
                borderColor: selected === i ? "#2E8656" : "#E2E8E0",
                color: selected === i ? "#FFFFFF" : "#0F2A22",
              }}
            >
              <span style={{ fontSize: "14px", opacity: 0.7 }}>{WEEKDAYS[d.getDay()]}</span>
              <span style={{ fontWeight: 700, fontSize: "18px" }}>{d.getDate()}</span>
            </button>
          </div>
        );
      })}
    </div>
  );
}