const TerminalPrompt = ({ onCommand }) => {
  const [history, setHistory] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(null);
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);

  const responses = {
    help: [
      '  whoami      about renzo',
      '  ls          list projects',
      '  skills      tech stack',
      '  contact     get in touch',
      '  clear       reset terminal',
    ],
    whoami: ['  renzo.rico — data scientist | python · llms · ml · sql', '  trained as an architect. ended up in data science.', '  london. github.com/renzorico'],
    ls: [
      '  drwxr-xr-x  no-botes-tu-voto/',
      '  drwxr-xr-x  legalize-co/',
      '  drwxr-xr-x  ds-radar/',
      '  drwxr-xr-x  the-london-bible/',
      '  drwxr-xr-x  bjj-universe/',
      '  drwxr-xr-x  un-speeches/',
    ],
    skills: [
      '  LANG     python  sql  javascript  typescript  bash',
      '  ML/AI    tensorflow  scikit-learn  nlp  llms  ai-agents',
      '  DATA     pandas  web-scraping  data-pipelines  gcp  supabase',
      '  VIZ      d3.js  three.js  maplibre  streamlit',
      '  INFRA    docker  git  linux  vercel  rest-apis',
    ],
    contact: ['  → github:   github.com/renzorico', '  → linkedin: linkedin.com/in/renzorico'],
  };

  const promptStyles = {
    container: {
      background: '#111111', border: '1px solid #444444', borderRadius: 2,
      padding: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
      lineHeight: 1.8, maxHeight: 340, overflowY: 'auto', cursor: 'text',
    },
    promptLine: { display: 'flex', alignItems: 'center' },
    user: { color: '#00ff41' },
    colon: { color: '#666666' },
    path: { color: '#00bcd4' },
    dollar: { color: '#666666', marginRight: 6 },
    input: {
      background: 'none', border: 'none', outline: 'none',
      color: '#e0e0e0', fontFamily: "'JetBrains Mono', monospace",
      fontSize: 13, flex: 1, padding: 0, caretColor: '#00ff41',
    },
    output: { color: '#a0a0a0' },
    error: { color: '#e53535' },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    const newHistory = [...history, { type: 'input', text: input }];

    if (cmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (responses[cmd]) {
      responses[cmd].forEach(line => newHistory.push({ type: 'output', text: line }));
    } else if (cmd) {
      newHistory.push({ type: 'error', text: `  bash: ${cmd}: command not found. type 'help' for commands.` });
    }

    setHistory(newHistory);
    setInput('');
    if (onCommand) onCommand(cmd);
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, 10);
  };

  const Prompt = () => (
    <>
      <span style={promptStyles.user}>renzo@local</span>
      <span style={promptStyles.colon}>:</span>
      <span style={promptStyles.path}>~</span>
      <span style={promptStyles.dollar}>$</span>
    </>
  );

  return (
    <div style={promptStyles.container} ref={containerRef}
         onClick={() => inputRef.current && inputRef.current.focus()}>
      <div style={promptStyles.output}>renzo.rico v2.0.1 — type 'help' for commands.</div>
      <div style={{ height: 8 }}></div>
      {history.map((entry, i) => (
        <div key={i}>
          {entry.type === 'input' ? (
            <div style={promptStyles.promptLine}><Prompt /><span style={{ color: '#e0e0e0' }}>{entry.text}</span></div>
          ) : (
            <div style={entry.type === 'error' ? promptStyles.error : promptStyles.output}>{entry.text}</div>
          )}
        </div>
      ))}
      <form onSubmit={handleSubmit} style={promptStyles.promptLine}>
        <Prompt />
        <input ref={inputRef} style={promptStyles.input} value={input}
               onChange={e => setInput(e.target.value)}
               spellCheck={false} autoComplete="off" />
      </form>
    </div>
  );
};

window.TerminalPrompt = TerminalPrompt;
