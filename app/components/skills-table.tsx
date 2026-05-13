"use client";

import { useState, useEffect, useRef } from "react";

const CATEGORIES = [
  {
    cat: "ml / ai",
    color: "#9d4edd",
    bg: "#1a0d2e",
    border: "#7b2cbf",
    items: ["llms", "ai-agents", "nlp", "deep-learning", "tensorflow", "scikit-learn", "prompt-engineering"],
  },
  {
    cat: "languages",
    color: "#00d632",
    bg: "#0d2b14",
    border: "#0a5c1f",
    items: ["python", "sql", "javascript", "typescript", "bash"],
  },
  {
    cat: "data",
    color: "#00bcd4",
    bg: "#001f24",
    border: "#004d56",
    items: ["pandas", "data-pipelines", "web-scraping", "gcp", "supabase"],
  },
  {
    cat: "visualization",
    color: "#e5a500",
    bg: "#2b2000",
    border: "#5c4300",
    items: ["d3.js", "three.js", "maplibre", "streamlit", "matplotlib"],
  },
  {
    cat: "infra / web",
    color: "#a0a0a0",
    bg: "#242424",
    border: "#444444",
    items: ["docker", "git", "linux", "vercel", "rest-apis", "next.js", "cli"],
  },
  {
    cat: "methods",
    color: "#ff6b6b",
    bg: "#2b1111",
    border: "#5c2222",
    items: ["statistics", "a/b-testing", "experimentation", "forecasting", "data-storytelling"],
  },
];

export default function SkillsTable() {
  const [animate, setAnimate] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  let tagIndex = 0;

  return (
    <div ref={ref} style={{ fontFamily: "var(--font-mono)" }}>
      <div
        className="skills-bar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "28px 40px",
        }}
      >
        {CATEGORIES.map((cat) => {
          return (
            <div key={cat.cat}>
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    color: cat.color,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 600,
                  }}
                >
                  {cat.cat}
                </span>
                <span
                  style={{
                    flex: 1,
                    height: 1,
                    background: cat.border,
                    opacity: 0.5,
                  }}
                />
              </div>

              {/* Skill tags — floating animation */}
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {cat.items.map((item) => {
                  const idx = tagIndex++;
                  const floatDuration = 2.2 + (idx % 7) * 0.3;
                  const floatDelay = (idx * 0.18) % 2.5;
                  return (
                    <span
                      key={item}
                      style={{
                        fontSize: 12,
                        padding: "5px 12px",
                        borderRadius: "var(--radius-sm)",
                        letterSpacing: "0.04em",
                        color: cat.color,
                        background: cat.bg,
                        border: `1px solid ${cat.border}`,
                        opacity: animate ? 1 : 0,
                        transform: animate ? "translateY(0)" : "translateY(8px)",
                        transition: `opacity 400ms ${idx * 30}ms, transform 400ms ${idx * 30}ms`,
                        animation: animate
                          ? `tagFloat ${floatDuration}s ease-in-out ${floatDelay}s infinite`
                          : "none",
                        display: "inline-block",
                      }}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
