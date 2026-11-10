/**
 * Strataix · Next.js font configuration
 *
 * Copy this into your Next.js app (e.g. `src/app/fonts.ts`) and wire the three
 * variables into <html> in `app/layout.tsx`:
 *
 *   import { plexSans, plexMono, michroma } from "./fonts";
 *   <html className={`${plexSans.variable} ${plexMono.variable} ${michroma.variable}`}>
 *
 * The CSS variables are referenced from tokens.css — do not rename them.
 */
import { IBM_Plex_Sans, IBM_Plex_Mono, Michroma } from "next/font/google";

export const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const michroma = Michroma({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-michroma",
  display: "swap",
});
