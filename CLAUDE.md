# Strataix · design reference

This repo is the **design source of truth** for Strataix — the marketing
site (`strataix.in`) and the forthcoming dashboard app.

**It is also published**, as a browsable reference, at
[canvas.strataix.in](https://canvas.strataix.in) via GitHub Pages (see
`.github/workflows/pages.yml`). Consuming repos pull `tokens.css` into
their own build and read `design/*.dc.html` as layout reference.

## How to find things

Before you write any Strataix UI:

1. Open `tokens.css` first. Every color, font, radius, shadow, spacing
   value lives there. **Never hard-code a hex value.** If you need a
   value that isn't tokenized, add the token here first.
2. Open the matching page in `design/`:
   - Landing / Pricing / Docs / Changelog / Emails → `design/Strataix <Name>.dc.html`
   - Dashboard / Requests / Routes / Providers / Guardrails / Keys /
     Budgets / Alerts / Sessions → same name convention
   - Modals / drawers / forms / toasts → `design/Strataix Patterns.dc.html`
   - Loading / empty / error states → `design/Strataix States.dc.html`
   - ⌘K palette → `design/Strataix Palette.dc.html`
   - Mobile breakpoints → `design/Strataix Mobile.dc.html`
   - Onboarding flow → `design/Strataix Onboarding.dc.html`
   - Settings sub-pages → `design/Strataix Settings.dc.html` plus
     `Billing`, `Members`, `Integrations`, `Audit`
   - Full map of pages → `design/Strataix Sitemap.dc.html`
   - Voice, redlines, icons → `design/Strataix Handoff.dc.html`
   - Style guide → `design/Strataix Style Guide.dc.html`

## Token naming · both conventions resolve to the same value

The snapshots in `design/*.dc.html` use plain names (`--sx-muted`,
`--font-body`, `--radius-md`, `--shadow-md`).

Tailwind v4 wants prefixed names (`--color-sx-muted`, `--font-sans`,
`--radius-sx-lg`) inside `@theme` to emit utilities.

`tokens.css` defines the prefixed names inside `@theme` and aliases the
plain names to them in `:root`. Both work. Pick based on where you're
writing:

- In a React component with Tailwind utilities → use `bg-sx-muted`,
  `rounded-sx-lg`, `font-sans`.
- Copying inline styles from a snapshot → use `var(--sx-muted)`,
  `var(--radius-md)`, `var(--shadow-md)` as written.

## Rules the UI must follow

- **Fonts** — body **IBM Plex Sans**, display **Michroma** (used
  sparingly for headlines + section eyebrows), mono **IBM Plex Mono**
  (ids, numbers, timestamps, code). Load via `next/font/google` — see
  `fonts.ts`.
- **Numbers in columns** use `font-variant-numeric: tabular-nums` or
  the `.sx-num` utility.
- **Status colors never fill a surface.** They appear only on small
  marks, dots, delta text, and narrow badges — pair with
  `color-mix(..., 16%, transparent)` for the badge background.
- **Michroma is display-only.** Never body text, never buttons,
  never inputs.
- **Radius** — `--radius-md` (8) for inputs / buttons / cards;
  `--radius-lg` / `--radius-xl` (10–14) for section frames;
  `--radius-full` for pills; `50%` for avatars and status dots.
- **Elevation** — flat on the page, hover/active uses `--sx-raised`,
  overlays (tooltips, popovers, menus, toasts) use `--shadow-md` or
  `--shadow-lg`.
- **Charts** — blue is series 1, violet series 2, neutral series 3.
  Stacked area fill opacity 0.55, top layer 0.70. Thresholds use
  dashed danger lines.
- **Phosphor regular** is the only icon weight. Final set is in the
  Handoff page. Pair every icon with a text label.

## Light theme · heads up

Light-theme token values are defined in `tokens.css` under
`:root[data-theme="light"]`. **None of the 29 snapshots have been
drawn in light mode yet** — they're dark-only visual references. When
implementing a page:

1. Use the dark snapshot for layout, copy, and component composition.
2. Let the token system provide light colors automatically — `<html
   data-theme="light">` flips every `var(--sx-*)` reference.
3. Watch oklch semantic colors (`--sx-danger` / `--sx-warn` /
   `--sx-ok`) — they have distinct values per theme, not a mechanical
   darkening. If something looks wrong, check tokens.css.

## Workflow in a repo that depends on this

1. Add as a sibling clone or git submodule.
2. `@import "./path/to/strataix_design/tokens.css"` right after
   Tailwind's `@import "tailwindcss"`.
3. Copy `fonts.ts` into the app, wire it into `layout.tsx`.
4. When implementing a page, open the matching `design/` file
   side-by-side. Copy inline styles verbatim — the `var(--sx-*)`
   references resolve against tokens.css automatically.

## What you don't do here

- Do not add React components or app code to this repo. Those belong
  in the app repos.
- Do not rename tokens. Both conventions are consumed as-is by
  snapshots, Tailwind utilities, and dependent repos.
- Do not hand-edit a page in `design/` to make a visual change. The
  snapshots represent the design canvas — update the design there and
  re-export.

## Reader notes

- The 4 earliest pages (Landing, Dashboard, Hi-fi, Wireframes) were
  rewritten as standalone HTML. Everything else was authored
  standalone from the start.
- Pages are 1440 wide; the Mobile page covers smaller breakpoints.
- The Handoff page carries engineering redlines, voice & tone, and
  the icon set. Read it once before your first PR.
