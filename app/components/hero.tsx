"use client";

import { useState, useEffect } from "react";
import TerminalPrompt from "./terminal-prompt";

/* ----------------------------------------------------------------
   Pipeline log — animated line-by-line reveal
   ---------------------------------------------------------------- */

const PIPELINE_LINES: { text: string; color: string }[] = [
  { text: "$ ds-radar --run-pipeline", color: "var(--fg-0)" },
  { text: "", color: "var(--fg-2)" },
  { text: "[agent:scraper]  scanning 3 job boards...", color: "var(--cyan-primary)" },
  { text: "[agent:scraper]  142 listings collected", color: "var(--cyan-primary)" },
  { text: "[agent:parser]   extracting requirements with llm...", color: "var(--amber-primary)" },
  { text: "[agent:parser]   structured 142 job specs", color: "var(--amber-primary)" },
  { text: "[agent:scorer]   scoring against profile...", color: "var(--purple-primary)" },
  { text: "[agent:scorer]   ranked 142 → top 12 matches", color: "var(--purple-primary)" },
  { text: "", color: "var(--fg-2)" },
  { text: "pipeline complete ✓  12 results exported", color: "var(--green-primary)" },
  { text: "total time: 4.2s  |  agents: 3  |  llm calls: 284", color: "var(--fg-2)" },
];

function PipelineTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const startDelay = setTimeout(() => {
      let line = 0;
      const interval = setInterval(() => {
        line++;
        setVisibleLines(line);
        if (line >= PIPELINE_LINES.length) clearInterval(interval);
      }, 280);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div
      style={{
        background: "var(--bg-1)",
        border: "1px solid var(--fg-3)",
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.8,
        minHeight: 280,
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5"
        style={{
          padding: "8px 12px",
          background: "var(--bg-3)",
          borderBottom: "1px solid var(--fg-3)",
          fontSize: 11,
          color: "var(--fg-2)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "1px solid var(--fg-3)",
              background: i === 0 && visibleLines >= PIPELINE_LINES.length ? "var(--green-primary)" : "transparent",
            }}
          />
        ))}
        <span style={{ marginLeft: 4 }}>~/projects/ds-radar</span>
      </div>

      {/* Log output */}
      <div style={{ padding: "12px 16px" }}>
        {PIPELINE_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            style={{
              color: line.color,
              opacity: 0,
              animation: "fadeIn 300ms forwards",
              animationDelay: "0ms",
              minHeight: line.text ? undefined : 8,
            }}
          >
            {line.text}
          </div>
        ))}
        {visibleLines < PIPELINE_LINES.length && (
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

/* ----------------------------------------------------------------
   Hero
   ---------------------------------------------------------------- */

export default function Hero() {
  return (
    <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
      {/* Two-column hero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "center",
          marginBottom: 40,
        }}
        className="hero-grid"
      >
        {/* Left: editorial */}
        <div>
          <div style={{ marginBottom: 10 }}>
            <span
              style={{
                fontSize: 11,
                color: "var(--fg-2)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontFamily: "var(--font-mono)",
              }}
            >
              renzo rico · data scientist · barcelona
            </span>
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.2,
              color: "var(--fg-0)",
              marginBottom: 20,
            }}
          >
            I build AI products that turn data into decisions.
          </h1>
          <p
            style={{
              fontSize: 15,
              color: "var(--fg-1)",
              marginBottom: 14,
              lineHeight: 1.7,
              fontFamily: "var(--font-display)",
            }}
          >
            End-to-end builder: data collection, ML models, agentic AI,
            and deployed applications. I ship things that work, not notebooks that sit.
          </p>
          <p
            style={{
              fontSize: 12,
              color: "var(--fg-2)",
              fontFamily: "var(--font-mono)",
              letterSpacing: "0.03em",
            }}
          >
            python · llms · ml · nlp · sql · agentic ai
          </p>
        </div>

        {/* Right: pipeline terminal */}
        <PipelineTerminal />
      </div>

      {/* Interactive terminal below */}
      <TerminalPrompt />
    </div>
  );
}
