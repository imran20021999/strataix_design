# Strataix · design reference

This repo is the **design source of truth** for Strataix — the marketing site
(`strataix.in`) and the forthcoming dashboard app.

**Treat `design/` and `tokens.css` as read-only reference.** You do not ship
this repo. You *use* it to build other repos.

## When to read what

Before you write any Strataix UI, do this:

1. Open `tokens.css` first — every color, font, radius lives there as a CSS
   custom property and a Tailwind v4 `@theme` entry. **Never hard-code a hex
   value.** If you need a shade that isn't tokenized, add the token here
   first, then use it.
2. Find the matching page in `design/`:
   - Landing / Pricing / Docs / Changelog / Emails → `design/Strataix <Name>.dc.html`
   - Dashboard / Requests / Routes / Providers / Guardrails / Keys / Budgets /
     Alerts / Sessions → same name convention
   - Modals / drawers / forms / toasts → `design/Strataix Patterns.dc.html`
   - Loading / empty / error states → `design/Strataix States.dc.html`
   - ⌘K palette → `design/Strataix Palette.dc.html`
   - Mobile breakpoints → `design/Strataix Mobile.dc.html`
   - Onboarding flow → `design/Strataix Onboarding.dc.html`
   - Settings sub-pages → `design/Strataix Settings.dc.html` plus `Billing`,
     `Members`, `Integrations`, `Audit`
   - Full map of pages → `design/Strataix Sitemap.dc.html`
   - Voice, redlines, icons → `design/Strataix Handoff.dc.html`
   - Style guide → `design/Strataix Style Guide.dc.html`

## Rules the UI must follow

- **Fonts** — body **IBM Plex Sans**, display **Michroma** (used sparingly —
  headlines, section eyebrows), mono **IBM Plex Mono** (ids, numbers,
  timestamps, code). Load via `next/font/google`; see `fonts.ts`.
- **Numbers in columns use tabular figures** — add `font-variant-numeric:
  tabular-nums` or the `.sx-num` utility.
- **Status colors never fill a surface.** They appear only on small marks,
  dots, delta text, and narrow badges (`danger-tint` / `warn-tint` / `ok-tint`).
- **Michroma is for display only.** Never body text, never buttons, never
  inputs — its width breaks layout.
- **Radius** — 8 (`--radius-sx-lg`) for inputs, buttons, cards; 10–14 for
  section frames; 999 for pills; 50% for avatars and status dots.
- **Elevation** — flat (0), hover/active uses `--color-sx-raised`, overlays
  (tooltips, popovers, menus) use a shadow spec from the Style Guide.
- **Charts** — blue is series 1, violet series 2, neutral-600 series 3. Fill
  opacity 0.55 for stacked areas, 0.70 for the top layer. Thresholds use
  dashed danger lines.
- **Phosphor regular** is the only icon weight. Final set is in the Handoff
  page. Pair every icon with a text label.
- **Light theme is a first-class citizen** — every screen must render in both.
  Theme flips via `<html data-theme="light">`, set before paint.

## Workflow in a repo that depends on this

1. Add this repo as a sibling clone or a git submodule.
2. `@import "./path/to/strataix_design/tokens.css"` right after Tailwind's
   `@import "tailwindcss"`.
3. Copy `fonts.ts` into the app, wire it into `layout.tsx`.
4. When implementing a page, open the matching `design/` file side-by-side in
   your editor. Copy markup patterns and inline styles, then translate to
   semantic components with Tailwind utilities keyed to the tokens.

## What you do NOT do

- Do not add components or React code to this repo. This is a reference, not
  a component library. Components live in the app repos.
- Do not rename tokens. They are consumed by the design canvas and other
  repos.
- Do not change a page in `design/` by hand — these are snapshots of the
  canvas. If a design needs to change, update it on the canvas first and
  re-export.

## Reader notes

- Each `.dc.html` file includes external links to the canvas runtime and a
  design-system CSS bundle under `_ds/`. Those are harmless placeholders when
  the file is rendered standalone — treat them as metadata.
- Pages are authored at 1440 width; the Mobile page covers smaller
  breakpoints.
- The Handoff page carries engineering redlines, voice & tone rules, and the
  icon set. Read it once before your first PR.
