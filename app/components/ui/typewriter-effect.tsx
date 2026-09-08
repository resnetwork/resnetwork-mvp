"use client";

import { cn } from "@/app/lib/utils";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });
  const [currentIndex, setCurrentIndex] = useState(0);

  let globalIndex = 0;
  const wordsArray = words.map((word) => {
    return {
      ...word,
      chars: word.text.split("").map((char) => {
        return { char, index: globalIndex++ };
      }),
    };
  });

  const totalChars = globalIndex;
  const speed = 70; // Замедлил скорость с ~50 до 70мс

  useEffect(() => {
    if (!isInView) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex < totalChars) {
      const timeout = setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isInView, totalChars]);

  return (
    <div ref={ref} className={cn("font-black leading-[1.16] tracking-tight", className)}>
      {currentIndex === 0 && (
        <span className="relative">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            className={cn("absolute left-0 top-1/2 -translate-y-1/2 rounded-sm w-[4px] bg-res-accent", cursorClassName)}
          />
        </span>
      )}

      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block mr-[0.25em]">
          {word.chars.map((c) => {
            const isVisible = c.index < currentIndex;
            const isCursorHere = c.index === currentIndex - 1;

            return (
              <span key={`char-${c.index}`} className="relative inline-block">
                <span
                  className={cn(
                    "text-black dark:text-white transition-opacity duration-75",
                    word.className,
                    isVisible ? "opacity-100" : "opacity-0"
                  )}
                >
                  {c.char}
                </span>
                {isCursorHere && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                    className={cn(
                      "absolute -right-[4px] top-1/2 -translate-y-1/2 rounded-sm w-[4px] bg-res-accent",
                      cursorClassName
                    )}
                  />
                )}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
