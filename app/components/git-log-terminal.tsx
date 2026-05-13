"use client";

import { useState, useEffect } from "react";

const COMMAND_LINE = "$ git log --oneline --all";

const LOG_LINES: {
  hash: string;
  name: string;
  desc: string;
  live: boolean;
  accent: string;
}[] = [
  {
    hash: "a7f3c2e",
    name: "ds-radar",
    desc: "agentic job-matching pipeline",
    live: false,
    accent: "var(--cyan-primary)",
  },
  {
    hash: "3b8e91d",
    name: "no-botes-tu-voto",
    desc: "Colombian 2026 voter alignment quiz",
    live: true,
    accent: "var(--green-primary)",
  },
  {
    hash: "f2a5d87",
    name: "the-london-bible",
    desc: "geospatial atlas for 600+ London areas",
    live: true,
    accent: "var(--amber-primary)",
  },
  {
    hash: "9c1b3f4",
    name: "bjj-universe",
    desc: "competitive grappling network graph",
    live: true,
    accent: "var(--purple-primary)",
  },
  {
    hash: "5e7d2a1",
    name: "legalize-co",
    desc: "71.5k Colombian laws versioned in git",
    live: false,
    accent: "var(--cyan-primary)",
  },
  {
    hash: "2f8c4b9",
    name: "un-speeches",
    desc: "NLP analysis of 8k+ UN speeches",
    live: true,
    accent: "var(--amber-primary)",
  },
];

export default function GitLogTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(false);

  // Total steps: 1 (command line) + LOG_LINES.length
  const totalSteps = 1 + LOG_LINES.length;

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let step = 0;
      const interval = setInterval(() => {
        step++;
        setVisibleCount(step);
        if (step >= totalSteps) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(true), 200);
        }
      }, 220);
      return () => clearInterval(interval);
    }, 600);

    return () => clearTimeout(startDelay);
  }, [totalSteps]);

  const showCommand = visibleCount >= 1;
  const visibleLines = LOG_LINES.slice(0, Math.max(0, visibleCount - 1));
  const isDone = visibleCount >= totalSteps;

  return (
    <div
      style={{
        background: "var(--bg-0)",
        border: "1px solid var(--bg-4)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.8,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          padding: "10px 14px",
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--bg-4)",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 11,
          color: "var(--fg-2)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: isDone ? "#27c93f" : "var(--fg-3)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
        </div>
        <span style={{ flex: 1, textAlign: "center" }}>renzo@local: ~/projects</span>
      </div>

      {/* Log output */}
      <div style={{ padding: "14px 18px" }}>
        {/* Command */}
        {showCommand && (
          <div
            style={{
              color: "var(--fg-0)",
              opacity: 0,
              animation: "fadeIn 200ms forwards",
              marginBottom: 6,
            }}
          >
            {COMMAND_LINE}
          </div>
        )}

        {/* Project lines */}
        {visibleLines.map((line) => (
          <div
            key={line.hash}
            style={{
              display: "grid",
              gridTemplateColumns: "12px 56px 1fr",
              gap: "0 10px",
              alignItems: "baseline",
              opacity: 0,
              animation: "fadeIn 200ms forwards",
            }}
          >
            {/* Graph dot */}
            <span style={{ color: "var(--green-primary)" }}>*</span>

            {/* Hash */}
            <span style={{ color: "var(--fg-3)", letterSpacing: "0.02em" }}>{line.hash}</span>

            {/* Name + desc */}
            <span>
              <span style={{ color: line.accent, fontWeight: 600 }}>{line.name}</span>
              <span style={{ color: "var(--fg-3)", margin: "0 6px" }}>—</span>
              <span style={{ color: "var(--fg-2)" }}>{line.desc}</span>
              {line.live && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 10,
                    color: "var(--green-primary)",
                    letterSpacing: "0.06em",
                  }}
                >
                  · live
                </span>
              )}
            </span>
          </div>
        ))}

        {/* Trailing cursor */}
        <div style={{ marginTop: 4, minHeight: 20 }}>
          {showCursor && (
            <span
              style={{
                color: "var(--green-bright)",
                animation: "blink 1s step-end infinite",
              }}
            >
              █
            </span>
          )}
          {!isDone && (
            <span
              style={{
                color: "var(--green-bright)",
                animation: "blink 1s step-end infinite",
              }}
            >
              █
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
