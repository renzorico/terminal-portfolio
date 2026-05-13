"use client";

import { useState, useEffect, useRef } from "react";

const CLUSTERS = [
  {
    name: "Agentic & LLM systems",
    color: "var(--purple-primary)",
    bg: "var(--purple-subtle)",
    border: "var(--purple-dim)",
    summary:
      "Building production systems around LLMs — not demos, not wrappers. Multi-agent coordination, structured output schemas, eval loops, temperature and cost calibration.",
    evidence: [
      {
        project: "ds-radar",
        detail:
          "3-agent pipeline (scraper → parser → scorer). Structured JSON schema enforcement + near-zero temperature to prevent scoring drift across runs.",
      },
      {
        project: "no-botes-tu-voto",
        detail:
          "Multi-pass LLM stance classification with explicit uncertainty classes — handled political ambiguity without forcing false alignment where evidence was thin.",
      },
    ],
    tools: ["python", "llms", "ai-agents", "prompt-engineering"],
  },
  {
    name: "Data engineering & NLP",
    color: "var(--cyan-primary)",
    bg: "var(--cyan-subtle)",
    border: "var(--cyan-dim)",
    summary:
      "ETL from hostile sources, text corpora at scale, preprocessing for domain-specific language. The pipeline work nobody else wants to touch.",
    evidence: [
      {
        project: "legalize-co",
        detail:
          "Fetched 71.5k Colombian laws from a source with broken SOAP XML and a broken TLS chain — routed around both without compromising the corpus.",
      },
      {
        project: "un-speeches",
        detail:
          "8k+ speech corpus with custom preprocessing pipeline and expanded stop-word lists for UN-specific jargon that tripped up general-purpose NLP models.",
      },
    ],
    tools: ["python", "pandas", "nlp", "web-scraping", "etl"],
  },
  {
    name: "Interactive data products",
    color: "var(--green-primary)",
    bg: "var(--green-subtle)",
    border: "var(--green-dim)",
    summary:
      "Data tools that users can actually use. Geospatial analysis, network graphs, civic apps. End-to-end ownership of the UI layer from data schema to deployed interface.",
    evidence: [
      {
        project: "the-london-bible",
        detail:
          "Multi-layer London atlas normalized across mismatched geographic granularities — wards, postcodes, LSOAs — unified into a coherent hex-grid for the UI.",
      },
      {
        project: "bjj-universe",
        detail:
          "1000+ node network graph optimized with octree spatial partitioning and instanced mesh rendering to hold 30fps on commodity hardware.",
      },
    ],
    tools: ["typescript", "next.js", "python", "maplibre", "sigma.js"],
  },
];

const HOW_I_WORK = [
  {
    signal: "ambiguity → structure",
    detail: "I map the problem before opening an editor. Saves weeks of wrong-direction work.",
  },
  {
    signal: "end-to-end ownership",
    detail: "No handoff dependency. Data contracts, models, APIs, and UI — I own the full chain.",
  },
  {
    signal: "tradeoff documentation",
    detail: "I write down what I chose not to build and why. Teams spend less time relitigating.",
  },
  {
    signal: "shipping instinct",
    detail: "Deployed products, not notebooks. If it doesn't run for a user, it's not done.",
  },
];

function CapabilityCluster({ cluster, index }: { cluster: typeof CLUSTERS[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: "var(--bg-1)",
        borderTop: "1px solid var(--bg-3)",
        borderRight: "1px solid var(--bg-3)",
        borderBottom: "1px solid var(--bg-3)",
        borderLeft: `3px solid ${cluster.color}`,
        borderRadius: "var(--radius-md)",
        padding: "24px 28px",
        boxShadow: "var(--shadow-card)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 500ms ${index * 100}ms, transform 500ms ${index * 100}ms`,
      }}
    >
      {/* Cluster name */}
      <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: cluster.color,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            fontWeight: 700,
          }}
        >
          {cluster.name}
        </span>
        <span style={{ flex: 1, height: 1, background: cluster.border, opacity: 0.5 }} />
      </div>

      {/* Summary */}
      <p
        style={{
          fontSize: 13,
          color: "var(--fg-1)",
          lineHeight: 1.7,
          marginBottom: 20,
          fontFamily: "var(--font-display)",
        }}
      >
        {cluster.summary}
      </p>

      {/* Evidence */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
        <div
          style={{
            fontSize: 10,
            color: "var(--fg-2)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            fontFamily: "var(--font-mono)",
            marginBottom: 2,
          }}
        >
          proven by
        </div>
        {cluster.evidence.map(({ project, detail }) => (
          <div key={project} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 10, alignItems: "start" }}>
            <span style={{ color: cluster.color, fontSize: 12, lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>→</span>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: cluster.color,
                  marginRight: 8,
                  letterSpacing: "0.04em",
                }}
              >
                [{project}]
              </span>
              <span style={{ fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6 }}>{detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tool tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cluster.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              padding: "3px 8px",
              borderRadius: "var(--radius-sm)",
              letterSpacing: "0.05em",
              color: cluster.color,
              background: cluster.bg,
              border: `1px solid ${cluster.border}`,
              textTransform: "uppercase",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Capabilities() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* Clusters */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 40 }}>
        {CLUSTERS.map((cluster, i) => (
          <CapabilityCluster key={cluster.name} cluster={cluster} index={i} />
        ))}
      </div>

      {/* How I work */}
      <div
        style={{
          fontFamily: "var(--font-mono)",
          background: "var(--bg-1)",
          border: "1px solid var(--bg-3)",
          borderRadius: "var(--radius-md)",
          overflow: "hidden",
          boxShadow: "var(--shadow-card)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 500ms 350ms, transform 500ms 350ms",
        }}
      >
        <div
          style={{
            background: "var(--bg-2)",
            borderBottom: "1px solid var(--bg-3)",
            padding: "10px 20px",
            fontSize: 11,
            color: "var(--fg-2)",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          how I work · team value
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 0,
          }}
          className="skills-bar-grid"
        >
          {HOW_I_WORK.map(({ signal, detail }, i) => (
            <div
              key={signal}
              style={{
                padding: "18px 24px",
                borderRight: i % 2 === 0 ? "1px solid var(--bg-3)" : "none",
                borderBottom: i < 2 ? "1px solid var(--bg-3)" : "none",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  color: "var(--fg-0)",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  marginBottom: 6,
                }}
              >
                {signal}
              </div>
              <div style={{ fontSize: 12, color: "var(--fg-2)", lineHeight: 1.6 }}>{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
