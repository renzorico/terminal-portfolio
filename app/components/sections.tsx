"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import AnimateIn from "./animate-in";

/* ----------------------------------------------------------------
   Data — Exhibits (case-study format)
   ---------------------------------------------------------------- */

interface Exhibit {
  id: string;
  title: string;
  problem: string;
  input: string;
  approach: string;
  challenge: string;
  result: string;
  tags: string[];
  accent: string;
  accentDim: string;
  accentSubtle: string;
  url?: string;
  repo: string;
}

const EXHIBITS: Exhibit[] = [
  {
    id: "EX-01",
    title: "ds-radar",
    problem:
      "Job searching at scale is manual, slow, and biased by first impressions. Reading 142 listings a day to find 12 relevant ones is not a viable workflow.",
    input: "7 job boards · 142 daily listings · structured candidate profile",
    approach:
      "Three agents run sequentially: a scraper collects raw listings, a parser extracts structured requirements via LLMs, a scorer ranks each listing against the candidate profile. Coordinated with a single CLI command.",
    challenge:
      "Score drift — the scoring agent produced inconsistent results across runs with identical inputs. Resolved by enforcing a structured JSON output schema and calibrating temperature to near-zero for the scoring step.",
    result:
      "12 curated matches per day · 4.2s end-to-end runtime · zero manual review required",
    tags: ["python", "ai-agents", "llms", "rest-apis"],
    accent: "var(--cyan-primary)",
    accentDim: "var(--cyan-dim)",
    accentSubtle: "var(--cyan-subtle)",
    repo: "https://github.com/renzorico/ds-radar",
  },
  {
    id: "EX-02",
    title: "no-botes-tu-voto",
    problem:
      "Colombian voters had no reliable tool to compare presidential candidates on policy. Manifestos are long, vague, and written to avoid concrete commitments.",
    input: "Candidate manifestos · press statements · 12 structured policy dimensions · 6 candidates",
    approach:
      "Scraped and normalized policy documents. LLMs classified each candidate's stance on health, economy, security, environment, and 8 other dimensions. A scoring engine matched voter answers to candidate positions across the full policy space.",
    challenge:
      "Political language is engineered to be ambiguous. Standard classification returned too many neutral labels. Solved with multi-pass prompting and an explicit uncertainty class that surfaced honest gaps rather than forcing alignment.",
    result:
      "Deployed tool · 6 candidates · 12 policy dimensions scored · live through the 2023 Colombian election cycle",
    tags: ["python", "llms", "web-scraping", "prompt-engineering"],
    accent: "var(--green-primary)",
    accentDim: "var(--green-dim)",
    accentSubtle: "var(--green-subtle)",
    url: "https://nobotestuvoto.vercel.app/",
    repo: "https://github.com/renzorico/colombia-matcher",
  },
  {
    id: "EX-03",
    title: "un-speeches",
    problem:
      "The UN General Assembly has 50+ years of diplomatic speech on record. There is no accessible tool to explore how geopolitical language has shifted over time.",
    input: "8,000+ speeches · 50+ countries · 1970–2024 · raw text transcripts",
    approach:
      "Topic modeling (LDA) to surface dominant themes per decade. TensorFlow sentiment analysis to track tone around major geopolitical events. Generative AI synthesis of findings. Streamlit dashboard for interactive exploration.",
    challenge:
      "Diplomatic language is intentionally repetitive and ambiguous — general-purpose NLP models performed poorly. Required custom preprocessing, stop-word expansion for UN-specific jargon, and fine-tuned sentiment thresholds calibrated against known events.",
    result:
      "Topic evolution mapped across 5 decades · TensorFlow sentiment classifier · deployed Streamlit dashboard",
    tags: ["python", "tensorflow", "nlp", "gcp"],
    accent: "var(--amber-primary)",
    accentDim: "var(--amber-dim)",
    accentSubtle: "var(--amber-subtle)",
    url: "https://speeches-at-un.streamlit.app/",
    repo: "https://github.com/renzorico/un-speeches",
  },
];

interface ArchiveProject {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  repo: string;
}

const ARCHIVE_PROJECTS: ArchiveProject[] = [
  {
    title: "the-london-bible",
    description:
      "Geospatial analysis of London neighborhoods — transport, culture, and livability scored and mapped interactively.",
    tags: ["typescript", "next.js", "maplibre", "supabase"],
    url: "https://the-london-bible.netlify.app/",
    repo: "https://github.com/renzorico/the-london-bible",
  },
  {
    title: "legalize-co",
    description:
      "Open-source ETL pipeline that parses Colombian legislation from raw PDFs into structured, searchable data.",
    tags: ["python", "data-pipelines"],
    repo: "https://github.com/renzorico/legalize-co",
  },
  {
    title: "bjj-universe",
    description:
      "Force-directed network graph of competitive BJJ. Athlete connections, rankings, and match history in 3D.",
    tags: ["javascript", "three.js", "d3.js"],
    url: "https://renzorico.github.io/bjj-universe/",
    repo: "https://github.com/renzorico/bjj-universe",
  },
];

/* ----------------------------------------------------------------
   Tag colors
   ---------------------------------------------------------------- */

const TAG_COLORS: Record<string, [string, string, string]> = {
  python: ["var(--green-primary)", "var(--green-subtle)", "var(--green-dim)"],
  typescript: ["var(--cyan-primary)", "var(--cyan-subtle)", "var(--cyan-dim)"],
  javascript: ["var(--amber-primary)", "var(--amber-subtle)", "var(--amber-dim)"],
  "ai-agents": ["var(--purple-primary)", "#1a0d2e", "var(--purple-muted)"],
  llms: ["var(--purple-primary)", "#1a0d2e", "var(--purple-muted)"],
  nlp: ["var(--cyan-primary)", "var(--cyan-subtle)", "var(--cyan-dim)"],
  tensorflow: ["var(--amber-primary)", "var(--amber-subtle)", "var(--amber-dim)"],
  gcp: ["var(--cyan-primary)", "var(--cyan-subtle)", "var(--cyan-dim)"],
  "web-scraping": ["var(--green-primary)", "var(--green-subtle)", "var(--green-dim)"],
  "prompt-engineering": ["var(--purple-primary)", "#1a0d2e", "var(--purple-muted)"],
  "rest-apis": ["var(--fg-1)", "var(--bg-3)", "var(--fg-3)"],
  "next.js": ["var(--fg-1)", "var(--bg-3)", "var(--fg-3)"],
  maplibre: ["var(--green-primary)", "var(--green-subtle)", "var(--green-dim)"],
  supabase: ["var(--green-primary)", "var(--green-subtle)", "var(--green-dim)"],
  "data-pipelines": ["var(--cyan-primary)", "var(--cyan-subtle)", "var(--cyan-dim)"],
  "three.js": ["var(--amber-primary)", "var(--amber-subtle)", "var(--amber-dim)"],
  "d3.js": ["var(--amber-primary)", "var(--amber-subtle)", "var(--amber-dim)"],
};

const DEFAULT_TAG_COLOR: [string, string, string] = ["var(--fg-1)", "var(--bg-3)", "var(--fg-3)"];

function TagPill({ tag }: { tag: string }) {
  const [color, bg, border] = TAG_COLORS[tag] ?? DEFAULT_TAG_COLOR;
  return (
    <span
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        padding: "3px 8px",
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
}

/* ----------------------------------------------------------------
   Shared styles
   ---------------------------------------------------------------- */

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  color: "var(--fg-2)",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: 10,
  fontFamily: "var(--font-mono)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
  fontWeight: 600,
  color: "var(--fg-0)",
  marginBottom: 36,
  lineHeight: 1.2,
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  padding: "10px 14px",
  background: "var(--bg-2)",
  border: "1px solid var(--bg-4)",
  borderRadius: "var(--radius-sm)",
  color: "var(--fg-0)",
  outline: "none",
  transition: "border-color 150ms, box-shadow 150ms",
};

const labelStyle: React.CSSProperties = {
  fontSize: 10,
  color: "var(--fg-2)",
  textTransform: "uppercase",
  letterSpacing: "0.1em",
  marginBottom: 2,
};

/* ----------------------------------------------------------------
   Animated Charts — continuously moving
   ---------------------------------------------------------------- */

function RadarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 220;
    const H = 120;
    canvas.width = W;
    canvas.height = H;

    const stages = [
      { x: 30, label: "scrape", color: "#00bcd4" },
      { x: 85, label: "parse", color: "#e5a500" },
      { x: 140, label: "score", color: "#9d4edd" },
      { x: 195, label: "rank", color: "#00d632" },
    ];

    interface Particle {
      x: number;
      y: number;
      speed: number;
      stage: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < 18; i++) {
      particles.push({
        x: Math.random() * W,
        y: 30 + Math.random() * 50,
        speed: 0.4 + Math.random() * 0.6,
        stage: Math.floor(Math.random() * 4),
        alpha: 0.3 + Math.random() * 0.7,
      });
    }

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.strokeStyle = "rgba(68, 68, 68, 0.4)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(stages[0].x, 55);
      for (let i = 1; i < stages.length; i++) {
        ctx.lineTo(stages[i].x, 55);
      }
      ctx.stroke();
      ctx.setLineDash([]);

      stages.forEach((s) => {
        ctx.fillStyle = s.color;
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(s.x, 55, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(s.x, 55, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(160, 160, 160, 0.7)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(s.label, s.x, 85);
      });

      particles.forEach((p) => {
        const nextS = stages[Math.min(p.stage + 1, stages.length - 1)];
        const endX = p.stage < stages.length - 1 ? nextS.x : W + 10;
        p.x += p.speed;
        if (p.x > endX) {
          p.stage = (p.stage + 1) % stages.length;
          p.x = stages[p.stage].x;
          p.y = 40 + Math.random() * 30;
        }

        const color = stages[p.stage].color;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = p.alpha * 0.2;
        ctx.beginPath();
        ctx.arc(p.x - 4, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.fillText("142 listings → 12 matches", 10, 110);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

function VoteChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 220;
    const H = 120;
    canvas.width = W;
    canvas.height = H;

    const candidates = [
      { label: "Cand. A", base: 0.88, phase: 0, color: "#00d632" },
      { label: "Cand. B", base: 0.72, phase: 1.2, color: "#00d632" },
      { label: "Cand. C", base: 0.58, phase: 2.4, color: "#e5a500" },
      { label: "Cand. D", base: 0.45, phase: 3.6, color: "#e5a500" },
      { label: "Cand. E", base: 0.33, phase: 4.8, color: "#444444" },
    ];

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.02;

      const barW = 28;
      const gap = (W - candidates.length * barW) / (candidates.length + 1);
      const maxH = 80;

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("policy alignment", W / 2, 10);

      candidates.forEach((c, i) => {
        const x = gap + i * (barW + gap);
        const osc = Math.sin(t + c.phase) * 0.04;
        const h = (c.base + osc) * maxH;
        const y = 95 - h;

        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(x, 95 - maxH, barW, maxH);
        ctx.globalAlpha = 1;

        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.85;
        const r = 3;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + barW - r, y);
        ctx.quadraticCurveTo(x + barW, y, x + barW, y + r);
        ctx.lineTo(x + barW, 95);
        ctx.lineTo(x, 95);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.fill();
        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgba(224, 224, 224, 0.8)";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round((c.base + osc) * 100)}%`, x + barW / 2, y - 4);

        ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
        ctx.font = "8px monospace";
        ctx.fillText(c.label, x + barW / 2, 106);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

function SpeechesChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 220;
    const H = 120;
    canvas.width = W;
    canvas.height = H;

    const decades = ["1970", "1980", "1990", "2000", "2010", "2020"];
    const values = [0.22, 0.38, 0.55, 0.72, 0.88, 0.74];

    const padL = 10;
    const padR = 10;
    const padT = 20;
    const padB = 25;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const points = values.map((v, i) => ({
      x: padL + (i / (values.length - 1)) * plotW,
      y: padT + plotH - v * plotH,
    }));

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.01;

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("topic frequency over time", W / 2, 12);

      ctx.strokeStyle = "rgba(68, 68, 68, 0.3)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        const y = padT + (i / 3) * plotH;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
      }

      const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
      grad.addColorStop(0, "rgba(229, 165, 0, 0.15)");
      grad.addColorStop(1, "rgba(229, 165, 0, 0.01)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
        const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
        ctx.bezierCurveTo(cp1x, points[i - 1].y, cp2x, points[i].y, points[i].x, points[i].y);
      }
      ctx.lineTo(points[points.length - 1].x, padT + plotH);
      ctx.lineTo(points[0].x, padT + plotH);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "#e5a500";
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) {
        const cp1x = points[i - 1].x + (points[i].x - points[i - 1].x) / 3;
        const cp2x = points[i].x - (points[i].x - points[i - 1].x) / 3;
        ctx.bezierCurveTo(cp1x, points[i - 1].y, cp2x, points[i].y, points[i].x, points[i].y);
      }
      ctx.stroke();

      points.forEach((p) => {
        ctx.fillStyle = "#0a0a0a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#e5a500";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      const progress = t % 1;
      const totalLen = points.length - 1;
      const segF = progress * totalLen;
      const seg = Math.floor(segF);
      const segProgress = segF - seg;
      if (seg < points.length - 1) {
        const ax = points[seg].x + (points[seg + 1].x - points[seg].x) * segProgress;
        const ay = points[seg].y + (points[seg + 1].y - points[seg].y) * segProgress;
        ctx.fillStyle = "#e5a500";
        ctx.globalAlpha = 0.6 + Math.sin(t * 8) * 0.4;
        ctx.beginPath();
        ctx.arc(ax, ay, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 0.15;
        ctx.beginPath();
        ctx.arc(ax, ay, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      decades.forEach((d, i) => {
        ctx.fillText(d, points[i].x, H - 6);
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

const EXHIBIT_CHARTS = [RadarChart, VoteChart, SpeechesChart];

/* ----------------------------------------------------------------
   Exhibit Block — case-study format
   ---------------------------------------------------------------- */

const CASE_STUDY_ROWS: Array<{ key: keyof Exhibit; label: string }> = [
  { key: "problem", label: "problem" },
  { key: "input", label: "input" },
  { key: "approach", label: "approach" },
  { key: "challenge", label: "challenge" },
  { key: "result", label: "result" },
];

function ExhibitBlock({
  exhibit,
  chart: Chart,
}: {
  exhibit: Exhibit;
  chart: React.ComponentType;
}) {
  return (
    <div
      style={{
        background: "var(--bg-1)",
        border: `1px solid var(--bg-3)`,
        borderLeft: `3px solid ${exhibit.accent}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 20px",
          background: "var(--bg-2)",
          borderBottom: "1px solid var(--bg-3)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: exhibit.accent,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            {exhibit.id}
          </span>
          <span style={{ color: "var(--bg-4)", fontSize: 14 }}>─</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--fg-0)",
            }}
          >
            {exhibit.title}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontFamily: "var(--font-mono)" }}>
          {exhibit.url && (
            <a
              href={exhibit.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: exhibit.accent, textDecoration: "none" }}
            >
              live ↗
            </a>
          )}
          <a
            href={exhibit.repo}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-2)", textDecoration: "none" }}
          >
            source ↗
          </a>
        </div>
      </div>

      {/* Content grid: case study + chart */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 240px",
          alignItems: "stretch",
        }}
        className="exhibit-content"
      >
        {/* Left: case study rows */}
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          {CASE_STUDY_ROWS.map((row) => (
            <div
              key={row.key}
              style={{
                display: "grid",
                gridTemplateColumns: "76px 1fr",
                gap: 16,
                alignItems: "baseline",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: exhibit.accent,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  paddingTop: 3,
                  opacity: 0.8,
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: row.key === "result" ? "var(--fg-0)" : "var(--fg-1)",
                  lineHeight: 1.65,
                  fontWeight: row.key === "result" ? 500 : 400,
                }}
              >
                {exhibit[row.key] as string}
              </span>
            </div>
          ))}

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingTop: 4 }}>
            {exhibit.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>
        </div>

        {/* Right: animated chart */}
        <div
          style={{
            padding: "20px",
            background: "var(--bg-2)",
            borderLeft: "1px solid var(--bg-3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          className="exhibit-chart"
        >
          <Chart />
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Exhibits — three flagship case studies
   ---------------------------------------------------------------- */

export function Exhibits() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls exhibits/</div>
        <div style={sectionTitleStyle}>Selected work</div>
      </AnimateIn>

      <div className="flex flex-col" style={{ gap: 20 }}>
        {EXHIBITS.map((exhibit, i) => (
          <AnimateIn key={exhibit.id} delay={i * 120}>
            <ExhibitBlock exhibit={exhibit} chart={EXHIBIT_CHARTS[i]} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Archive — secondary projects, compact list
   ---------------------------------------------------------------- */

function ArchiveRow({ project }: { project: ArchiveProject }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "180px 1fr auto",
        gap: 20,
        alignItems: "baseline",
        padding: "14px 0",
        borderBottom: "1px solid var(--bg-2)",
        transition: "all 150ms",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 500,
          color: hovered ? "var(--fg-0)" : "var(--fg-1)",
          transition: "color 150ms",
        }}
      >
        {project.title}
      </span>
      <span style={{ fontSize: 12, color: "var(--fg-2)", lineHeight: 1.5 }}>
        {project.description}
      </span>
      <div style={{ display: "flex", gap: 10, fontSize: 11, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--green-primary)", textDecoration: "none" }}
          >
            live ↗
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--fg-3)", textDecoration: "none" }}
        >
          source ↗
        </a>
      </div>
    </div>
  );
}

export function Archive() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls archive/</div>
        <div style={sectionTitleStyle}>Archive / Lab</div>
      </AnimateIn>

      <AnimateIn delay={80}>
        <div style={{ borderTop: "1px solid var(--bg-2)" }}>
          {ARCHIVE_PROJECTS.map((project) => (
            <ArchiveRow key={project.title} project={project} />
          ))}
        </div>
      </AnimateIn>
    </div>
  );
}

/* ----------------------------------------------------------------
   About — positioning statement, not a bio
   ---------------------------------------------------------------- */

const ABOUT_ENTRIES: { label: string; value: string; link?: string }[] = [
  { label: "name", value: "Renzo Rico" },
  { label: "role", value: "Data Scientist" },
  { label: "stack", value: "Python · LLMs · ML · NLP · SQL" },
  { label: "location", value: "Barcelona, Europe" },
  { label: "github", value: "github.com/renzorico", link: "https://github.com/renzorico" },
  { label: "linkedin", value: "linkedin.com/in/renzorico", link: "https://linkedin.com/in/renzorico" },
];

const ASCII_PORTRAIT = `                  .:::.
                 :##*%%**=.
              :=#%%@@@@@@@%*=.
            :*@@@@@@@@@@@@@@@%*-
          .+@@@@@%*+====+*%@@@@@*
          +%@@@@%*=-:::::.-%@@%@@+
          +@@@@%#+=-:::::::*@@@@@%-
          *@@@@%###*=::+#**+%@@@@@+
          =@@@%##**#*::=+==-=%@@@%-
          :%%%#+--=+=....:..:=**%@#
           #*%#+=+*##==+===::-=:#%%-.
           .*%####%#+---=++--=*#@+.
           .*@%%*=++--:....-=*%@#:
            *@@%@%*+=--::-=+++@%#+.
            .*%#%@@%#******=:=%=-:
          .=+*#*+*%%#**++=:..:-.
    .:-=+#%@@%#*==+*+-::.....-#%#+:
=+*#%@@@@@@@@%#*=-:--:......:*@@@@@%*=:.`;

function ParticleAscii() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef(0);
  const startedRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          obs.disconnect();
          startAnimation();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(wrapper);

    function startAnimation() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const CHAR_W = 5.42;
      const CHAR_H = 10.35;

      const lines = ASCII_PORTRAIT.split("\n");
      const maxCols = Math.max(...lines.map((l) => l.length));
      const W = maxCols * CHAR_W;
      const H = lines.length * CHAR_H;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.scale(dpr, dpr);

      interface Particle {
        x: number; y: number;
        tx: number; ty: number;
        vx: number; vy: number;
        alpha: number;
        phase: number;
        phaseSpeed: number;
        driftR: number;
        settled: boolean;
      }

      const particles: Particle[] = [];
      lines.forEach((line, row) => {
        for (let col = 0; col < line.length; col++) {
          if (line[col] !== " ") {
            particles.push({
              x: Math.random() * W,
              y: Math.random() * H,
              tx: col * CHAR_W + CHAR_W * 0.5,
              ty: row * CHAR_H + CHAR_H * 0.5,
              vx: (Math.random() - 0.5) * 2,
              vy: (Math.random() - 0.5) * 2,
              alpha: 0,
              phase: Math.random() * Math.PI * 2,
              phaseSpeed: 0.012 + Math.random() * 0.018,
              driftR: 0.4 + Math.random() * 0.8,
              settled: false,
            });
          }
        }
      });

      const GREEN = "0, 166, 40";

      const draw = () => {
        ctx.clearRect(0, 0, W, H);

        for (const p of particles) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (!p.settled) {
            p.vx += dx * 0.06;
            p.vy += dy * 0.06;
            p.vx *= 0.78;
            p.vy *= 0.78;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha = Math.min(1, p.alpha + 0.025);
            if (dist < 1.2) p.settled = true;
          } else {
            p.phase += p.phaseSpeed;
            p.x = p.tx + Math.cos(p.phase) * p.driftR;
            p.y = p.ty + Math.sin(p.phase * 1.3) * p.driftR;
            p.alpha = 0.55 + Math.sin(p.phase * 2) * 0.35;
          }

          ctx.fillStyle = `rgba(${GREEN}, ${p.alpha})`;
          ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
        }

        animRef.current = requestAnimationFrame(draw);
      };

      draw();
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      obs.disconnect();
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ flexShrink: 0, userSelect: "none" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}

export function About() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ cat about.md</div>
        <div style={sectionTitleStyle}>About</div>
      </AnimateIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Info card with ASCII */}
        <AnimateIn delay={100}>
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--bg-3)",
              borderRadius: "var(--radius-md)",
              padding: "28px 32px",
              boxShadow: "var(--shadow-card)",
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 40,
              alignItems: "center",
            }}
            className="hero-grid"
          >
            <ParticleAscii />
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 1fr",
                  gap: "12px 20px",
                }}
              >
                {ABOUT_ENTRIES.map((entry) => (
                  <div key={entry.label} style={{ display: "contents" }}>
                    <span style={{ color: "var(--fg-2)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      {entry.label}
                    </span>
                    {entry.link ? (
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--cyan-primary)", textDecoration: "none" }}
                      >
                        {entry.value}
                      </a>
                    ) : (
                      <span style={{ color: "var(--fg-0)" }}>{entry.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Positioning statement */}
        <AnimateIn delay={200}>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.85,
              color: "var(--fg-1)",
              background: "var(--bg-1)",
              border: "1px solid var(--bg-3)",
              borderRadius: "var(--radius-md)",
              padding: "28px 32px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p style={{ marginBottom: 16 }}>
              Trained as an architect. Ended up building with data. Both fields reward the same instincts: think in systems, care about the parts nobody sees, and know when something is not finished yet.
            </p>
            <p style={{ marginBottom: 16 }}>
              I specialize in the full pipeline — collecting data nobody else wanted to touch, building models that answer a specific question, deploying tools that people actually use. Comfortable at every layer: scraping, ETL, ML, LLMs, APIs, UI. Not a generalist. Just someone who refuses to stop at the interesting part.
            </p>
            <p style={{ color: "var(--fg-0)", fontWeight: 500 }}>
              Currently looking for a data science role where the job is to make things, not report them.
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Contact
   ---------------------------------------------------------------- */

const CONTACT_LINKS = [
  {
    label: "email",
    value: "renzorico10@gmail.com",
    href: "mailto:renzorico10@gmail.com",
    color: "var(--amber-primary)",
    description: "For roles, collaborations, or questions",
  },
  {
    label: "github",
    value: "github.com/renzorico",
    href: "https://github.com/renzorico",
    color: "var(--fg-0)",
    description: "All projects, open source",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/renzorico",
    href: "https://linkedin.com/in/renzorico",
    color: "var(--cyan-primary)",
    description: "Professional profile and connect",
  },
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      setStatus("error");
      return;
    }

    const data = new FormData(e.currentTarget);

    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ./contact.sh</div>
        <div style={sectionTitleStyle}>Get in touch</div>
      </AnimateIn>

      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 24,
          alignItems: "stretch",
        }}
      >
        <AnimateIn delay={100}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, height: "100%" }}>
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.label !== "email" ? "_blank" : undefined}
                rel={link.label !== "email" ? "noopener noreferrer" : undefined}
                style={{
                  background: "var(--bg-1)",
                  border: "1px solid var(--bg-3)",
                  borderRadius: "var(--radius-md)",
                  padding: "18px 22px",
                  textDecoration: "none",
                  color: "inherit",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: 4,
                  flex: 1,
                  transition: "all 200ms",
                  boxShadow: "var(--shadow-card)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--fg-3)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--bg-3)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <span style={{ fontSize: 10, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  {link.label}
                </span>
                <span style={{ fontSize: 14, color: link.color, fontFamily: "var(--font-mono)" }}>
                  {link.value}
                </span>
                <span style={{ fontSize: 11, color: "var(--fg-2)" }}>{link.description}</span>
              </a>
            ))}
          </div>
        </AnimateIn>

        <AnimateIn delay={200}>
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--bg-3)",
              borderRadius: "var(--radius-md)",
              padding: "24px",
              boxShadow: "var(--shadow-card)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div style={{ fontSize: 11, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
              send a message
            </div>
            {status === "sent" ? (
              <div
                style={{
                  color: "var(--green-primary)",
                  fontSize: 14,
                  background: "var(--green-subtle)",
                  border: "1px solid var(--green-dim)",
                  borderRadius: "var(--radius-sm)",
                  padding: "16px 20px",
                }}
              >
                <span style={{ marginRight: 8 }}>●</span> message sent. renzo will respond shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label style={labelStyle}>from</label>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={labelStyle}>subject</label>
                  <input
                    name="_subject"
                    type="text"
                    required
                    placeholder="re: collaboration"
                    style={inputStyle}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label style={labelStyle}>message</label>
                  <textarea
                    name="message"
                    required
                    placeholder="your message..."
                    rows={4}
                    style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                  />
                </div>
                {status === "error" && (
                  <div style={{ color: "var(--red-primary)", fontSize: 12, background: "var(--red-dim)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
                    error: message failed. try emailing directly.
                  </div>
                )}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 13,
                    padding: "10px 24px",
                    background: status === "sending" ? "var(--green-dim)" : "var(--green-primary)",
                    color: "#0a0a0a",
                    border: "none",
                    borderRadius: "var(--radius-sm)",
                    fontWeight: 600,
                    cursor: status === "sending" ? "wait" : "pointer",
                    alignSelf: "flex-start",
                    transition: "all 150ms",
                  }}
                >
                  {status === "sending" ? "sending..." : "send --message"}
                </button>
              </form>
            )}
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
