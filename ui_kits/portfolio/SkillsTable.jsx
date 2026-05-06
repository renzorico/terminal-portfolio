const SkillsTable = () => {
  const categories = [
    { cat: 'lang', items: ['python', 'sql', 'javascript', 'typescript', 'bash'] },
    { cat: 'ml/ai', items: ['tensorflow', 'scikit-learn', 'nlp', 'deep-learning', 'llms', 'ai-agents'] },
    { cat: 'data', items: ['pandas', 'web-scraping', 'data-pipelines', 'gcp', 'supabase'] },
    { cat: 'viz', items: ['d3.js', 'three.js', 'maplibre', 'streamlit', 'matplotlib'] },
    { cat: 'infra', items: ['docker', 'git', 'linux', 'vercel', 'rest-apis', 'cli'] },
    { cat: 'web', items: ['next.js', 'prompt-engineering', 'generative-ai'] },
  ];

  const sStyles = {
    wrapper: {
      fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
      lineHeight: 1.9, color: '#a0a0a0',
    },
    line: { display: 'flex' },
    prompt: { color: '#00ff41', marginRight: 6, userSelect: 'none' },
    cmd: { color: '#e0e0e0' },
    output: { paddingLeft: 20, color: '#a0a0a0' },
  };

  return (
    <div style={sStyles.wrapper}>
      {categories.map((cat) => (
        <React.Fragment key={cat.cat}>
          <div style={sStyles.line}>
            <span style={sStyles.prompt}>$</span>
            <span style={sStyles.cmd}>ls ~/.{cat.cat}/</span>
          </div>
          <div style={sStyles.output}>
            {cat.items.join('  ')}
          </div>
          <div style={{ height: 6 }}></div>
        </React.Fragment>
      ))}
    </div>
  );
};

window.SkillsTable = SkillsTable;
