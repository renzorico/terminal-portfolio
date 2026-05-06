"use client";

import { useState, useEffect } from "react";

const BOOT_LINES = [
  { text: "BIOS v3.2.1 — initializing...", delay: 0 },
  { text: "loading kernel modules ........... ok", delay: 200 },
  { text: "mounting /dev/portfolio .......... ok", delay: 500 },
  { text: "checking dependencies ........... ok", delay: 750 },
  { text: "python 3.12 ..................... found", delay: 950 },
  { text: "node 25.x ...................... found", delay: 1100 },
  { text: "connecting to github.com/renzorico ... ok", delay: 1300 },
  { text: "", delay: 1500 },
  { text: "welcome to renzo.rico v2.0.1", delay: 1600, color: "var(--green-bright)" },
  { text: "type 'help' for commands.", delay: 1750, color: "var(--fg-1)" },
];

const TOTAL_DURATION = 2200;

export default function BootSequence({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Skip boot if user has seen it this session
    if (sessionStorage.getItem("booted")) {
      setBooted(true);
      return;
    }

    // Reveal lines one by one
    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    // Fade out then show page
    setTimeout(() => setFadeOut(true), TOTAL_DURATION - 400);
    setTimeout(() => {
      setBooted(true);
      sessionStorage.setItem("booted", "1");
    }, TOTAL_DURATION);
  }, []);

  if (booted) {
    return <>{children}</>;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--bg-0)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 400ms ease-out",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          lineHeight: 1.9,
          color: "var(--fg-2)",
          maxWidth: 520,
          width: "100%",
          padding: "0 24px",
        }}
      >
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{ color: line.color ?? "var(--fg-2)" }}>
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <span
            style={{
              color: "var(--green-bright)",
              animation: "blink 1s step-end infinite",
            }}
          >
            {"\u2588"}
          </span>
        )}
      </div>
    </div>
  );
}
