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
      "Election platform that cuts through political noise so Colombians can vote based on facts.",
    tags: ["python", "web-scraping", "vercel"],
    metrics: "research · prompt engineering",
  },
  {
    title: "legalize-co",
    description:
      "Open-source contribution to make Colombian legislation readable for anyone.",
    tags: ["python", "data-pipelines", "git", "rest-apis"],
    metrics: "open-source · data engineering",
  },
  {
    title: "ds-radar",
    description:
      "Agentic pipeline that scrapes, scores, and ranks jobs based on how well they actually fit me.",
    tags: ["python", "ai-agents", "rest-apis", "cli"],
    metrics: "prompt engineering · automation",
  },
  {
    title: "the-london-bible",
    description:
      "Geospatial data project exploring London through interactive maps and visualizations.",
    tags: ["typescript", "next.js", "maplibre", "d3.js"],
    metrics: "supabase · geospatial",
  },
  {
    title: "bjj-universe",
    description:
      "Interactive 3D visualization of the Brazilian Jiu-Jitsu competitive universe.",
    tags: ["javascript", "three.js", "d3.js"],
    metrics: "data viz · 3d",
  },
  {
    title: "un-speeches",
    description:
      "NLP analysis of United Nations speeches using LLMs and text analytics.",
    tags: ["python", "nlp", "tensorflow", "gcp"],
    metrics: "deep learning · generative ai",
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

export function About() {
  return (
    <div>
      <AnimateIn>
        <div style={sectionLabelStyle}>$ cat about.json</div>
        <div style={sectionTitleStyle}>ABOUT</div>
      </AnimateIn>
      <AnimateIn delay={150}>
        <div
          style={{
            background: "var(--bg-1)",
            border: "1px solid var(--fg-3)",
            borderRadius: "var(--radius-sm)",
            padding: 24,
            fontSize: 14,
            lineHeight: 1.8,
            color: "var(--fg-1)",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div style={{ color: "var(--fg-2)" }}>{"// about.json"}</div>
          <div>{"{"}</div>
          <div style={{ paddingLeft: 20 }}>
            <span style={{ color: "var(--amber-primary)" }}>&quot;name&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>&quot;Renzo Rico&quot;</span>,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;role&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>&quot;Data Scientist&quot;</span>,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;headline&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>
              &quot;Python · LLMs · ML · SQL&quot;
            </span>
            ,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;location&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>&quot;London&quot;</span>,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;github&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>
              &quot;github.com/renzorico&quot;
            </span>
            ,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;background&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>
              &quot;Trained as an architect. Ended up in data science.&quot;
            </span>
            ,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;bio&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>
              &quot;I build things with a point. Both fields reward the same things: thinking
              in systems, obsessive attention to detail, and knowing when something isn&apos;t
              finished yet.&quot;
            </span>
            ,
            <br />
            <span style={{ color: "var(--amber-primary)" }}>&quot;looking_for&quot;</span>:{" "}
            <span style={{ color: "var(--green-primary)" }}>
              &quot;A team that builds things with a point too.&quot;
            </span>
          </div>
          <div>{"}"}</div>
        </div>
      </AnimateIn>
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
