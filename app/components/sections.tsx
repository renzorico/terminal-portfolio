"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import AnimateIn from "./animate-in";
import SkillsTable from "./skills-table";

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
  flagship?: boolean;
  role?: string;
}

const EXHIBITS: Exhibit[] = [
  /* ── Flagships (shown on homepage) ─────────────────────────── */
  {
    id: "EX-01",
    title: "ds-radar",
    flagship: true,
    role: "Sole builder — agent architecture, LLM scoring, pipeline CLI",
    problem:
      "Job searching for data roles is repetitive and noisy. Good opportunities are scattered across sources, and evaluating each listing manually does not scale.",
    input:
      "CSV job feeds · structured candidate profile · tracker state · evaluation history",
    approach:
      "Built an automated job scanning, evaluation, and tracking pipeline. New feeds are ingested, listings are evaluated against a structured profile, decisions are written into canonical tracker files, and eval markdowns stay linked to the operational state.",
    challenge:
      "Keeping the pipeline reliable as it evolved. I tightened the system around a single source of truth — tracker.tsv, scan-history.tsv, and eval artifacts — so repairs, history, and downstream tooling all point to the same canonical state.",
    result:
      "A reproducible workflow for ingesting job feeds, scoring relevance, tracking decisions, and generating linked evaluation artifacts for DS and analytics job searches.",
    tags: ["python", "llms", "ai-agents", "data-pipelines"],
    accent: "var(--cyan-primary)",
    accentDim: "var(--cyan-dim)",
    accentSubtle: "var(--cyan-subtle)",
    repo: "https://github.com/renzorico/ds-radar",
  },
  {
    id: "EX-02",
    title: "no-botes-tu-voto",
    flagship: true,
    role: "Sole builder — data curation, LLM classification, Next.js frontend",
    problem:
      "Presidential campaigns produce long, ambiguous political messaging, but voters need a clearer way to compare candidates on concrete issues.",
    input:
      "Documented candidate positions · 25 quiz questions · 7 key themes · 6 presidential candidates",
    approach:
      "Built an independent voter-alignment tool for the Colombian 2026 election. Users answer 25 questions, and their responses are compared against documented candidate positions with transparent sourcing and methodology.",
    challenge:
      "Political positions are often vague or incomplete. The product had to stay useful without pretending every candidate had a clean, fully structured stance on every issue.",
    result:
      "A live public quiz experience for Colombia 2026 that helps users compare six candidates across seven key topics using documented sources and a transparent methodology.",
    tags: ["llms", "next.js", "typescript", "prompt-engineering"],
    accent: "var(--green-primary)",
    accentDim: "var(--green-dim)",
    accentSubtle: "var(--green-subtle)",
    url: "https://nobotestuvoto.vercel.app/",
    repo: "https://github.com/renzorico/colombia-matcher",
  },
  {
    id: "EX-03",
    title: "the-london-bible",
    flagship: true,
    role: "Sole builder — data pipeline, geospatial normalization, map UI",
    problem:
      "London is experienced as layers — transport, density, amenities, schools, hospitals, housing, and geography — but those layers are rarely explored together in one place.",
    input:
      "London borough and ward geometry · MSOA density data · Tube lines · bikes · POIs · schools · hospitals and other civic overlays",
    approach:
      "Built a self-contained London atlas: a static web app that combines multiple civic and spatial layers into a single editorial mapping experience with switches for views, metrics, overlays, and location-based exploration.",
    challenge:
      "The hard part was not just gathering datasets, but turning them into a coherent and legible map product with consistent overlays and a browsing experience that invites comparison rather than overwhelming the user.",
    result:
      "A deployed interactive London atlas that lets users explore density, transport, amenities, and civic infrastructure through one layered map interface.",
    tags: ["python", "maplibre", "geojson", "next.js"],
    accent: "var(--amber-primary)",
    accentDim: "var(--amber-dim)",
    accentSubtle: "var(--amber-subtle)",
    url: "https://the-london-bible.netlify.app/",
    repo: "https://github.com/renzorico/the-london-bible",
  },
  /* ── Lab (secondary, compact section) ──────────────────────── */
  {
    id: "EX-04",
    title: "un-speeches",
    flagship: false,
    role: "Sole builder — corpus pipeline, NLP, Streamlit dashboard",
    problem:
      "UN General Assembly speeches contain decades of geopolitical signal, but they are difficult to explore systematically without a purpose-built analysis workflow.",
    input:
      "8,000+ UN General Debate speeches · multi-decade text corpus · country and year metadata",
    approach:
      "Built an NLP exploration project around the UN speech corpus, combining text preprocessing, thematic analysis, and an interactive app layer to make long-run diplomatic language easier to inspect.",
    challenge:
      "Diplomatic language is repetitive, formal, and full of domain-specific phrasing, so generic off-the-shelf text analysis produces shallow results unless the preprocessing and framing are adapted to the corpus.",
    result:
      "An interactive UN speeches analysis project that turns a large diplomatic text archive into something searchable, inspectable, and analytically usable.",
    tags: ["python", "nlp", "tensorflow", "streamlit"],
    accent: "var(--purple-primary)",
    accentDim: "var(--purple-dim)",
    accentSubtle: "var(--purple-subtle)",
    url: "https://speeches-at-un.streamlit.app/",
    repo: "https://github.com/renzorico/un-speeches",
  },
  {
    id: "EX-05",
    title: "legalize-co",
    flagship: false,
    role: "Sole builder — ETL pipeline, schema design, open-source corpus",
    problem:
      "Colombian legislation is hard to query, version, and build on as data, even though the legal corpus is public and structurally important for civic tooling.",
    input:
      "SUIN-Juriscol legislation records · laws, decrees, resolutions, and legislative acts · 1887 to present",
    approach:
      "Built a pipeline that fetches Colombian legislation from SUIN-Juriscol and stores each law as versioned Markdown in git, turning legal text into a browsable, structured, legislation-as-code repository.",
    challenge:
      "Source-system constraints made corpus discovery and retrieval messy: the SOAP search endpoint returns invalid XML, and the source TLS chain is broken locally, so the pipeline had to work around unreliable infrastructure.",
    result:
      "A growing open-source corpus of Colombian legislation in Markdown, versioned in git, with 71,500 laws committed in the current repository state.",
    tags: ["python", "data-pipelines", "web-scraping", "gcp"],
    accent: "var(--cyan-primary)",
    accentDim: "var(--cyan-dim)",
    accentSubtle: "var(--cyan-subtle)",
    repo: "https://github.com/renzorico/legalize-co",
  },
  {
    id: "EX-06",
    title: "bjj-universe",
    flagship: false,
    role: "Sole builder — data processing, graph architecture, deployment",
    problem:
      "Brazilian Jiu-Jitsu competition data contains rich relationship structure — athletes, matches, eras, and rivalries — but it is rarely presented as a network people can explore.",
    input:
      "ADCC historical match data · processed graph-ready datasets · athlete and match relationships",
    approach:
      "Built a graph-first exploration platform for grappling competition networks. Athletes become nodes, matches become directed winner-to-loser edges, and the interface is designed as a living atlas for rivalries, bridges, and clusters.",
    challenge:
      "The product needed a clean foundation before chasing visual spectacle, so the work focused on strict typing, reproducible data processing, graph-ready structures, and a UI that could grow into a serious analytics tool.",
    result:
      "A deployed interactive BJJ graph experience backed by processed ADCC data, with a production-grade frontend foundation and a clear path toward deeper competition analytics.",
    tags: ["typescript", "javascript", "d3.js", "rest-apis"],
    accent: "var(--purple-primary)",
    accentDim: "var(--purple-dim)",
    accentSubtle: "var(--purple-subtle)",
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

function MapChart() {
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

    interface Dot {
      x: number;
      y: number;
      score: number;
      phase: number;
      phaseSpeed: number;
    }

    const dots: Dot[] = [];
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: 30 + Math.random() * 160,
        y: 20 + Math.random() * 75,
        score: 0.2 + Math.random() * 0.8,
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.01 + Math.random() * 0.02,
      });
    }

    let animId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.02;

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("livability score by area", W / 2, 10);

      ctx.strokeStyle = "rgba(68, 68, 68, 0.3)";
      ctx.lineWidth = 0.5;
      ctx.setLineDash([2, 4]);
      ctx.strokeRect(30, 18, 160, 80);
      ctx.setLineDash([]);

      dots.forEach((d) => {
        d.phase += d.phaseSpeed;
        const pulse = 0.6 + Math.sin(d.phase) * 0.4;
        const r = 2 + d.score * 3;

        const green = Math.round(160 + d.score * 60);
        ctx.fillStyle = `rgba(0, ${green}, 50, ${pulse * 0.6})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r + Math.sin(d.phase) * 0.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(0, ${green}, 50, ${pulse * 0.15})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      const scanX = 30 + ((t * 20) % 160);
      ctx.strokeStyle = "rgba(0, 214, 50, 0.15)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(scanX, 18);
      ctx.lineTo(scanX, 98);
      ctx.stroke();

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.fillText("600+ neighborhoods", 10, 112);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

function PipelineChart() {
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

    const steps = [
      { y: 20, label: "extract", color: "#00bcd4" },
      { y: 45, label: "segment", color: "#e5a500" },
      { y: 70, label: "parse", color: "#9d4edd" },
      { y: 95, label: "index", color: "#00d632" },
    ];

    interface Block {
      x: number;
      step: number;
      width: number;
      speed: number;
      alpha: number;
    }

    const blocks: Block[] = [];
    for (let i = 0; i < 12; i++) {
      blocks.push({
        x: Math.random() * W,
        step: Math.floor(Math.random() * 4),
        width: 8 + Math.random() * 20,
        speed: 0.3 + Math.random() * 0.5,
        alpha: 0.3 + Math.random() * 0.5,
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("pdf → structured data", W / 2, 12);

      steps.forEach((s) => {
        ctx.strokeStyle = s.color;
        ctx.globalAlpha = 0.1;
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(50, s.y);
        ctx.lineTo(210, s.y);
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.fillStyle = "rgba(102, 102, 102, 0.7)";
        ctx.font = "8px monospace";
        ctx.textAlign = "right";
        ctx.fillText(s.label, 46, s.y + 3);
      });

      blocks.forEach((b) => {
        b.x += b.speed;
        if (b.x > 215) {
          b.x = 50;
          b.step = (b.step + 1) % 4;
          b.width = 8 + Math.random() * 20;
        }

        const step = steps[b.step];
        ctx.fillStyle = step.color;
        ctx.globalAlpha = b.alpha;
        ctx.fillRect(b.x, step.y - 3, b.width, 6);
        ctx.globalAlpha = 1;
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

function NetworkChart() {
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

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      color: string;
      phase: number;
      phaseSpeed: number;
    }

    const colors = ["#9d4edd", "#c77dff", "#7b2cbf", "#9d4edd", "#c77dff"];
    const nodes: Node[] = [];
    for (let i = 0; i < 18; i++) {
      nodes.push({
        x: 40 + Math.random() * 140,
        y: 20 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: 2 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        phase: Math.random() * Math.PI * 2,
        phaseSpeed: 0.008 + Math.random() * 0.015,
      });
    }

    const edges: [number, number][] = [];
    for (let i = 0; i < nodes.length; i++) {
      const numEdges = 1 + Math.floor(Math.random() * 2);
      for (let e = 0; e < numEdges; e++) {
        const j = Math.floor(Math.random() * nodes.length);
        if (j !== i) edges.push([i, j]);
      }
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      ctx.fillText("athlete network", W / 2, 12);

      nodes.forEach((n) => {
        n.phase += n.phaseSpeed;
        n.x += Math.cos(n.phase) * 0.2;
        n.y += Math.sin(n.phase * 1.3) * 0.15;

        if (n.x < 20) n.x = 20;
        if (n.x > 200) n.x = 200;
        if (n.y < 18) n.y = 18;
        if (n.y > 105) n.y = 105;
      });

      edges.forEach(([i, j]) => {
        const a = nodes[i];
        const b = nodes[j];
        const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
        if (dist < 80) {
          ctx.strokeStyle = a.color;
          ctx.globalAlpha = Math.max(0.05, 0.25 - dist / 320);
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      nodes.forEach((n) => {
        const pulse = 0.5 + Math.sin(n.phase * 2) * 0.3;
        ctx.fillStyle = n.color;
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = pulse;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      ctx.fillStyle = "rgba(102, 102, 102, 0.6)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.fillText("1000+ nodes", 10, 115);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 120, borderRadius: "var(--radius-sm)" }} />;
}

// Order matches EXHIBITS: ds-radar, no-botes-tu-voto, the-london-bible, un-speeches, legalize-co, bjj-universe
const EXHIBIT_CHARTS = [RadarChart, VoteChart, MapChart, SpeechesChart, PipelineChart, NetworkChart];

/* ----------------------------------------------------------------
   Exhibit Block — case-study format
   ---------------------------------------------------------------- */

const EXPANDABLE_ROWS: Array<{ key: keyof Exhibit; label: string }> = [
  { key: "problem", label: "problem" },
  { key: "input", label: "input" },
  { key: "approach", label: "approach" },
  { key: "challenge", label: "challenge" },
];

function CaseStudyRow({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div
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
          color: accent,
          textTransform: "uppercase",
          letterSpacing: "0.1em",
          paddingTop: 3,
          opacity: 0.8,
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 13, color: "var(--fg-1)", lineHeight: 1.65 }}>
        {value}
      </span>
    </div>
  );
}

function ExhibitBlock({
  exhibit,
  chart: Chart,
}: {
  exhibit: Exhibit;
  chart: React.ComponentType;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--bg-1)",
        borderTop: `1px solid ${hovered ? exhibit.accentDim : "var(--bg-3)"}`,
        borderRight: `1px solid ${hovered ? exhibit.accentDim : "var(--bg-3)"}`,
        borderBottom: `1px solid ${hovered ? exhibit.accentDim : "var(--bg-3)"}`,
        borderLeft: `3px solid ${exhibit.accent}`,
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 280ms",
        cursor: "default",
      }}
    >
      {/* Header bar — always visible */}
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
        <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: exhibit.accent,
              fontWeight: 700,
              letterSpacing: "0.08em",
              flexShrink: 0,
            }}
          >
            {exhibit.id}
          </span>
          <span style={{ color: "var(--bg-4)", fontSize: 14, flexShrink: 0 }}>─</span>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 600,
              color: "var(--fg-0)",
              flexShrink: 0,
            }}
          >
            {exhibit.title}
          </span>
          {exhibit.role && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "var(--fg-3)",
                letterSpacing: "0.04em",
                paddingLeft: 4,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              · {exhibit.role}
            </span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
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

      {/* Collapsed: horizontal (chart right) · Expanded: chart hidden */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: hovered ? "1fr" : "1fr 240px",
          alignItems: "stretch",
          transition: "grid-template-columns 350ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="exhibit-content"
      >
        {/* Left: expandable case study + always-visible result + tags */}
        <div style={{ padding: "20px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Expandable rows: problem → input → approach → challenge */}
          <div
            style={{
              overflow: "hidden",
              maxHeight: hovered ? 480 : 0,
              opacity: hovered ? 1 : 0,
              transition: "max-height 380ms cubic-bezier(0.4, 0, 0.2, 1), opacity 260ms",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingBottom: 14 }}>
              {EXPANDABLE_ROWS.map((row) => (
                <CaseStudyRow
                  key={row.key}
                  label={row.label}
                  value={exhibit[row.key] as string}
                  accent={exhibit.accent}
                />
              ))}
            </div>
          </div>

          {/* Result — always visible */}
          <div
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
              }}
            >
              result
            </span>
            <span
              style={{
                fontSize: 13,
                color: "var(--fg-0)",
                lineHeight: 1.65,
                fontWeight: 500,
              }}
            >
              {exhibit.result}
            </span>
          </div>

          {/* Tags — always visible */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {exhibit.tags.map((tag) => (
              <TagPill key={tag} tag={tag} />
            ))}
          </div>

          {/* Hint text — collapses when open */}
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--fg-3)",
              letterSpacing: "0.06em",
              maxHeight: hovered ? 0 : 20,
              opacity: hovered ? 0 : 0.7,
              overflow: "hidden",
              transition: "opacity 180ms, max-height 180ms",
            }}
          >
            hover to expand ›
          </div>
        </div>

        {/* Chart: only visible when collapsed */}
        {!hovered && (
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
        )}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Exhibits — three flagship case studies
   ---------------------------------------------------------------- */

export function Exhibits() {
  const flagships = EXHIBITS.filter((e) => e.flagship);

  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls exhibits/</div>
        <div style={sectionTitleStyle}>Selected work</div>
      </AnimateIn>

      <div className="flex flex-col" style={{ gap: 20 }}>
        {flagships.map((exhibit, i) => (
          <AnimateIn key={exhibit.id} delay={i * 120}>
            <ExhibitBlock exhibit={exhibit} chart={EXHIBIT_CHARTS[i]} />
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Lab — secondary projects, compact list
   ---------------------------------------------------------------- */

function LabRow({ exhibit }: { exhibit: Exhibit }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "80px 180px 1fr auto",
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
          fontSize: 10,
          color: exhibit.accent,
          letterSpacing: "0.08em",
        }}
      >
        {exhibit.id}
      </span>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 500,
          color: hovered ? "var(--fg-0)" : "var(--fg-1)",
          transition: "color 150ms",
        }}
      >
        {exhibit.title}
      </span>
      <span style={{ fontSize: 12, color: "var(--fg-2)", lineHeight: 1.5 }}>
        {exhibit.result}
      </span>
      <div style={{ display: "flex", gap: 10, fontSize: 11, fontFamily: "var(--font-mono)", flexShrink: 0 }}>
        {exhibit.url && (
          <a href={exhibit.url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-2)", textDecoration: "none" }}>
            live ↗
          </a>
        )}
        <a href={exhibit.repo} target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-3)", textDecoration: "none" }}>
          source ↗
        </a>
      </div>
    </div>
  );
}

export function Lab() {
  const labProjects = EXHIBITS.filter((e) => !e.flagship);

  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ ls projects/</div>
        <div style={sectionTitleStyle}>More projects</div>
      </AnimateIn>

      <AnimateIn delay={80}>
        <div style={{ borderTop: "1px solid var(--bg-2)" }}>
          {labProjects.map((exhibit) => (
            <LabRow key={exhibit.id} exhibit={exhibit} />
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
        {/* ASCII portrait + background */}
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
              <div style={{ color: "var(--fg-0)", fontSize: 14, fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-display)" }}>
                Renzo Rico
              </div>
              <div style={{ color: "var(--fg-2)", fontSize: 12, marginBottom: 16, lineHeight: 1.6 }}>
                Trained as an architect. Ended up here.
                <br />
                Originally from Colombia, based in Barcelona.
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <a href="https://github.com/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-2)", textDecoration: "none" }}>
                  github ↗
                </a>
                <a href="https://linkedin.com/in/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--cyan-primary)", textDecoration: "none" }}>
                  linkedin ↗
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* Positioning */}
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
              Both fields reward the same instincts: think in systems, care about the parts nobody sees, and know when something is not finished yet.
            </p>
            <p style={{ marginBottom: 16 }}>
              The work I tend to end up doing starts at the messy end. There is a source nobody has cleaned, a format nobody has parsed, a system that does not connect to anything useful yet. I work through that part, and then the part after it. The full chain, from whatever the raw input is to something deployed.
            </p>
            <p style={{ color: "var(--fg-0)", fontWeight: 500 }}>
              Looking for a data science role where the job is to build things and ship them.
            </p>
          </div>
        </AnimateIn>
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
        <div style={sectionLabelStyle}>$ cat skills.md</div>
        <div style={sectionTitleStyle}>Skills & Tools</div>
      </AnimateIn>

      <AnimateIn delay={100}>
        <SkillsTable />
      </AnimateIn>
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
