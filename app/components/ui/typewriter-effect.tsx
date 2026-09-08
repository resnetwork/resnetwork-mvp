"use client";

import { cn } from "@/app/lib/utils";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

  let globalIndex = 0;
  const wordsArray = words.map((word) => {
    return {
      ...word,
      chars: word.text.split("").map((char) => {
        return { char, index: globalIndex++ };
      }),
    };
  });

  return (
    <div ref={ref} className={cn("font-black leading-[1.16] tracking-tight", className)}>
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block mr-[0.25em]">
          {word.chars.map((c) => (
            <motion.span
              key={`char-${c.index}`}
              initial={{ display: "none", opacity: 0 }}
              animate={isInView ? { display: "inline", opacity: 1 } : { display: "none", opacity: 0 }}
              transition={{
                duration: 0.01,
                delay: isInView ? c.index * 0.05 : 0,
              }}
              className={cn("text-black dark:text-white", word.className)}
            >
              {c.char}
            </motion.span>
          ))}
        </div>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className={cn("inline-block rounded-sm w-[4px] bg-res-accent h-[1em] align-middle ml-1", cursorClassName)}
      />
    </div>
  );
};
