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
  const [greeting, greetingDone] = useTypewriter("Renzo Rico", 60, 200);

  return (
    <div
      className="flex flex-col justify-center"
      style={{ minHeight: "70vh" }}
    >
      <div style={{ marginBottom: 6 }}>
        <span
          style={{
            fontSize: 11,
            color: "var(--fg-2)",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
          }}
        >
          data scientist · london
        </span>
      </div>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.2rem, 6vw, 3.8rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          color: "var(--fg-0)",
          marginBottom: 16,
        }}
      >
        {greeting}
        {!greetingDone && (
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
          marginBottom: 12,
          lineHeight: 1.7,
          maxWidth: 540,
        }}
      >
        I turn messy data into clear answers and working products.
        Python, ML, NLP, SQL — from collection to deployment.
      </p>
      <p
        style={{
          fontSize: 13,
          color: "var(--fg-2)",
          marginBottom: 32,
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      >
        Trained as an architect, now building with data. I care about the full pipeline: scraping, cleaning, modelling, and shipping something people actually use.
      </p>
      <TerminalPrompt />
    </div>
  );
}
