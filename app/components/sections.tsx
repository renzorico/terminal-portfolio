"use client";

import { useState, type FormEvent } from "react";
import ExhibitCard from "./exhibit-card";
import SkillsTable from "./skills-table";
import AnimateIn from "./animate-in";

/* ----------------------------------------------------------------
   Data
   ---------------------------------------------------------------- */

const EXHIBITS = [
  {
    title: "no-botes-tu-voto",
    description:
      "Built a candidate-matching tool for Colombian elections. Scraped policy positions, structured unstructured text with LLMs, and built a scoring engine that helps voters cut through noise.",
    tags: ["python", "llms", "web-scraping", "prompt-engineering"],
    metrics: "nlp · data collection · scoring model",
    url: "https://nobotestuvoto.vercel.app/",
    repo: "https://github.com/renzorico/colombia-matcher",
  },
  {
    title: "un-speeches",
    description:
      "Applied NLP and deep learning to 50+ years of UN General Assembly speeches. Topic modelling, sentiment analysis, and generative AI to surface patterns in diplomatic language over time.",
    tags: ["python", "tensorflow", "nlp", "gcp"],
    metrics: "deep learning · text analytics · topic modelling",
    url: "https://speeches-at-un.streamlit.app/",
    repo: "https://github.com/renzorico/un-speeches",
  },
  {
    title: "the-london-bible",
    description:
      "Geospatial analysis of London neighborhoods. Ingested and transformed public datasets, built interactive maps with custom layers for transport, culture, and livability scoring.",
    tags: ["typescript", "next.js", "maplibre", "supabase"],
    metrics: "geospatial · etl · data visualization",
    url: "https://the-london-bible.netlify.app/",
    repo: "https://github.com/renzorico/the-london-bible",
  },
  {
    title: "ds-radar",
    description:
      "Agentic pipeline that scrapes job boards, extracts requirements with LLMs, scores listings against my profile, and ranks them. Automated what used to take hours into a single CLI command.",
    tags: ["python", "ai-agents", "rest-apis", "cli"],
    metrics: "automation · prompt engineering · etl",
    repo: "https://github.com/renzorico/ds-radar",
  },
  {
    title: "bjj-universe",
    description:
      "Scraped and modelled the competitive BJJ graph. Built a 3D force-directed network visualization to explore athlete connections, rankings, and match history.",
    tags: ["javascript", "three.js", "d3.js"],
    metrics: "network analysis · 3d visualization · scraping",
    url: "https://renzorico.github.io/bjj-universe/",
    repo: "https://github.com/renzorico/bjj-universe",
  },
  {
    title: "legalize-co",
    description:
      "Open-source data pipeline that parses Colombian legislation from raw PDFs into structured, searchable data. Contributed extraction logic and data quality validation.",
    tags: ["python", "data-pipelines", "git", "rest-apis"],
    metrics: "open-source · data engineering · etl",
    repo: "https://github.com/renzorico/legalize-co",
  },
];

/* ----------------------------------------------------------------
   Shared styles
   ---------------------------------------------------------------- */

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 10,
  color: "var(--fg-2)",
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  marginBottom: 8,
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "var(--text-3xl, 2.441rem)",
  fontWeight: 600,
  color: "var(--fg-0)",
  marginBottom: 32,
};

const inputStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontSize: 13,
  padding: "10px 12px",
  background: "var(--bg-1)",
  border: "1px solid var(--fg-3)",
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
};

/* ----------------------------------------------------------------
   Approach
   ---------------------------------------------------------------- */

const APPROACH_ITEMS = [
  {
    label: "collect",
    description: "Web scraping, APIs, public datasets. I go get the data that answers the question.",
    color: "var(--cyan-primary)",
  },
  {
    label: "clean & transform",
    description: "Pipelines that turn raw mess into analysis-ready tables. Pandas, SQL, validation.",
    color: "var(--amber-primary)",
  },
  {
    label: "model & analyze",
    description: "Statistical analysis, ML, NLP, deep learning. Pick the right tool for the problem.",
    color: "var(--purple-primary)",
  },
  {
    label: "ship",
    description: "Dashboards, apps, visualizations. Analysis that stays in a notebook helps nobody.",
    color: "var(--green-primary)",
  },
];

export function Approach() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ cat pipeline.md</div>
        <div style={sectionTitleStyle}>HOW I WORK</div>
      </AnimateIn>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
      >
        {APPROACH_ITEMS.map((item, i) => (
          <AnimateIn key={item.label} delay={i * 100}>
            <div
              style={{
                background: "var(--bg-1)",
                border: "1px solid var(--fg-3)",
                borderRadius: "var(--radius-sm)",
                padding: 16,
                borderTop: `2px solid ${item.color}`,
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: item.color,
                  fontWeight: 600,
                  marginBottom: 8,
                  fontFamily: "var(--font-mono)",
                }}
              >
                {String(i + 1).padStart(2, "0")} {item.label}
              </div>
              <div style={{ fontSize: 13, color: "var(--fg-1)", lineHeight: 1.6 }}>
                {item.description}
              </div>
            </div>
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
        <div style={sectionTitleStyle}>PROJECTS</div>
      </AnimateIn>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}
      >
        {EXHIBITS.map((ex, i) => (
          <AnimateIn key={ex.title} delay={i * 100}>
            <ExhibitCard {...ex} />
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
        <div style={sectionTitleStyle}>SKILLS</div>
      </AnimateIn>
      <AnimateIn delay={150}>
        <div
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--fg-3)",
            borderRadius: "var(--radius-sm)",
            padding: 20,
          }}
        >
          <SkillsTable />
        </div>
      </AnimateIn>
    </div>
  );
}

/* ----------------------------------------------------------------
   About
   ---------------------------------------------------------------- */

const ABOUT_ENTRIES: { label: string; value: string; link?: string }[] = [
  { label: "name", value: "Renzo Rico" },
  { label: "role", value: "Data Scientist" },
  { label: "stack", value: "Python · LLMs · ML · SQL" },
  { label: "location", value: "London" },
  { label: "github", value: "github.com/renzorico", link: "https://github.com/renzorico" },
  { label: "linkedin", value: "linkedin.com/in/renzorico", link: "https://linkedin.com/in/renzorico" },
];

export function About() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ cat about.md</div>
        <div style={sectionTitleStyle}>ABOUT</div>
      </AnimateIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Info table */}
        <AnimateIn delay={100}>
          <div
            style={{
              background: "var(--bg-1)",
              border: "1px solid var(--fg-3)",
              borderRadius: "var(--radius-sm)",
              padding: 20,
              fontFamily: "var(--font-mono)",
              fontSize: 13,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "100px 1fr",
                gap: "8px 16px",
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
        </AnimateIn>
        {/* Bio */}
        <AnimateIn delay={250}>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.8,
              color: "var(--fg-1)",
              maxWidth: 600,
            }}
          >
            <p style={{ marginBottom: 12 }}>
              Trained as an architect. Ended up in data science. Both fields reward the same things: thinking in systems, obsessive attention to detail, and knowing when something isn&apos;t finished yet.
            </p>
            <p style={{ color: "var(--fg-0)" }}>
              Looking for a team that builds things with a point too.
            </p>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   Contact (Formspree)
   ---------------------------------------------------------------- */

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
        <div style={sectionTitleStyle}>CONTACT</div>
      </AnimateIn>
      <AnimateIn delay={150}>
        {status === "sent" ? (
          <div style={{ color: "var(--green-primary)", fontSize: 14 }}>
            <span style={{ marginRight: 6 }}>●</span> message sent successfully. renzo will
            respond shortly.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            style={{ maxWidth: 480 }}
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
                  minHeight: 100,
                }}
              />
            </div>
            {status === "error" && (
              <div style={{ color: "var(--red-primary)", fontSize: 12 }}>
                error: message failed to send. try again or email renzorico10@gmail.com directly.
              </div>
            )}
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 13,
                padding: "10px 24px",
                background:
                  status === "sending" ? "var(--green-dim)" : "var(--green-primary)",
                color: "#0a0a0a",
                border: "1px solid var(--green-primary)",
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
      </AnimateIn>
    </div>
  );
}
