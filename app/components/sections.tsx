"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import SkillsTable from "./skills-table";
import AnimateIn from "./animate-in";

/* ----------------------------------------------------------------
   Data
   ---------------------------------------------------------------- */

interface Project {
  title: string;
  description: string;
  tags: string[];
  metrics: string;
  accent: string;
  accentDim: string;
  accentSubtle: string;
  url?: string;
  repo: string;
}

const FEATURED_PROJECTS: Project[] = [
  {
    title: "ds-radar",
    description:
      "Agentic AI pipeline that scrapes job boards, extracts requirements with LLMs, scores listings against a structured profile, and ranks them. Multiple agents coordinate to automate a multi-step decision process into a single CLI command.",
    tags: ["python", "ai-agents", "llms", "rest-apis"],
    metrics: "agentic ai · orchestration · decision automation",
    accent: "var(--cyan-primary)",
    accentDim: "var(--cyan-dim)",
    accentSubtle: "var(--cyan-subtle)",
    repo: "https://github.com/renzorico/ds-radar",
  },
  {
    title: "no-botes-tu-voto",
    description:
      "Decision-support tool for Colombian elections. Scraped policy positions, structured unstructured text with LLMs, built a scoring engine that matches voters to candidates based on policy alignment.",
    tags: ["python", "llms", "web-scraping", "prompt-engineering"],
    metrics: "nlp · scoring model · deployed product",
    accent: "var(--green-primary)",
    accentDim: "var(--green-dim)",
    accentSubtle: "var(--green-subtle)",
    url: "https://nobotestuvoto.vercel.app/",
    repo: "https://github.com/renzorico/colombia-matcher",
  },
  {
    title: "un-speeches",
    description:
      "Applied NLP and deep learning to 50+ years of UN General Assembly speeches. Topic modelling, sentiment analysis, and generative AI to surface patterns in diplomatic language over time.",
    tags: ["python", "tensorflow", "nlp", "gcp"],
    metrics: "deep learning · text analytics · topic modelling",
    accent: "var(--amber-primary)",
    accentDim: "var(--amber-dim)",
    accentSubtle: "var(--amber-subtle)",
    url: "https://speeches-at-un.streamlit.app/",
    repo: "https://github.com/renzorico/un-speeches",
  },
];

const COMPACT_PROJECTS: Omit<Project, "accent" | "accentDim" | "accentSubtle">[] = [
  {
    title: "the-london-bible",
    description:
      "Geospatial analysis of London neighborhoods with interactive maps for transport, culture, and livability scoring.",
    tags: ["typescript", "next.js", "maplibre", "supabase"],
    metrics: "geospatial · etl · data visualization",
    url: "https://the-london-bible.netlify.app/",
    repo: "https://github.com/renzorico/the-london-bible",
  },
  {
    title: "legalize-co",
    description:
      "Open-source data pipeline that parses Colombian legislation from raw PDFs into structured, searchable data.",
    tags: ["python", "data-pipelines", "git", "rest-apis"],
    metrics: "open-source · data engineering · etl",
    repo: "https://github.com/renzorico/legalize-co",
  },
  {
    title: "bjj-universe",
    description:
      "3D force-directed network visualization of the competitive BJJ graph. Athlete connections, rankings, and match history.",
    tags: ["javascript", "three.js", "d3.js"],
    metrics: "network analysis · 3d visualization · scraping",
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
  git: ["var(--fg-1)", "var(--bg-3)", "var(--fg-3)"],
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

/** ds-radar: Particles flowing through pipeline stages */
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

      // Connection lines
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

      // Stage nodes
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

      // Particles
      particles.forEach((p) => {
        const s = stages[p.stage];
        const nextS = stages[Math.min(p.stage + 1, stages.length - 1)];
        const startX = s.x;
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

        // Trail
        ctx.globalAlpha = p.alpha * 0.2;
        ctx.beginPath();
        ctx.arc(p.x - 4, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Stats
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

/** no-botes-tu-voto: Oscillating match score bars */
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

      // Title
      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("policy alignment", W / 2, 10);

      candidates.forEach((c, i) => {
        const x = gap + i * (barW + gap);
        const osc = Math.sin(t + c.phase) * 0.04;
        const h = (c.base + osc) * maxH;
        const y = 95 - h;

        // Bar shadow
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 0.1;
        ctx.fillRect(x, 95 - maxH, barW, maxH);
        ctx.globalAlpha = 1;

        // Bar
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

        // Score
        ctx.fillStyle = "rgba(224, 224, 224, 0.8)";
        ctx.font = "bold 9px monospace";
        ctx.textAlign = "center";
        ctx.fillText(`${Math.round((c.base + osc) * 100)}%`, x + barW / 2, y - 4);

        // Label
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

/** un-speeches: Animated line chart with tracing dot */
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

      // Title
      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("topic frequency over time", W / 2, 12);

      // Grid lines
      ctx.strokeStyle = "rgba(68, 68, 68, 0.3)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < 4; i++) {
        const y = padT + (i / 3) * plotH;
        ctx.beginPath();
        ctx.moveTo(padL, y);
        ctx.lineTo(W - padR, y);
        ctx.stroke();
      }

      // Area fill
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

      // Line
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

      // Static dots
      points.forEach((p) => {
        ctx.fillStyle = "#0a0a0a";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#e5a500";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Animated scanning dot
      const progress = (t % 1);
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

      // X-axis labels
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

const FEATURED_CHARTS = [RadarChart, VoteChart, SpeechesChart];

/* ----------------------------------------------------------------
   Featured Project Card — with colored hover
   ---------------------------------------------------------------- */

function FeaturedCard({ project, chart: Chart, index }: { project: Project; chart: React.ComponentType; index: number }) {
  const [hovered, setHovered] = useState(false);
  const primaryLink = project.url ?? project.repo;

  return (
    <a
      href={primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 260px",
        gap: 0,
        background: "var(--bg-1)",
        border: `1px solid ${hovered ? project.accentDim : "var(--bg-3)"}`,
        borderLeft: `3px solid ${hovered ? project.accent : project.accentDim}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hovered
          ? `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 20px ${project.accentSubtle}`
          : "var(--shadow-card)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      {/* Left: content */}
      <div style={{ padding: "24px 28px 22px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <span
            style={{
              fontSize: 10,
              color: project.accent,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              fontFamily: "var(--font-mono)",
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span style={{ width: 20, height: 1, background: "var(--fg-3)" }} />
          <span style={{ fontSize: 10, color: "var(--fg-2)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            featured
          </span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 600,
            color: "var(--fg-0)",
            marginBottom: 8,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--fg-1)",
            lineHeight: 1.65,
            fontFamily: "var(--font-display)",
            marginBottom: 14,
          }}
        >
          {project.description}
        </div>
        <div className="flex flex-wrap gap-1.5" style={{ marginBottom: 12 }}>
          {project.tags.map((tag) => (
            <TagPill key={tag} tag={tag} />
          ))}
        </div>
        <div className="flex items-center gap-3" style={{ fontSize: 11 }}>
          {project.url && (
            <span style={{ color: "var(--green-primary)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--green-primary)", display: "inline-block" }} />
              live
            </span>
          )}
          {project.repo && (
            <span
              style={{ color: "var(--fg-2)" }}
              onClick={(e) => {
                if (project.url) {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.repo, "_blank", "noopener,noreferrer");
                }
              }}
            >
              source
            </span>
          )}
        </div>
      </div>

      {/* Right: animated chart */}
      <div
        style={{
          padding: "20px 20px",
          background: "var(--bg-2)",
          borderLeft: `1px solid ${hovered ? project.accentDim : "var(--bg-3)"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "border-color 250ms",
        }}
      >
        <Chart />
      </div>
    </a>
  );
}

/* ----------------------------------------------------------------
   Compact Project Card — square, equal size
   ---------------------------------------------------------------- */

function CompactCard({ project }: { project: Omit<Project, "accent" | "accentDim" | "accentSubtle"> }) {
  const [hovered, setHovered] = useState(false);
  const primaryLink = project.url ?? project.repo;

  return (
    <a
      href={primaryLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-1)",
        border: `1px solid ${hovered ? "var(--fg-3)" : "var(--bg-3)"}`,
        borderRadius: "var(--radius-md)",
        padding: "22px 22px 20px",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hovered ? "var(--shadow-card-hover)" : "var(--shadow-card)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        height: "100%",
        minHeight: 200,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 16,
            fontWeight: 600,
            color: "var(--fg-0)",
          }}
        >
          {project.title}
        </span>
        {project.url && (
          <span style={{ color: "var(--green-primary)", display: "flex", alignItems: "center", gap: 3, fontSize: 10 }}>
            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--green-primary)", display: "inline-block" }} />
            live
          </span>
        )}
      </div>
      <div style={{ fontSize: 12, color: "var(--fg-1)", lineHeight: 1.6, flex: 1, marginBottom: 12 }}>
        {project.description}
      </div>
      <div className="flex flex-wrap gap-1.5" style={{ marginTop: "auto" }}>
        {project.tags.map((tag) => (
          <TagPill key={tag} tag={tag} />
        ))}
      </div>
    </a>
  );
}

/* ----------------------------------------------------------------
   Approach
   ---------------------------------------------------------------- */

const APPROACH_ITEMS = [
  {
    label: "collect",
    description: "Web scraping, APIs, enterprise data. I go get the data that answers the question.",
    color: "var(--cyan-primary)",
    dim: "var(--cyan-dim)",
    subtle: "var(--cyan-subtle)",
    tools: ["scraping", "rest-apis", "sql"],
  },
  {
    label: "transform",
    description: "Pipelines that turn raw mess into analysis-ready tables. Pandas, SQL, validation at scale.",
    color: "var(--amber-primary)",
    dim: "var(--amber-dim)",
    subtle: "var(--amber-subtle)",
    tools: ["pandas", "pipelines", "etl"],
  },
  {
    label: "model",
    description: "ML, NLP, deep learning, LLMs. Classical models and agentic AI — pick the right tool for the problem.",
    color: "var(--purple-primary)",
    dim: "#1a0d2e",
    subtle: "#1a0d2e",
    tools: ["llms", "tensorflow", "scikit-learn"],
  },
  {
    label: "ship",
    description: "Deployed apps, APIs, decision tools. Analysis that stays in a notebook helps nobody.",
    color: "var(--green-primary)",
    dim: "var(--green-dim)",
    subtle: "var(--green-subtle)",
    tools: ["vercel", "docker", "next.js"],
  },
];

function PipelineStep({
  item,
  index,
}: {
  item: typeof APPROACH_ITEMS[number];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: "100%",
        height: "100%",
        background: hovered ? item.subtle : "var(--bg-1)",
        border: `1px solid ${hovered ? item.dim : "var(--bg-3)"}`,
        borderRadius: "var(--radius-md)",
        padding: "22px 18px 18px",
        transition: "all 250ms cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: hovered
          ? `0 4px 20px rgba(0, 0, 0, 0.4), 0 0 0 1px ${item.dim}`
          : "var(--shadow-card)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: item.color,
          opacity: hovered ? 1 : 0.5,
          transition: "opacity 250ms",
        }}
      />

      {/* Step number + label row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 22,
            fontWeight: 700,
            color: item.color,
            opacity: hovered ? 1 : 0.4,
            transition: "opacity 250ms",
            lineHeight: 1,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            fontWeight: 600,
            color: item.color,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
          }}
        >
          {item.label}
        </span>
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 13,
          color: "var(--fg-1)",
          lineHeight: 1.65,
          marginBottom: 14,
          flex: 1,
        }}
      >
        {item.description}
      </div>

      {/* Tool tags */}
      <div className="flex flex-wrap gap-1.5">
        {item.tools.map((tool) => (
          <span
            key={tool}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: "var(--radius-sm)",
              color: item.color,
              background: item.subtle,
              border: `1px solid ${item.dim}`,
              letterSpacing: "0.04em",
              opacity: hovered ? 1 : 0.6,
              transition: "opacity 250ms",
            }}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Approach() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ cat pipeline.md</div>
        <div style={sectionTitleStyle}>How I work</div>
      </AnimateIn>

      {/* Pipeline header — input → output */}
      <AnimateIn delay={50}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
        >
          <span style={{ color: "var(--fg-2)", letterSpacing: "0.05em" }}>raw data</span>
          <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--cyan-dim), var(--amber-dim), var(--purple-muted), var(--green-dim))", opacity: 0.5 }} />
          <span style={{ color: "var(--fg-2)", letterSpacing: "0.05em" }}>deployed product</span>
        </div>
      </AnimateIn>

      {/* Pipeline steps — responsive grid */}
      <div
        className="pipeline-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        {APPROACH_ITEMS.map((item, i) => (
          <AnimateIn key={item.label} delay={i * 120}>
            <PipelineStep item={item} index={i} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Exhibits
   ---------------------------------------------------------------- */

export function Exhibits() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls projects/</div>
        <div style={sectionTitleStyle}>What I build</div>
      </AnimateIn>

      {/* Featured projects */}
      <div className="flex flex-col" style={{ gap: 16, marginBottom: 20 }}>
        {FEATURED_PROJECTS.map((project, i) => (
          <AnimateIn key={project.title} delay={i * 120}>
            <FeaturedCard project={project} chart={FEATURED_CHARTS[i]} index={i} />
          </AnimateIn>
        ))}
      </div>

      {/* Compact projects — equal height grid */}
      <div
        className="compact-grid grid"
        style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
      >
        {COMPACT_PROJECTS.map((project, i) => (
          <AnimateIn key={project.title} delay={(i + 3) * 80}>
            <CompactCard project={project} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Skills
   ---------------------------------------------------------------- */

export function Skills() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls ~/.skills/</div>
        <div style={sectionTitleStyle}>Tech stack</div>
      </AnimateIn>
      <AnimateIn delay={150}>
        <SkillsTable />
      </AnimateIn>
    </div>
  );
}

/* ----------------------------------------------------------------
   About — ASCII portrait inside the info box
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
          +%@@@@%*=-::::..-%@@%@@+
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
      // Monospace char dimensions at font-size 9px, line-height 1.15
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

      // Collect target positions from non-space chars
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

      const GREEN = "0, 166, 40"; // rgb for green-muted

      const draw = () => {
        ctx.clearRect(0, 0, W, H);

        let allSettled = true;

        for (const p of particles) {
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (!p.settled) {
            allSettled = false;
            // Spring toward target
            p.vx += dx * 0.06;
            p.vy += dy * 0.06;
            p.vx *= 0.78;
            p.vy *= 0.78;
            p.x += p.vx;
            p.y += p.vy;
            p.alpha = Math.min(1, p.alpha + 0.025);
            if (dist < 1.2) p.settled = true;
          } else {
            // Gentle orbit drift
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
        {/* Combined info card with ASCII — full width */}
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
            {/* ASCII portrait — animated decode */}
            <ParticleAscii />

            {/* Info grid */}
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
              }}
            >
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

        {/* Bio — same full width */}
        <AnimateIn delay={200}>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--fg-1)",
              background: "var(--bg-1)",
              border: "1px solid var(--bg-3)",
              borderRadius: "var(--radius-md)",
              padding: "24px 32px",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <p style={{ marginBottom: 12 }}>
              Trained as an architect. Ended up building with data. Both fields reward the same thing: thinking in systems, obsessing over detail, and knowing when something isn&apos;t finished yet.
            </p>
            <p style={{ color: "var(--fg-0)" }}>
              I want to build AI products that help people make better decisions — with a team that ships fast and cares about impact.
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Contact — two-column layout with direct links + form
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
        {/* Left: Direct contact links — stretch to match form height */}
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

        {/* Right: Contact form */}
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
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
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
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 80,
                    }}
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
