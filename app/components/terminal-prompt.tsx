"use client";

import { useState, useRef, type FormEvent } from "react";

const RESPONSES: Record<string, string[]> = {
  help: [
    "  whoami      about renzo",
    "  ls          list projects",
    "  skills      tech stack",
    "  contact     get in touch",
    "  clear       reset terminal",
  ],
  whoami: [
    "  renzo.rico -- data scientist | python . llms . ml . sql",
    "  trained as an architect. ended up in data science.",
    "  london. github.com/renzorico",
  ],
  ls: [
    "  drwxr-xr-x  no-botes-tu-voto/",
    "  drwxr-xr-x  legalize-co/",
    "  drwxr-xr-x  ds-radar/",
    "  drwxr-xr-x  the-london-bible/",
    "  drwxr-xr-x  bjj-universe/",
    "  drwxr-xr-x  un-speeches/",
  ],
  skills: [
    "  LANG     python  sql  javascript  typescript  bash",
    "  ML/AI    tensorflow  scikit-learn  nlp  llms  ai-agents",
    "  DATA     pandas  web-scraping  data-pipelines  gcp  supabase",
    "  VIZ      d3.js  three.js  maplibre  streamlit",
    "  INFRA    docker  git  linux  vercel  rest-apis",
  ],
  contact: [
    "  -> github:   github.com/renzorico",
    "  -> linkedin: linkedin.com/in/renzorico",
  ],
};

type HistoryEntry = {
  type: "input" | "output" | "error";
  text: string;
};

interface TerminalPromptProps {
  onCommand?: (cmd: string) => void;
}

function Prompt() {
  return (
    <>
      <span style={{ color: "var(--green-bright)" }}>renzo@local</span>
      <span style={{ color: "var(--fg-2)" }}>:</span>
      <span style={{ color: "var(--cyan-primary)" }}>~</span>
      <span style={{ color: "var(--fg-2)", marginRight: 6 }}>$</span>
    </>
  );
}

export default function TerminalPrompt({ onCommand }: TerminalPromptProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory: HistoryEntry[] = [...history, { type: "input", text: input }];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (RESPONSES[cmd]) {
      RESPONSES[cmd].forEach((line) => newHistory.push({ type: "output", text: line }));
    } else if (cmd) {
      newHistory.push({
        type: "error",
        text: `  bash: ${cmd}: command not found. type 'help' for commands.`,
      });
    }

    setHistory(newHistory);
    setInput("");
    onCommand?.(cmd);
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 10);
  };

  return (
    <div
      ref={containerRef}
      onClick={() => inputRef.current?.focus()}
      style={{
        background: "var(--bg-1)",
        border: "1px solid var(--fg-3)",
        borderRadius: "var(--radius-sm)",
        padding: 16,
        fontFamily: "var(--font-mono)",
        fontSize: 13,
        lineHeight: 1.8,
        maxHeight: 340,
        overflowY: "auto",
        cursor: "text",
      }}
    >
      <div style={{ color: "var(--fg-1)" }}>renzo.rico v2.0.1 -- type &apos;help&apos; for commands.</div>
      <div style={{ height: 8 }} />
      {history.map((entry, i) => (
        <div key={i}>
          {entry.type === "input" ? (
            <div className="flex items-center">
              <Prompt />
              <span style={{ color: "var(--fg-0)" }}>{entry.text}</span>
            </div>
          ) : (
            <div
              style={{
                color: entry.type === "error" ? "var(--red-primary)" : "var(--fg-1)",
              }}
            >
              {entry.text}
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center">
        <Prompt />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          style={{
            background: "none",
            border: "none",
            outline: "none",
            color: "var(--fg-0)",
            fontFamily: "var(--font-mono)",
            fontSize: 13,
            flex: 1,
            padding: 0,
            caretColor: "var(--green-bright)",
          }}
        />
      </form>
    </div>
  );
}
