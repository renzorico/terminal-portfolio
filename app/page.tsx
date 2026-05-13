import TerminalHeader from "./components/terminal-header";
import Hero from "./components/hero";
import { Approach, Exhibits, Skills, About, Contact } from "./components/sections";

const sectionStyle: React.CSSProperties = {
  maxWidth: 900,
  margin: "0 auto",
  padding: "64px 20px",
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
        <section id="approach" style={{ ...sectionStyle, ...dividerStyle }}>
          <Approach />
        </section>
        <section id="exhibits" style={{ ...sectionStyle, ...dividerStyle }}>
          <Exhibits />
        </section>
        <section id="skills" style={{ ...sectionStyle, ...dividerStyle }}>
          <Skills />
        </section>
        <section id="about" style={{ ...sectionStyle, ...dividerStyle }}>
          <About />
        </section>
        <section id="contact" style={{ ...sectionStyle, ...dividerStyle }}>
          <Contact />
        </section>
      </main>
      <footer
        style={{
          textAlign: "center",
          padding: "32px 20px",
          fontSize: 11,
          color: "var(--fg-2)",
          borderTop: "1px solid var(--fg-3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
          <a href="https://github.com/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-1)" }}>
            github
          </a>
          <a href="https://linkedin.com/in/renzorico" target="_blank" rel="noopener noreferrer" style={{ color: "var(--fg-1)" }}>
            linkedin
          </a>
          <a href="mailto:renzorico10@gmail.com" style={{ color: "var(--fg-1)" }}>
            email
          </a>
        </div>
        <div>renzo.rico · 2024</div>
      </footer>
    </>
  );
}
