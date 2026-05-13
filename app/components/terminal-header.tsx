"use client";

import { useState } from "react";

const NAV_ITEMS = [
  { id: "lobby", label: "home" },
  { id: "approach", label: "approach" },
  { id: "exhibits", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
] as const;

export default function TerminalHeader() {
  const [activeSection, setActiveSection] = useState("lobby");
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: "var(--bg-1)",
        borderBottom: "1px solid var(--fg-3)",
        fontFamily: "var(--font-mono)",
      }}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{ padding: "12px 20px", maxWidth: 960 }}
      >
        {/* Brand */}
        <button
          className="flex items-center gap-1.5 cursor-pointer bg-transparent border-none"
          onClick={() => scrollTo("lobby")}
        >
          <span style={{ color: "var(--green-bright)", fontWeight: 700, fontSize: 15 }}>$</span>
          <span style={{ color: "var(--fg-0)", fontWeight: 500, fontSize: 14 }}>renzo.rico</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden sm:flex items-center gap-5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="bg-transparent border-none cursor-pointer"
              style={{
                color: activeSection === item.id ? "var(--green-primary)" : "var(--fg-1)",
                fontSize: 13,
                fontFamily: "var(--font-mono)",
                borderBottom:
                  activeSection === item.id
                    ? "1px solid var(--green-primary)"
                    : "1px solid transparent",
                paddingBottom: 2,
                transition: "color 150ms",
              }}
            >
              {item.label}
            </button>
          ))}
          <span style={{ width: 1, height: 16, background: "var(--fg-3)" }} />
          <a
            href="https://github.com/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-1)", fontSize: 13, fontFamily: "var(--font-mono)", textDecoration: "none", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
          >
            gh
          </a>
          <a
            href="https://linkedin.com/in/renzorico"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--fg-1)", fontSize: 13, fontFamily: "var(--font-mono)", textDecoration: "none", transition: "color 150ms" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--fg-0)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--fg-1)")}
          >
            in
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden bg-transparent border-none cursor-pointer"
          style={{
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
            borderBottom: "1px solid var(--fg-3)",
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
                padding: "10px 20px",
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
