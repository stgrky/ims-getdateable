"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  /** ms per character */
  speed?: number;
  /** delay before typing starts (ms) */
  startDelay?: number;
  /** show the blinking caret */
  caret?: boolean;
  /** keep the caret blinking after typing completes */
  caretAfter?: boolean;
};

/**
 * Kit-native typewriter. Types `text` character by character once the element
 * scrolls into view.
 *
 * Craft details the npm packages skip:
 * - prefers-reduced-motion renders the full text immediately (no animation)
 * - an invisible copy of the full text reserves the final layout up front,
 *   so nothing reflows while typing
 * - the caret is framer-motion, no CSS keyframes needed
 */
export function Typewriter({
  text,
  className,
  speed = 45,
  startDelay = 350,
  caret = true,
  caretAfter = false,
}: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);
  const done = count >= text.length;

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;
    const kickoff = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, startDelay);
    return () => {
      clearTimeout(kickoff);
      if (interval) clearInterval(interval);
    };
  }, [reduceMotion, inView, text, speed, startDelay]);

  if (reduceMotion) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ""}`}>
      {/* Invisible full text reserves the final size — zero layout shift */}
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span className="absolute inset-0" aria-label={text}>
        <span aria-hidden>{text.slice(0, count)}</span>
        {caret && (!done || caretAfter) ? (
          <motion.span
            aria-hidden
            className="ml-[0.04em] inline-block h-[0.9em] w-[3px] translate-y-[0.12em] rounded-sm"
            style={{ background: "var(--color-accent)" }}
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 0.9, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          />
        ) : null}
      </span>
    </span>
  );
}
