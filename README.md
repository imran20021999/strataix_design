# strataix_design

Design source of truth for [Strataix](https://strataix.in) — tokens, canvas
pages, voice & tone, icons.

**Also published** at [canvas.strataix.in](https://canvas.strataix.in) —
GitHub Pages auto-deploys the repo on every push to `main` so anyone can
browse the designs without cloning. Consuming repos (`strataix_web`, the
forthcoming dashboard app) import `tokens.css` into their build and read
`design/*.dc.html` as layout reference.

## What's in here

```
strataix_design/
├── tokens.css          # color · type · spacing · radius · shadow · dark + light
├── fonts.ts            # Next.js font setup for Plex Sans / Plex Mono / Michroma
├── CLAUDE.md           # instructions for Claude Code
├── design/             # 29 canvas pages as read-only HTML snapshots
│   ├── Strataix Landing.dc.html
│   ├── Strataix Dashboard.dc.html
│   ├── Strataix Style Guide.dc.html
│   └── … 26 more
└── patterns/           # extracted component snippets (KPI, table row, buttons)
```

## Using from another repo

### 1. Add as a sibling clone (simplest)

```bash
cd ~/code
git clone https://github.com/imran20021999/strataix_design.git
cd strataix_web   # or the app repo
```

Then in your Next.js app:

- Copy `tokens.css` into your app, or symlink it.
- In `src/app/globals.css`:

  ```css
  @import "tailwindcss";
  @import "../path/to/strataix_design/tokens.css";
  ```

- Copy `fonts.ts` into `src/app/fonts.ts` and wire it into `layout.tsx`:

  ```tsx
  import { plexSans, plexMono, michroma } from "./fonts";
  // ...
  <html className={`${plexSans.variable} ${plexMono.variable} ${michroma.variable}`}>
  ```

### 2. Add as a git submodule (if you want tracked version)

```bash
git submodule add https://github.com/imran20021999/strataix_design.git design
```

Now `design/tokens.css` and `design/design/*.dc.html` are available.

### 3. Using with Claude Code

Point Claude Code at this repo when building a Strataix screen:

```bash
# in the consuming repo
claude "build the pricing page — follow @../strataix_design/design/Strataix\ Pricing.dc.html using @../strataix_design/tokens.css"
```

Or add a line to your app's `CLAUDE.md`:

> When building any Strataix UI, first read the matching page in
> `../strataix_design/design/Strataix <Name>.dc.html` and use tokens from
> `../strataix_design/tokens.css`. Never hard-code colors.

Claude Code will then automatically reach into this repo on every turn.

## Pages in `design/`

| Page | What it covers |
|---|---|
| `Strataix Landing` | marketing landing hero + feature strips |
| `Strataix Wireframes` | low-fi page wireframes |
| `Strataix Hi-fi` | hi-fi direction with type & color |
| `Strataix Style Guide` | tokens visualised — color, type, spacing, radius |
| `Strataix Sitemap` | IA + 3 core user flows |
| `Strataix Onboarding` | 6-step first-run flow |
| `Strataix Dashboard` | Overview — the default app landing |
| `Strataix Requests` | request log + filters + detail drawer |
| `Strataix Sessions` | agent trace waterfall |
| `Strataix Routes` | route flow canvas + A/B split |
| `Strataix Providers` | connected provider cards |
| `Strataix Guardrails` | policies, blocks feed, categories |
| `Strataix Keys` | key table + audit |
| `Strataix Budgets` | caps, forecasts, overspend policy |
| `Strataix Alerts` | open/ack'd/resolved + detail pane |
| `Strataix Settings` | Appearance (theme + accent) + overview |
| `Strataix Billing` | plan + invoices + payment |
| `Strataix Members` | team table + invites + role matrix |
| `Strataix Integrations` | connected + available integrations |
| `Strataix Audit` | org-wide activity timeline |
| `Strataix States` | loading / empty / error patterns |
| `Strataix Mobile` | responsive breakdowns at 390 / 810 |
| `Strataix Patterns` | modals, drawers, forms, toasts |
| `Strataix Palette` | ⌘K command palette states |
| `Strataix Emails` | 6 transactional email templates |
| `Strataix Pricing` | public pricing page |
| `Strataix Docs` | public docs landing |
| `Strataix Changelog` | public changelog |
| `Strataix Handoff` | engineering redlines + voice + icons |

## Updating the design

These files are snapshots exported from the design canvas. To change a
design, update it on the canvas first and re-export the affected `.dc.html`
file into `design/`.

Token changes happen here, in `tokens.css`, first — then propagate on the
next build of consuming repos.
