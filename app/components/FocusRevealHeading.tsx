"use client";

import { useEffect, useRef, useState } from "react";

export interface HeadingToken {
  text: string;
  isAccent?: boolean;
  isNoWrap?: boolean;
}

interface FocusRevealHeadingProps {
  tokens?: HeadingToken[];
  text?: string;
  className?: string;
  align?: "left" | "center" | "right";
  as?: "h1" | "h2" | "h3";
}

export default function FocusRevealHeading({
  tokens,
  text,
  className = "text-3xl md:text-5xl font-bold tracking-tight text-[#f2ede2]",
  align = "left",
  as: Component = "h2",
}: FocusRevealHeadingProps) {
  const [isVisible, setIsVisible] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.2 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Если передан простой текст вместо массива токенов, разобьем его по словам
  const items: HeadingToken[] = tokens
    ? tokens
    : (text || "").split(" ").map((w) => ({ text: w, isAccent: false, isNoWrap: false }));

  const justifyClass =
    align === "center"
      ? "justify-center text-center mx-auto"
      : align === "right"
      ? "justify-end text-right ml-auto"
      : "justify-start text-left";

  return (
    <Component
      ref={headingRef}
      className={`${className} flex flex-wrap items-center ${justifyClass} gap-x-3 gap-y-1.5 select-none`}
    >
      {items.map((token, index) => (
        <span
          key={`${token.text}-${index}`}
          className={`inline-block transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            token.isNoWrap ? "whitespace-nowrap" : ""
          } ${
            token.isAccent
              ? "text-emerald-400 font-extrabold drop-shadow-[0_0_20px_rgba(74,222,128,0.45)]"
              : ""
          }`}
          style={{
            filter: isVisible ? "blur(0px)" : "blur(14px)",
            opacity: isVisible ? 1 : 0,
            transform: isVisible
              ? "translateY(0) scale(1)"
              : "translateY(14px) scale(0.93)",
            transitionDelay: `${index * 110 + 40}ms`,
          }}
        >
          {token.text}
        </span>
      ))}
    </Component>
  );
}
