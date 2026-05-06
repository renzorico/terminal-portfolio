const ExhibitCard = ({ title, description, tags = [], metrics = '', active = false, onClick }) => {
  const [hovered, setHovered] = React.useState(false);
  const isActive = active || hovered;

  const cardStyles = {
    wrapper: {
      background: '#1a1a1a',
      border: `1px solid ${isActive ? '#0a5c1f' : '#444444'}`,
      borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
      transition: 'border-color 200ms, box-shadow 200ms',
      boxShadow: isActive ? '0 0 8px rgba(0,214,50,0.1)' : 'none',
    },
    titleBar: {
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '8px 12px', background: '#242424',
      borderBottom: `1px solid ${isActive ? '#0a5c1f' : '#444444'}`,
      fontSize: 11, color: '#666666',
    },
    dot: (i) => ({
      width: 8, height: 8, borderRadius: '50%',
      border: '1px solid #444444',
      background: isActive && i === 0 ? '#00d632' : 'transparent',
    }),
    path: { marginLeft: 4, color: isActive ? '#00d632' : '#666666', fontSize: 11 },
    body: { padding: 14, fontSize: 13, lineHeight: 1.6, color: '#a0a0a0' },
    prompt: { color: '#00ff41', marginRight: 4 },
    desc: { color: '#e0e0e0' },
    metrics: { color: '#666666', fontSize: 11, marginTop: 6 },
    tags: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 },
    tag: (color, bg, border) => ({
      fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
      padding: '2px 7px', borderRadius: 2, letterSpacing: '0.05em',
      textTransform: 'uppercase', fontWeight: 500,
      color, background: bg, border: `1px solid ${border}`,
    }),
  };

  const tagColors = [
    ['#00d632', '#0d2b14', '#0a5c1f'],
    ['#00bcd4', '#001f24', '#004d56'],
    ['#e5a500', '#2b2000', '#5c4300'],
    ['#9d4edd', '#2a1040', '#7b2cbf'],
  ];

  return (
    <div style={cardStyles.wrapper}
         onMouseEnter={() => setHovered(true)}
         onMouseLeave={() => setHovered(false)}
         onClick={onClick}>
      <div style={cardStyles.titleBar}>
        {[0,1,2].map(i => <span key={i} style={cardStyles.dot(i)}></span>)}
        <span style={cardStyles.path}>~/projects/{title}</span>
      </div>
      <div style={cardStyles.body}>
        <div><span style={cardStyles.prompt}>&gt;</span><span style={cardStyles.desc}>{description}</span></div>
        {metrics && <div style={cardStyles.metrics}>{metrics}</div>}
        {tags.length > 0 && (
          <div style={cardStyles.tags}>
            {tags.map((tag, i) => {
              const [c, bg, b] = tagColors[i % tagColors.length];
              return <span key={tag} style={cardStyles.tag(c, bg, b)}>{tag}</span>;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

window.ExhibitCard = ExhibitCard;
