"use client";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(Math.max(scrolled, 0), 1) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50" style={{ height: "3px", backgroundColor: "rgba(255,255,255,0.1)" }}>
      <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg, #B8D97A, #2E8656)", transition: "width 0.1s linear" }} />
    </div>
  );
}