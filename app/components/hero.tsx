"use client";

import { useState, useEffect } from "react";
import GitLogTerminal from "./git-log-terminal";

/* ----------------------------------------------------------------
   Typing effect
   ---------------------------------------------------------------- */

function TypedHeadline({ text, delay = 400 }: { text: string; delay?: number }) {
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
  { text: "[agent:scraper]  scanning 7 job boards...", color: "var(--cyan-primary)" },
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

const PROOF_STATS = [
  { value: "4", label: "live deployed tools" },
  { value: "sole builder", label: "on every project: data to deployed UI" },
  { value: "scraping → ETL → ML → agentic AI → deployed product", label: "" },
];

export default function Hero() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: 20 }}>
      {/* Two-column layout */}
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
        {/* Left: identity + proof */}
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
              marginBottom: 16,
              minHeight: "2.6em",
            }}
          >
            <TypedHeadline text="I build data products that ship." />
          </h1>

          <p
            style={{
              fontSize: 14,
              color: "var(--fg-1)",
              marginBottom: 24,
              lineHeight: 1.7,
              fontFamily: "var(--font-display)",
            }}
          >
            I take messy, unstructured problems and turn them into working systems —
            LLM pipelines, NLP corpora, interactive data tools. End-to-end:
            raw source to deployed product, no handoffs.
          </p>

          {/* Proof stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              marginBottom: 28,
              paddingLeft: 12,
              borderLeft: "2px solid var(--green-dim)",
            }}
          >
            {PROOF_STATS.map((stat, i) => (
              <div key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
                {stat.label ? (
                  <>
                    <span style={{ color: "var(--green-primary)", fontWeight: 600 }}>{stat.value}</span>
                    <span style={{ color: "var(--fg-2)", marginLeft: 8 }}>{stat.label}</span>
                  </>
                ) : (
                  <span style={{ color: "var(--fg-2)" }}>{stat.value}</span>
                )}
              </div>
            ))}
          </div>

          {/* Dual CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("exhibits")}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "8px 16px",
                background: "var(--green-primary)",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              see the work →
            </button>
            <button
              onClick={() => scrollTo("brief")}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                padding: "8px 16px",
                background: "none",
                color: "var(--fg-1)",
                border: "1px solid var(--bg-4)",
                borderRadius: "var(--radius-sm)",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              recruiter brief →
            </button>
          </div>
        </div>

        {/* Right: pipeline terminal */}
        <PipelineTerminal />
      </div>

      {/* Project git log */}
      <GitLogTerminal />
    </div>
  );
}
