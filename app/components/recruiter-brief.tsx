"use client";

const LINKS = [
  { label: "github", href: "https://github.com/renzorico", color: "var(--fg-1)" },
  { label: "linkedin / cv", href: "https://linkedin.com/in/renzorico", color: "var(--cyan-primary)" },
  { label: "email", href: "mailto:renzorico10@gmail.com", color: "var(--amber-primary)" },
];

const PROOFS = [
  {
    tag: "ds-radar",
    text: "Agentic pipeline that scrapes job boards, ranks listings against a candidate profile, and exports daily matches",
  },
  {
    tag: "no-botes-tu-voto",
    text: "Voter-alignment quiz for the Colombian 2026 election — live, sourced, and transparent",
  },
  {
    tag: "the-london-bible",
    text: "Interactive geospatial atlas across 600+ London neighborhoods",
  },
];

const label = (text: string) => (
  <span
    style={{
      fontSize: 10,
      color: "var(--fg-2)",
      textTransform: "uppercase" as const,
      letterSpacing: "0.1em",
      fontFamily: "var(--font-mono)",
      display: "block",
      marginBottom: 4,
    }}
  >
    {text}
  </span>
);

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

      {/* Row 1: three top facts */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 120px",
          gap: 0,
          borderBottom: "1px solid var(--bg-3)",
        }}
      >
        <div style={{ padding: "18px 24px", borderRight: "1px solid var(--bg-3)" }}>
          {label("role target")}
          <span style={{ fontSize: 13, color: "var(--fg-0)" }}>Data Scientist · product-facing</span>
        </div>
        <div style={{ padding: "18px 24px", borderRight: "1px solid var(--bg-3)" }}>
          {label("location")}
          <span style={{ fontSize: 13, color: "var(--fg-0)" }}>Barcelona · remote or relocation in Europe</span>
        </div>
        <div style={{ padding: "18px 24px" }}>
          {label("available")}
          <span style={{ fontSize: 13, color: "var(--green-primary)", fontWeight: 600 }}>Now</span>
        </div>
      </div>

      {/* Row 2: stack */}
      <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--bg-3)" }}>
        {label("core stack")}
        <span style={{ fontSize: 13, color: "var(--fg-0)" }}>
          Python · SQL · LLMs · NLP · TypeScript · end-to-end, no handoffs
        </span>
      </div>

      {/* Row 3: proofs */}
      <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--bg-3)", display: "flex", flexDirection: "column", gap: 10 }}>
        {label("three proofs")}
        {PROOFS.map(({ tag, text }) => (
          <div key={tag} style={{ display: "grid", gridTemplateColumns: "12px 1fr", gap: 10, alignItems: "baseline" }}>
            <span style={{ color: "var(--green-primary)" }}>→</span>
            <span style={{ fontSize: 13, color: "var(--fg-1)", lineHeight: 1.6 }}>
              {text}
              <span style={{ marginLeft: 8, fontSize: 10, color: "var(--fg-3)", letterSpacing: "0.04em" }}>
                [{tag}]
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* Footer: links */}
      <div style={{ padding: "14px 24px", background: "var(--bg-2)", display: "flex", gap: 20 }}>
        {LINKS.map(({ label: text, href, color }) => (
          <a
            key={text}
            href={href}
            target={href.startsWith("mailto") ? undefined : "_blank"}
            rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
            style={{ fontSize: 12, color, textDecoration: "none", letterSpacing: "0.02em" }}
          >
            {text} ↗
          </a>
        ))}
      </div>
    </div>
  );
}
