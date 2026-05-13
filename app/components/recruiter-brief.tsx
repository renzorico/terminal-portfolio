"use client";

const FACTS = [
  { key: "role target", value: "Data Scientist · product-facing" },
  { key: "location", value: "Barcelona · remote or relocation in Europe" },
  { key: "available", value: "now", highlight: true },
  { key: "core stack", value: "Python · SQL · LLMs · NLP · TypeScript" },
  { key: "owns", value: "data collection → ML → deployment · no handoffs" },
];

const PROOFS = [
  { text: "Agentic pipeline that scrapes job boards, ranks listings against a candidate profile, and exports daily matches", tag: "ds-radar" },
  { text: "Voter-alignment quiz for the Colombian 2026 election, live and sourced", tag: "no-botes-tu-voto" },
  { text: "Interactive atlas across 600+ London neighborhoods", tag: "the-london-bible" },
];

const LINKS = [
  { label: "github", href: "https://github.com/renzorico", color: "var(--fg-1)" },
  { label: "linkedin / cv", href: "https://linkedin.com/in/renzorico", color: "var(--cyan-primary)" },
  { label: "email", href: "mailto:renzorico10@gmail.com", color: "var(--amber-primary)" },
];

export default function RecruiterBrief() {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        background: "var(--bg-1)",
        borderTop: "1px solid var(--bg-3)",
        borderRight: "1px solid var(--bg-3)",
        borderBottom: "1px solid var(--bg-3)",
        borderLeft: "3px solid var(--green-primary)",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--bg-3)",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <span style={{ fontSize: 11, color: "var(--green-primary)", fontWeight: 700, letterSpacing: "0.08em" }}>
          BRIEF
        </span>
        <span style={{ color: "var(--bg-4)", fontSize: 14 }}>─</span>
        <span style={{ fontSize: 11, color: "var(--fg-2)" }}>$ cat brief.txt</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "var(--green-primary)",
              animation: "pulse 2.5s ease-in-out infinite",
            }}
          />
          <span style={{ fontSize: 10, color: "var(--green-primary)", letterSpacing: "0.04em" }}>
            open to roles
          </span>
        </div>
      </div>

      {/* Two-column body */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}
        className="hero-grid"
      >
        {/* Left: factsheet */}
        <div
          style={{
            padding: "24px 28px",
            display: "flex",
            flexDirection: "column",
            gap: 10,
            borderRight: "1px solid var(--bg-3)",
          }}
        >
          {FACTS.map(({ key, value, highlight }) => (
            <div
              key={key}
              style={{ display: "grid", gridTemplateColumns: "88px 1fr", gap: 12, alignItems: "baseline" }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: "var(--fg-2)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  paddingTop: 1,
                }}
              >
                {key}
              </span>
              <span style={{ fontSize: 12, color: highlight ? "var(--green-primary)" : "var(--fg-0)", lineHeight: 1.5 }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Right: proof points */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 10,
              color: "var(--fg-2)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            three proofs
          </div>

          {PROOFS.map(({ text, tag }) => (
            <div key={tag} style={{ display: "grid", gridTemplateColumns: "14px 1fr", gap: 10, alignItems: "start" }}>
              <span style={{ color: "var(--green-primary)", fontSize: 12, lineHeight: 1.6 }}>→</span>
              <div>
                <span style={{ fontSize: 12, color: "var(--fg-1)", lineHeight: 1.6 }}>{text} </span>
                <span
                  style={{
                    fontSize: 10,
                    color: "var(--fg-3)",
                    letterSpacing: "0.04em",
                    whiteSpace: "nowrap",
                  }}
                >
                  [{tag}]
                </span>
              </div>
            </div>
          ))}

          <div
            style={{
              marginTop: 8,
              paddingTop: 14,
              borderTop: "1px solid var(--bg-3)",
              display: "flex",
              gap: 18,
            }}
          >
            {LINKS.map(({ label, href, color }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{ fontSize: 11, color, textDecoration: "none", letterSpacing: "0.02em" }}
              >
                {label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
