import TerminalHeader from "./components/terminal-header";
import Hero from "./components/hero";
import { Exhibits, Skills, About, Contact } from "./components/sections";

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
        }}
      >
        built with {"\u2588\u2591\u2591"} by renzo.rico · 2024 · src available on github
      </footer>
    </>
  );
}
