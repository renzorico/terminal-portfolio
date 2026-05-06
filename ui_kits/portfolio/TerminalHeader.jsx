const TerminalHeader = () => {
  const [activeSection, setActiveSection] = React.useState('lobby');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navItems = [
    { id: 'lobby', label: 'lobby' },
    { id: 'exhibits', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'about', label: 'about' },
    { id: 'contact', label: 'contact' },
  ];

  const headerStyles = {
    wrapper: {
      position: 'sticky', top: 0, zIndex: 100,
      background: '#111111', borderBottom: '1px solid #444444',
      fontFamily: "'JetBrains Mono', monospace",
    },
    inner: {
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px', maxWidth: 960, margin: '0 auto',
    },
    brand: { display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' },
    dollar: { color: '#00ff41', fontWeight: 700, fontSize: 15 },
    name: { color: '#e0e0e0', fontWeight: 500, fontSize: 14 },
    nav: { display: 'flex', gap: 20, alignItems: 'center' },
    link: (active) => ({
      color: active ? '#00d632' : '#a0a0a0', fontSize: 13,
      textDecoration: 'none', cursor: 'pointer',
      transition: 'color 150ms',
      borderBottom: active ? '1px solid #00d632' : '1px solid transparent',
      paddingBottom: 2,
    }),
    hamburger: {
      display: 'none', background: 'none', border: 'none',
      color: '#a0a0a0', fontSize: 18, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace",
    },
    mobileNav: {
      display: 'flex', flexDirection: 'column', gap: 0,
      background: '#111111', borderBottom: '1px solid #444444',
    },
    mobileLink: (active) => ({
      color: active ? '#00d632' : '#a0a0a0', fontSize: 13,
      textDecoration: 'none', cursor: 'pointer',
      padding: '10px 20px', borderTop: '1px solid #242424',
    }),
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setMobileOpen(false);
  };

  return (
    <header style={headerStyles.wrapper}>
      <div style={headerStyles.inner}>
        <div style={headerStyles.brand} onClick={() => scrollTo('lobby')}>
          <span style={headerStyles.dollar}>$</span>
          <span style={headerStyles.name}>renzo.rico</span>
        </div>
        <nav style={headerStyles.nav} className="desktop-nav">
          {navItems.map(item => (
            <a key={item.id} style={headerStyles.link(activeSection === item.id)}
               onClick={() => scrollTo(item.id)}>{item.label}</a>
          ))}
        </nav>
        <button style={headerStyles.hamburger} className="mobile-hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? '[×]' : '[≡]'}
        </button>
      </div>
      {mobileOpen && (
        <nav style={headerStyles.mobileNav} className="mobile-nav">
          {navItems.map(item => (
            <a key={item.id} style={headerStyles.mobileLink(activeSection === item.id)}
               onClick={() => scrollTo(item.id)}>{item.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
};

window.TerminalHeader = TerminalHeader;
