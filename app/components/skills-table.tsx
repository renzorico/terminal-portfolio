"use client";

import { useState } from "react";

const CATEGORIES = [
  {
    cat: "languages",
    color: "var(--green-primary)",
    bg: "var(--green-subtle)",
    border: "var(--green-dim)",
    items: ["python", "sql", "javascript", "typescript", "bash"],
  },
  {
    cat: "ml / ai",
    color: "var(--purple-primary)",
    bg: "#1a0d2e",
    border: "var(--purple-muted)",
    items: ["tensorflow", "scikit-learn", "nlp", "deep-learning", "llms", "ai-agents"],
  },
  {
    cat: "data",
    color: "var(--cyan-primary)",
    bg: "var(--cyan-subtle)",
    border: "var(--cyan-dim)",
    items: ["pandas", "web-scraping", "data-pipelines", "gcp", "supabase"],
  },
  {
    cat: "visualization",
    color: "var(--amber-primary)",
    bg: "var(--amber-subtle)",
    border: "var(--amber-dim)",
    items: ["d3.js", "three.js", "maplibre", "streamlit", "matplotlib"],
  },
  {
    cat: "infra / web",
    color: "var(--fg-1)",
    bg: "var(--bg-3)",
    border: "var(--fg-3)",
    items: ["docker", "git", "linux", "vercel", "rest-apis", "next.js", "cli"],
  },
];

export default function SkillsTable() {
  const [activeCat, setActiveCat] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2" style={{ marginBottom: 16 }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCat === cat.cat || activeCat === null;
          return (
            <button
              key={cat.cat}
              onClick={() => setActiveCat(activeCat === cat.cat ? null : cat.cat)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                padding: "4px 10px",
                background: activeCat === cat.cat ? cat.bg : "transparent",
                border: `1px solid ${activeCat === cat.cat ? cat.border : "var(--fg-3)"}`,
                borderRadius: "var(--radius-sm)",
                color: isActive ? cat.color : "var(--fg-2)",
                cursor: "pointer",
                transition: "all 150ms",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {cat.cat}
            </button>
          );
        })}
      </div>

      {/* Skills grid */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.filter((cat) => activeCat === null || activeCat === cat.cat).flatMap(
          (cat) =>
            cat.items.map((item) => (
              <span
                key={item}
                style={{
                  fontSize: 12,
                  padding: "5px 12px",
                  background: cat.bg,
                  border: `1px solid ${cat.border}`,
                  borderRadius: "var(--radius-sm)",
                  color: cat.color,
                  fontWeight: 500,
                  transition: "all 200ms",
                }}
              >
                {item}
              </span>
            ))
        )}
      </div>
    </div>
  );
}
