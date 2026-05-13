"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "lobby", label: "home" },
  { id: "about", label: "about" },
  { id: "exhibits", label: "projects" },
  { id: "approach", label: "approach" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
] as const;

export default function TerminalHeader() {
  const [activeSection, setActiveSection] = useState("lobby");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "rgba(17, 17, 17, 0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--bg-3)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          alignItems: "center",
          padding: "12px 24px",
          maxWidth: 1100,
        }}
      >
        {/* Brand — left column */}
        <button
          className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
          onClick={() => scrollTo("lobby")}
          style={{ padding: 0, justifySelf: "start" }}
        >
          <span style={{ color: "var(--fg-0)", fontWeight: 600, fontSize: 14, letterSpacing: "0.02em" }}>renzorico</span>
        </button>

        {/* Desktop nav — center column */}
        <nav className="hidden sm:flex items-center" style={{ gap: 6, justifySelf: "center" }}>
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="bg-transparent border-none cursor-pointer"
                style={{
                  color: isActive ? "var(--green-primary)" : "var(--fg-2)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  padding: "5px 10px",
                  borderRadius: "var(--radius-sm)",
                  background: isActive ? "var(--green-subtle)" : "transparent",
                  transition: "all 150ms",
                  letterSpacing: "0.02em",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Social links — right column (desktop) / hamburger (mobile) */}
        <div className="hidden sm:flex items-center" style={{ gap: 6, justifySelf: "end" }}>
          <a
            href="https://github.com/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-2)", fontSize: 12, fontFamily: "var(--font-mono)", textDecoration: "none", padding: "5px 6px", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
          >
            gh
          </a>
          <a
            href="https://linkedin.com/in/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-2)", fontSize: 12, fontFamily: "var(--font-mono)", textDecoration: "none", padding: "5px 6px", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
          >
            in
          </a>
        </div>

        {/* Mobile hamburger — right column */}
        <button
          className="sm:hidden bg-transparent border-none cursor-pointer"
          style={{
            color: "var(--fg-1)",
            fontSize: 18,
            fontFamily: "var(--font-mono)",
            justifySelf: "end",
          }}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "[x]" : "[=]"}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          className="flex flex-col sm:hidden"
          style={{
            background: "var(--bg-1)",
            borderBottom: "1px solid var(--bg-3)",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="bg-transparent border-none cursor-pointer text-left"
              style={{
                color: activeSection === item.id ? "var(--green-primary)" : "var(--fg-1)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                padding: "10px 24px",
                borderTop: "1px solid var(--bg-3)",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
