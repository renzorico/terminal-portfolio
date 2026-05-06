"use client";

import { useState } from "react";

const TAG_COLORS: [string, string, string][] = [
  ["var(--green-primary)", "var(--green-subtle)", "var(--green-dim)"],
  ["var(--cyan-primary)", "var(--cyan-subtle)", "var(--cyan-dim)"],
  ["var(--amber-primary)", "var(--amber-subtle)", "var(--amber-dim)"],
  ["var(--purple-primary)", "#2a1040", "var(--purple-muted)"],
];

interface ExhibitCardProps {
  title: string;
  description: string;
  tags?: string[];
  metrics?: string;
  onClick?: () => void;
}

export default function ExhibitCard({
  title,
  description,
  tags = [],
  metrics,
  onClick,
}: ExhibitCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "var(--bg-2)",
        border: `1px solid ${hovered ? "var(--green-dim)" : "var(--fg-3)"}`,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 200ms, box-shadow 200ms",
        boxShadow: hovered ? "var(--shadow-glow-md)" : "none",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-1.5"
        style={{
          padding: "8px 12px",
          background: "var(--bg-3)",
          borderBottom: `1px solid ${hovered ? "var(--green-dim)" : "var(--fg-3)"}`,
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
              background: hovered && i === 0 ? "var(--green-primary)" : "transparent",
            }}
          />
        ))}
        <span
          style={{
            marginLeft: 4,
            color: hovered ? "var(--green-primary)" : "var(--fg-2)",
            fontSize: 11,
          }}
        >
          ~/projects/{title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 14, fontSize: 13, lineHeight: 1.6, color: "var(--fg-1)" }}>
        <div>
          <span style={{ color: "var(--green-bright)", marginRight: 4 }}>&gt;</span>
          <span style={{ color: "var(--fg-0)" }}>{description}</span>
        </div>
        {metrics && (
          <div style={{ color: "var(--fg-2)", fontSize: 11, marginTop: 6 }}>{metrics}</div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" style={{ marginTop: 10 }}>
            {tags.map((tag, i) => {
              const [color, bg, border] = TAG_COLORS[i % TAG_COLORS.length];
              return (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    padding: "2px 7px",
                    borderRadius: "var(--radius-sm)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color,
                    background: bg,
                    border: `1px solid ${border}`,
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
