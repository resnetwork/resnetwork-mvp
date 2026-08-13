"use client";
import { useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const numMatch = value.match(/[\d\s]+/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseInt(numMatch[0].replace(/\s/g, ""), 10);
    const suffix = value.replace(numMatch[0], "");

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !done.current) {
        done.current = true;
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(current.toLocaleString("ru-RU") + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.4 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{display}</div>;
}