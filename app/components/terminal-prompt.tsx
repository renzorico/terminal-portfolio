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
      "",
      "  NAVIGATE                          INFO",
      "  ─────────────────────────         ─────────────────────────",
      "  ls              list projects     whoami        about renzo",
      "  cd projects     go to projects    skills        tech stack",
      "  ./contact.sh    contact form      cat about     read about",
      "",
      "  UTILITY",
      "  ─────────────────────────",
      "  clear           reset terminal",
      "  contact         show links",
      "",
    ],
  },
  whoami: {
    lines: [
      "  renzo.rico -- data scientist | python . llms . ml . nlp . sql",
      "  i build ai products that turn data into decisions.",
      "  barcelona. github.com/renzorico",
    ],
    navigateTo: "about",
  },
  ls: {
    lines: [
      "  drwxr-xr-x  ds-radar/",
      "  drwxr-xr-x  no-botes-tu-voto/",
      "  drwxr-xr-x  un-speeches/",
      "  drwxr-xr-x  the-london-bible/",
      "  drwxr-xr-x  legalize-co/",
      "  drwxr-xr-x  bjj-universe/",
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
      "  ML/AI    tensorflow  scikit-learn  nlp  llms  ai-agents  deep-learning",
      "  DATA     pandas  web-scraping  data-pipelines  gcp  supabase",
      "  VIZ      d3.js  three.js  maplibre  streamlit  matplotlib",
      "  INFRA    docker  git  linux  vercel  rest-apis  next.js",
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

const QUICK_COMMANDS = ["whoami", "ls", "skills", "contact"];

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

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    inputHistory.current.push(raw);
    setHistoryIndex(-1);

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    setHistory((prev) => {
      const newHistory: HistoryEntry[] = [...prev, { type: "input", text: raw }];
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
      return newHistory;
    });

    setInput("");
    onCommand?.(cmd);
    scrollTerminal();
  }, [navigateToSection, onCommand, scrollTerminal]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runCommand(input.trim());
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
    <div>
      <div
        style={{
          background: "var(--bg-0)",
          border: "1px solid var(--bg-4)",
          borderRadius: "var(--radius-lg)",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* Terminal title bar */}
        <div
          className="flex items-center"
          style={{
            padding: "10px 14px",
            background: "var(--bg-2)",
            borderBottom: "1px solid var(--bg-4)",
            gap: 8,
          }}
        >
          <div className="flex items-center" style={{ gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--fg-3)" }} />
          </div>
          <span style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--fg-2)", fontFamily: "var(--font-mono)" }}>
            renzo@local: ~ — try a command or click one below
          </span>
        </div>
      <div
        ref={containerRef}
        onClick={() => inputRef.current?.focus()}
        style={{
          padding: "14px 18px",
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          lineHeight: 1.8,
          maxHeight: 300,
          overflowY: "auto",
          cursor: "text",
        }}
      >
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
            placeholder="type a command..."
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
      </div>
      {/* Quick command chips + help on the right */}
      <div className="flex flex-wrap items-center gap-2" style={{ marginTop: 10 }}>
        {QUICK_COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              runCommand(cmd);
              inputRef.current?.focus();
            }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              padding: "4px 10px",
              background: "var(--bg-2)",
              border: "1px solid var(--fg-3)",
              borderRadius: "var(--radius-sm)",
              color: "var(--fg-1)",
              cursor: "pointer",
              transition: "all 150ms",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--green-dim)";
              e.currentTarget.style.color = "var(--green-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--fg-3)";
              e.currentTarget.style.color = "var(--fg-1)";
            }}
          >
            $ {cmd}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <button
          onClick={() => {
            runCommand("help");
            inputRef.current?.focus();
          }}
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            padding: "4px 10px",
            background: "transparent",
            border: "1px solid var(--fg-3)",
            borderRadius: "var(--radius-sm)",
            color: "var(--fg-2)",
            cursor: "pointer",
            transition: "all 150ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--amber-dim)";
            e.currentTarget.style.color = "var(--amber-primary)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--fg-3)";
            e.currentTarget.style.color = "var(--fg-2)";
          }}
        >
          ? help
        </button>
      </div>
    </div>
  );
}
