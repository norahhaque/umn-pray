"use client";

import { useState, useEffect } from "react";

const WORDS = ["PRAY", "REFLECT", "WORSHIP"];
const TYPE_SPEED = 95;
const ERASE_SPEED = 55;
const PAUSE_AFTER = 1800;
const PAUSE_BEFORE = 300;

export default function HeroTyping() {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("PRAY");
  const [phase, setPhase] = useState<"pausing" | "erasing" | "typing">(
    "pausing",
  );

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length === 0) {
        const next = (wordIndex + 1) % WORDS.length;
        const t = setTimeout(() => {
          setWordIndex(next);
          setPhase("typing");
        }, PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed((d) => d.slice(0, -1)),
        ERASE_SPEED,
      );
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (displayed.length === word.length) {
        setPhase("pausing");
        return;
      }
      const t = setTimeout(
        () => setDisplayed(word.slice(0, displayed.length + 1)),
        TYPE_SPEED,
      );
      return () => clearTimeout(t);
    }
  }, [phase, displayed, wordIndex]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse opacity-60">|</span>
    </span>
  );
}
