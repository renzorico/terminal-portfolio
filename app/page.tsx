import TerminalHeader from "./components/terminal-header";
import Hero from "./components/hero";
import { Exhibits, Archive, About, Contact } from "./components/sections";

const sectionStyle: React.CSSProperties = {
  maxWidth: 1100,
  margin: "0 auto",
  padding: "72px 24px",
};

const dividerStyle: React.CSSProperties = {
  borderTop: "1px solid var(--bg-3)",
};

export default function Home() {
  return (
    <>
      <div className="scanlines" />
      <TerminalHeader />
      <main>
        <section id="lobby" style={sectionStyle}>
          <Hero />
        </section>
        <section id="about" style={{ ...sectionStyle, ...dividerStyle }}>
          <About />
        </section>
        <section id="exhibits" style={{ ...sectionStyle, ...dividerStyle }}>
          <Exhibits />
        </section>
        <section id="archive" style={{ ...sectionStyle, ...dividerStyle }}>
          <Archive />
        </section>
        <section id="contact" style={{ ...sectionStyle, ...dividerStyle }}>
          <Contact />
        </section>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "40px 24px",
          fontSize: 11,
          color: "var(--fg-2)",
          borderTop: "1px solid var(--bg-3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", gap: 20, fontSize: 12 }}>
          <a href="https://github.com/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-1)", textDecoration: "none" }}>
            github
          </a>
          <a href="https://linkedin.com/in/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-1)", textDecoration: "none" }}>
            linkedin
          </a>
          <a href="mailto:renzorico10@gmail.com" style={{ color: "var(--fg-1)", textDecoration: "none" }}>
            email
          </a>
        </div>
        <div style={{ color: "var(--fg-3)" }}>renzorico · 2026</div>
      </footer>
    </>
  );
}
