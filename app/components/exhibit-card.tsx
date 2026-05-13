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
  url?: string;
  repo?: string;
}

export default function ExhibitCard({
  title,
  description,
  tags = [],
  metrics,
  url,
  repo,
}: ExhibitCardProps) {
  const [hovered, setHovered] = useState(false);

  const primaryLink = url ?? repo;
  const Wrapper = primaryLink ? "a" : "div";
  const wrapperProps = primaryLink
    ? { href: primaryLink, target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-2)",
        border: `1px solid ${hovered ? "var(--green-dim)" : "var(--fg-3)"}`,
        borderRadius: "var(--radius-sm)",
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 200ms, box-shadow 200ms",
        boxShadow: hovered ? "var(--shadow-glow-md)" : "none",
        display: "flex",
        flexDirection: "column" as const,
        textDecoration: "none",
        color: "inherit",
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
            flex: 1,
          }}
        >
          ~/projects/{title}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: 14, fontSize: 13, lineHeight: 1.6, color: "var(--fg-1)", flex: 1 }}>
        <div style={{ color: "var(--fg-0)", marginBottom: 8 }}>{description}</div>
        {metrics && (
          <div style={{ color: "var(--fg-2)", fontSize: 11, marginBottom: 10 }}>{metrics}</div>
        )}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

      {/* Footer links */}
      <div
        className="flex items-center gap-3"
        style={{
          padding: "8px 14px",
          borderTop: "1px solid var(--bg-3)",
          fontSize: 11,
        }}
      >
        {url && (
          <span style={{ color: "var(--green-primary)" }}>
            live ↗
          </span>
        )}
        {repo && (
          <span
            style={{ color: "var(--fg-2)" }}
            onClick={(e) => {
              if (url) {
                e.preventDefault();
                e.stopPropagation();
                window.open(repo, "_blank", "noopener,noreferrer");
              }
            }}
          >
            source ↗
          </span>
        )}
        {!url && !repo && (
          <span style={{ color: "var(--fg-2)" }}>coming soon</span>
        )}
      </div>
    </Wrapper>
  );
}
