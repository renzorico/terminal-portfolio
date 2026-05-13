"use client";

import { useState, useEffect } from "react";
import TerminalPrompt from "./terminal-prompt";

/* ----------------------------------------------------------------
   Typing effect for the hero name
   ---------------------------------------------------------------- */

function TypedHeadline({ text, delay = 600 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const startTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, 45);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {showCursor && (
        <span
          style={{
            color: "var(--green-bright)",
            animation: "blink 1s step-end infinite",
            marginLeft: 1,
          }}
        >
          |
        </span>
      )}
    </span>
  );
}

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

  const isDone = visibleLines >= PIPELINE_LINES.length;

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
        minHeight: 280,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
      }}
    >
      {/* macOS-style title bar */}
      <div
        className="flex items-center"
        style={{
          padding: "10px 14px",
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--bg-4)",
          fontSize: 11,
          color: "var(--fg-2)",
          gap: 8,
        }}
      >
        <div className="flex items-center" style={{ gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: isDone ? "#27c93f" : "var(--fg-3)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
          <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
        </div>
        <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--fg-2)" }}>
          renzo@local: ~/projects/ds-radar
        </span>
      </div>

      {/* Log output */}
      <div style={{ padding: "14px 18px" }}>
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
        {!isDone && (
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
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 20 }}>
      {/* Two-column hero */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          alignItems: "center",
          marginBottom: 24,
        }}
        className="hero-grid"
      >
        {/* Left: editorial */}
        <div>
          <div style={{ marginBottom: 12 }}>
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
              marginTop: 16,
              marginBottom: 20,
              minHeight: "2.6em",
            }}
          >
            <TypedHeadline text="Automating until I run out of problems." />
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
