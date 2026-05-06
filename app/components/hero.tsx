"use client";

import { useState, useEffect } from "react";
import TerminalPrompt from "./terminal-prompt";

function useTypewriter(text: string, speed = 40, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return [displayed, done] as const;
}

export default function Hero() {
  const [title, titleDone] = useTypewriter("$ renzo.rico --about", 50, 300);

  return (
    <div
      className="flex flex-col justify-center"
      style={{ minHeight: "70vh" }}
    >
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2rem, 6vw, 3.8rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "var(--fg-0)",
          marginBottom: 12,
        }}
      >
        {title}
        {!titleDone && (
          <span
            style={{
              color: "var(--green-bright)",
              animation: "blink 1s step-end infinite",
            }}
          >
            {"\u2588"}
          </span>
        )}
      </h1>
      <p
        style={{
          fontSize: "var(--text-md, 1.125rem)",
          color: "var(--fg-1)",
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        data scientist · python · llms · ml · sql
        <br />
        i build things with a point. london.
      </p>
      <TerminalPrompt />
    </div>
  );
}
