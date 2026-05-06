const CATEGORIES = [
  { cat: "lang", items: ["python", "sql", "javascript", "typescript", "bash"] },
  { cat: "ml/ai", items: ["tensorflow", "scikit-learn", "nlp", "deep-learning", "llms", "ai-agents"] },
  { cat: "data", items: ["pandas", "web-scraping", "data-pipelines", "gcp", "supabase"] },
  { cat: "viz", items: ["d3.js", "three.js", "maplibre", "streamlit", "matplotlib"] },
  { cat: "infra", items: ["docker", "git", "linux", "vercel", "rest-apis", "cli"] },
  { cat: "web", items: ["next.js", "prompt-engineering", "generative-ai"] },
];

export default function SkillsTable() {
  return (
    <div
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 12,
        lineHeight: 1.9,
        color: "var(--fg-1)",
      }}
    >
      {CATEGORIES.map((cat) => (
        <div key={cat.cat}>
          <div className="flex">
            <span style={{ color: "var(--green-bright)", marginRight: 6, userSelect: "none" }}>
              $
            </span>
            <span style={{ color: "var(--fg-0)" }}>ls ~/.{cat.cat}/</span>
          </div>
          <div style={{ paddingLeft: 20, color: "var(--fg-1)" }}>{cat.items.join("  ")}</div>
          <div style={{ height: 6 }} />
        </div>
      ))}
    </div>
  );
}
