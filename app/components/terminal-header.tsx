"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "lobby", label: "home" },
  { id: "about", label: "about" },
  { id: "exhibits", label: "exhibits" },
  { id: "archive", label: "archive" },
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
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Brand — fixed width left */}
        <div style={{ width: 160, flexShrink: 0 }}>
          <button
            onClick={() => scrollTo("lobby")}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              color: "var(--fg-0)",
              fontWeight: 600,
              fontSize: 14,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-mono)",
            }}
          >
            renzorico
          </button>
        </div>

        {/* Desktop nav — flex:1, centered */}
        <nav
          className="hidden sm:flex"
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                style={{
                  background: isActive ? "var(--green-subtle)" : "none",
                  border: "none",
                  cursor: "pointer",
                  color: isActive ? "var(--green-primary)" : "var(--fg-2)",
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  padding: "5px 10px",
                  borderRadius: "var(--radius-sm)",
                  transition: "all 150ms",
                  letterSpacing: "0.02em",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Social links — fixed width right (desktop) */}
        <div
          className="hidden sm:flex"
          style={{
            width: 160,
            flexShrink: 0,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 6,
          }}
        >
          <a
            href="https://github.com/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-2)", fontSize: 12, textDecoration: "none", padding: "5px 6px", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
          >
            gh
          </a>
          <a
            href="https://linkedin.com/in/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-2)", fontSize: 12, textDecoration: "none", padding: "5px 6px", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-2)")}
          >
            in
          </a>
        </div>

        {/* Mobile hamburger — pushes to right */}
        <button
          className="sm:hidden"
          style={{
            marginLeft: "auto",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--fg-1)",
            fontSize: 18,
            fontFamily: "var(--font-mono)",
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
              style={{
                background: "none",
                border: "none",
                borderTop: "1px solid var(--bg-3)",
                cursor: "pointer",
                textAlign: "left",
                color: activeSection === item.id ? "var(--green-primary)" : "var(--fg-1)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                padding: "10px 24px",
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
