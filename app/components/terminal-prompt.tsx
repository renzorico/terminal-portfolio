"use client";

import { useState, useRef, useCallback, type FormEvent, type KeyboardEvent } from "react";

/* ----------------------------------------------------------------
   Command definitions
   ---------------------------------------------------------------- */

type CommandResult = {
  lines: string[];
  /** Section ID to scroll to after output */
  navigateTo?: string;
};

const COMMANDS: Record<string, CommandResult> = {
  help: {
    lines: [
      "  whoami              about renzo",
      "  ls                  list projects",
      "  cd projects         go to projects",
      "  cat about.json      read about",
      "  skills              tech stack",
      "  ./contact.sh        contact form",
      "  clear               reset terminal",
    ],
  },
  whoami: {
    lines: [
      "  renzo.rico -- data scientist | python . llms . ml . sql",
      "  trained as an architect. ended up in data science.",
      "  london. github.com/renzorico",
    ],
    navigateTo: "about",
  },
  ls: {
    lines: [
      "  drwxr-xr-x  no-botes-tu-voto/",
      "  drwxr-xr-x  legalize-co/",
      "  drwxr-xr-x  ds-radar/",
      "  drwxr-xr-x  the-london-bible/",
      "  drwxr-xr-x  bjj-universe/",
      "  drwxr-xr-x  un-speeches/",
    ],
    navigateTo: "exhibits",
  },
  "cd projects": {
    lines: ["  navigating to ~/projects/ ..."],
    navigateTo: "exhibits",
  },
  "cd projects/": {
    lines: ["  navigating to ~/projects/ ..."],
    navigateTo: "exhibits",
  },
  "cat about.json": {
    lines: ["  opening about.json ..."],
    navigateTo: "about",
  },
  skills: {
    lines: [
      "  LANG     python  sql  javascript  typescript  bash",
      "  ML/AI    tensorflow  scikit-learn  nlp  llms  ai-agents",
      "  DATA     pandas  web-scraping  data-pipelines  gcp  supabase",
      "  VIZ      d3.js  three.js  maplibre  streamlit",
      "  INFRA    docker  git  linux  vercel  rest-apis",
    ],
    navigateTo: "skills",
  },
  "./contact.sh": {
    lines: ["  launching contact form ..."],
    navigateTo: "contact",
  },
  contact: {
    lines: [
      "  -> github:   github.com/renzorico",
      "  -> linkedin: linkedin.com/in/renzorico",
      "  -> email:    renzorico10@gmail.com",
      "",
      "  or run ./contact.sh to use the form",
    ],
  },
};

const COMMAND_NAMES = Object.keys(COMMANDS);

/* ----------------------------------------------------------------
   Types
   ---------------------------------------------------------------- */

type HistoryEntry = {
  type: "input" | "output" | "error" | "nav";
  text: string;
};

interface TerminalPromptProps {
  onCommand?: (cmd: string) => void;
}

/* ----------------------------------------------------------------
   Prompt prefix
   ---------------------------------------------------------------- */

function PromptPrefix() {
  return (
    <>
      <span style={{ color: "var(--green-bright)" }}>renzo@local</span>
      <span style={{ color: "var(--fg-2)" }}>:</span>
      <span style={{ color: "var(--cyan-primary)" }}>~</span>
      <span style={{ color: "var(--fg-2)", marginRight: 6 }}>$</span>
    </>
  );
}

/* ----------------------------------------------------------------
   Component
   ---------------------------------------------------------------- */

export default function TerminalPrompt({ onCommand }: TerminalPromptProps) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputHistory = useRef<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollTerminal = useCallback(() => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 10);
  }, []);

  const navigateToSection = useCallback((sectionId: string) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const cmd = raw.toLowerCase();

    if (!cmd) return;

    // Store in input history for up/down arrow
    inputHistory.current.push(raw);
    setHistoryIndex(-1);

    const newHistory: HistoryEntry[] = [...history, { type: "input", text: raw }];

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const result = COMMANDS[cmd];
    if (result) {
      result.lines.forEach((line) => newHistory.push({ type: "output", text: line }));
      if (result.navigateTo) {
        newHistory.push({
          type: "nav",
          text: `  -> scrolling to ${result.navigateTo}`,
        });
        navigateToSection(result.navigateTo);
      }
    } else {
      newHistory.push({
        type: "error",
        text: `  bash: ${cmd}: command not found. type 'help' for commands.`,
      });
    }

    setHistory(newHistory);
    setInput("");
    onCommand?.(cmd);
    scrollTerminal();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const hist = inputHistory.current;
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIndex =
        historyIndex === -1 ? hist.length - 1 : Math.max(0, historyIndex - 1);
      if (hist[newIndex]) {
        setHistoryIndex(newIndex);
        setInput(hist[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= hist.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(hist[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const match = COMMAND_NAMES.find((c) => c.startsWith(partial) && c !== partial);
      if (match) setInput(match);
    }
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
      <div style={{ color: "var(--fg-1)" }}>
        renzo.rico v2.0.1 -- type &apos;help&apos; for commands.
      </div>
      <div style={{ height: 8 }} />
      {history.map((entry, i) => (
        <div key={i}>
          {entry.type === "input" ? (
            <div className="flex items-center">
              <PromptPrefix />
              <span style={{ color: "var(--fg-0)" }}>{entry.text}</span>
            </div>
          ) : (
            <div
              style={{
                color:
                  entry.type === "error"
                    ? "var(--red-primary)"
                    : entry.type === "nav"
                      ? "var(--cyan-primary)"
                      : "var(--fg-1)",
              }}
            >
              {entry.text}
            </div>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center">
        <PromptPrefix />
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
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
