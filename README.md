# Renzo Rico Portfolio — Design System

## Overview

**Product:** Renzo Rico's personal portfolio — a Data Science interactive portfolio styled as a terminal/CLI. Visitors navigate projects, skills, and experience through a bash-like interface.

**Target users:** Developers, data scientists, hiring managers in technical roles.

**Platforms:** Responsive web — mobile and desktop.

**Aesthetic:** Terminal / bash interface. Code-first, deliberately "nerdy." The entire experience should feel like navigating a sophisticated CLI that happens to have rich visual output. Pure terminal — no museum metaphor.

**Sources:** No external codebase or Figma provided. System built from the brief: *"code-style interface, bash-looking, obvious nerd project."*

---

## CONTENT FUNDAMENTALS

### Tone & Voice
- **Direct and technical.** Write like a developer README or man page — concise, precise, no fluff.
- **First person singular.** "I built…", "My work on…", "Run `renzo --about` to learn more."
- **Lowercase preference.** Section headers and UI labels use lowercase or ALLCAPS (like terminal output), never Title Case.
- **No emoji.** Use ASCII/unicode symbols instead: `→`, `│`, `├──`, `$`, `>`, `█`, `▓`, `░`.
- **Command metaphors.** Navigation feels like running commands: `cd projects/`, `cat resume.md`, `ls skills/`.
- **No museum metaphor.** Keep it pure terminal. Sections are just directories. The homepage is `~`, projects are `~/projects/`.

### Copy Examples
```
$ whoami
renzo.rico — data scientist, ml engineer, visual thinker

$ ls projects/
drwxr-xr-x  fraud-detection/
drwxr-xr-x  nlp-sentiment-engine/
drwxr-xr-x  real-time-dashboard/

$ cat about.md
# about

I turn messy data into clear decisions.
Based in [city]. Open to remote.
```

### Casing Rules
- Navigation labels: lowercase (`exhibits`, `about`, `contact`)
- Section titles: lowercase or UPPERCASE (`FEATURED EXHIBITS`)
- Body copy: standard sentence case
- Code/data: preserve original casing

---

## VISUAL FOUNDATIONS

### Color System
- **Dark-first.** Background is near-black (`#0a0a0a` to `#1a1a1a`). No light mode.
- **Terminal green** (`#00ff41` / `#00d632`) is the primary accent — used for prompts, active states, key CTAs. Use the bright variant sparingly (glow effects, cursor blink).
- **Amber** (`#ffb800`) is the secondary accent — used for highlights, warnings, featured content.
- **Cyan** (`#00bcd4`) for links and data visualization tertiary.
- **Purple** (`#9d4edd`) as a data-viz-only accent.
- **Neutrals** range from `#e0e0e0` (primary text) down to `#444444` (decorative borders). No pure white — the brightest text is light gray.

### Typography
- **Primary / body:** JetBrains Mono — clean monospace with excellent readability.
- **Display / headings:** Space Grotesk — geometric sans that pairs well with monospace; used only for h1/h2 display text to add contrast.
- **Fallback mono:** IBM Plex Mono.
- All UI text defaults to monospace. The portfolio should feel like a single-font system with Space Grotesk as a deliberate accent.
- **Scale:** 1.25 ratio modular scale from 16px base.

### Spacing
- 4px base unit. Tokens at 4/8/12/16/20/24/32/48/64/80px.
- Generous vertical spacing between sections (64–80px). Tight spacing within components (8–16px).
- Content max-width: ~900px (terminal-width feel, not full-bleed).

### Borders & Corners
- **Minimal corner radius.** 0–4px. Terminals don't have rounded corners. Use `2px` for subtle softening, `4px` max for cards. Pill radius only for tags/badges.
- **Borders:** 1px solid, using muted gray (`#444`). Green border for focus states.
- **No box shadows** in the traditional sense. Instead, use terminal-style **glow effects** — `box-shadow: 0 0 8px rgba(0,214,50,0.1)` for active/focused elements.

### Backgrounds
- Solid dark colors only. No gradients, no images, no patterns.
- Subtle differentiation via background shade steps (`#0a0a0a` → `#111` → `#1a1a1a` → `#242424`).
- Optional: faint scanline overlay (CSS repeating-linear-gradient, 1px lines at 10% opacity) for CRT effect on hero sections.

### Animation & Transitions
- **Typing effect** for key text reveals (typewriter at ~40ms/char).
- **Fade-in** for content sections (opacity 0→1, 200–400ms).
- **No bounces, no spring physics.** Easing is `cubic-bezier(0.4, 0, 0.2, 1)` — smooth and mechanical.
- **Cursor blink** — `step-end` animation, 1s cycle.
- **Hover states:** text elements get brighter color (green-bright or cyan-bright). No scale transforms.
- **Press states:** slight dim (opacity 0.8). No shrink.
- **Page transitions:** instant or typewriter-wipe (text clears line by line).

### Cards & Panels
- Cards = terminal windows. Dark bg (`#1a1a1a`), 1px border (`#444`), 2–4px radius max.
- Optional: title bar with three dots (not colored macOS dots — use gray/green monochrome dots or ASCII `[─]` `[□]` `[×]`).
- Inner padding: 16–24px.
- No drop shadows. Optional glow on hover.

### Hover & Interactive States
- **Hover:** text color shifts to `--green-bright` or `--cyan-bright`. Background may lighten one step.
- **Focus:** green border + subtle glow (`--shadow-glow-sm`).
- **Active/pressed:** opacity 0.8 or background darkens.
- **Disabled:** `--fg-2` color, no pointer events.

### Imagery
- **No photographs.** If images are needed, use ASCII art, data visualizations, or code screenshots.
- **Data viz** uses the palette: green, amber, cyan, purple on dark backgrounds.
- **Placeholder pattern:** use `░▒▓█` block characters or `[img: description]` in monospace.

### Layout
- Single-column primary layout (terminal feel).
- Max content width ~900px, centered.
- No sidebar navigation — use top-of-page command prompt or sticky terminal header.
- Grid layouts for exhibit cards (2–3 columns on desktop, 1 on mobile).
- All elements left-aligned. No centered text except for rare display moments.

---

## ICONOGRAPHY

- **No icon font or SVG icon library.** The system uses ASCII/Unicode characters as icons.
- **Common symbols:** `>` (prompt), `$` (shell), `│├──` (tree), `→` (arrow/link), `█▓░` (progress/placeholder), `[×]` (close), `[□]` (maximize), `[─]` (minimize), `⌘` (command).
- **No emoji.** Ever.
- **File type indicators:** use ls-style prefixes (`drwxr-xr-x`, `-rw-r--r--`).
- **Status indicators:** `●` (active/online — green), `○` (inactive — gray), `◐` (loading).
- If a real icon is absolutely needed, use Lucide icons via CDN (thin stroke style matches the aesthetic):
  `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@latest/font/lucide.min.css">`
  **Note:** This is a substitution — no original icon set was provided. Lucide's 1.5px stroke weight complements the terminal aesthetic.

### Logos
- No logo files were provided. The "logo" is the name rendered in monospace:
  ```
  renzo.rico
  ```
  Optionally with a prompt prefix: `$ renzo.rico`
- A more stylized version could use ASCII art for special placements.

---

## FILE INDEX

```
├── README.md                  ← this file
├── SKILL.md                   ← agent skill definition
├── colors_and_type.css        ← CSS custom properties + base styles
├── assets/                    ← (no provided assets; ASCII-only brand)
├── preview/                   ← design system preview cards
│   ├── colors-primary.html
│   ├── colors-neutral.html
│   ├── colors-semantic.html
│   ├── type-display.html
│   ├── type-body-code.html
│   ├── type-scale.html
│   ├── spacing.html
│   ├── borders-radii.html
│   ├── shadows-glow.html
│   ├── buttons.html
│   ├── cards-panels.html
│   ├── terminal-prompt.html
│   ├── form-inputs.html
│   ├── badges-tags.html
│   └── nav-header.html
└── ui_kits/
    └── portfolio/
        ├── README.md
        ├── index.html         ← interactive portfolio prototype
        ├── TerminalHeader.jsx
        ├── ExhibitCard.jsx
        ├── TerminalPrompt.jsx
        └── SkillsTable.jsx
```
