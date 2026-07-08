// Theme catalog. Each theme is a coherent palette that maps to the CSS
// variables the whole site already consumes (see app/globals.css). The admin
// picks one; layout.tsx injects it at :root so every page + component re-skins
// with zero per-component changes. Pure data — safe in the client bundle.

export type Theme = {
  key: string;
  name: string;
  // Core palette
  primary: string;       // darkest brand colour (headings, dark sections, footer)
  primaryMid: string;    // mid gradient stop / hover
  primaryLight: string;  // bright brand accent (links, focus)
  accent: string;        // CTA / highlight colour (buttons, tags, numbers)
  accentLight: string;   // lighter accent (gradients, hover)
  accentInk: string;     // readable text colour ON an accent-filled button
  bg: string;            // page background (light)
  bgWarm: string;        // warm alt background
  text: string;          // primary text
  textMuted: string;     // secondary text
  border: string;        // hairlines / card borders
  // Hero / CTA dark gradient (3 stops, dark→light within the same family)
  heroA: string;
  heroB: string;
  heroC: string;
};

/* hex (#rrggbb) → "r, g, b" for use in rgba(var(--x), alpha). */
export function hexToRgb(hex: string): string {
  const h = hex.replace('#', '');
  const n = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
}

export const THEMES: Theme[] = [
  { key: 'midnight-gold',  name: 'Midnight Gold',  primary: '#0f2137', primaryMid: '#1a3a5c', primaryLight: '#2563a8', accent: '#e8a020', accentLight: '#fbbf24', accentInk: '#0f2137', bg: '#f5f7fa', bgWarm: '#fdfaf6', text: '#0f2137', textMuted: '#64748b', border: '#e2e8f0', heroA: '#0f2137', heroB: '#1a3a5c', heroC: '#1e4a7a' },
  { key: 'royal-purple',   name: 'Royal Purple',   primary: '#2e1065', primaryMid: '#4c1d95', primaryLight: '#7c3aed', accent: '#f59e0b', accentLight: '#fbbf24', accentInk: '#2e1065', bg: '#faf7ff', bgWarm: '#fdfcff', text: '#2e1065', textMuted: '#6b7280', border: '#ede9fe', heroA: '#2e1065', heroB: '#4c1d95', heroC: '#5b21b6' },
  { key: 'emerald-luxe',   name: 'Emerald Luxe',   primary: '#052e2b', primaryMid: '#065f46', primaryLight: '#059669', accent: '#eab308', accentLight: '#facc15', accentInk: '#052e2b', bg: '#f0fdf9', bgWarm: '#f7fefb', text: '#052e2b', textMuted: '#4b5563', border: '#d1fae5', heroA: '#052e2b', heroB: '#064e3b', heroC: '#065f46' },
  { key: 'ocean-teal',     name: 'Ocean Teal',     primary: '#083344', primaryMid: '#0e7490', primaryLight: '#06b6d4', accent: '#fb7185', accentLight: '#fda4af', accentInk: '#083344', bg: '#f0fdff', bgWarm: '#f5feff', text: '#083344', textMuted: '#475569', border: '#cffafe', heroA: '#083344', heroB: '#0e5a6e', heroC: '#0e7490' },
  { key: 'crimson-noir',   name: 'Crimson Noir',   primary: '#1c0a0a', primaryMid: '#7f1d1d', primaryLight: '#dc2626', accent: '#f59e0b', accentLight: '#fbbf24', accentInk: '#1c0a0a', bg: '#fef7f7', bgWarm: '#fffafa', text: '#1c0a0a', textMuted: '#57534e', border: '#fee2e2', heroA: '#1c0a0a', heroB: '#450a0a', heroC: '#7f1d1d' },
  { key: 'slate-electric', name: 'Slate Electric', primary: '#0f172a', primaryMid: '#1e293b', primaryLight: '#3b82f6', accent: '#38bdf8', accentLight: '#7dd3fc', accentInk: '#082f49', bg: '#f8fafc', bgWarm: '#fbfcfe', text: '#0f172a', textMuted: '#64748b', border: '#e2e8f0', heroA: '#0f172a', heroB: '#1e293b', heroC: '#334155' },
  { key: 'sunset-coral',   name: 'Sunset Coral',   primary: '#431407', primaryMid: '#9a3412', primaryLight: '#ea580c', accent: '#f43f5e', accentLight: '#fb7185', accentInk: '#431407', bg: '#fff7ed', bgWarm: '#fffbf5', text: '#431407', textMuted: '#78716c', border: '#fed7aa', heroA: '#431407', heroB: '#7c2d12', heroC: '#9a3412' },
  { key: 'forest-sage',    name: 'Forest Sage',    primary: '#14261c', primaryMid: '#2d4a37', primaryLight: '#4d7c5a', accent: '#d97706', accentLight: '#f59e0b', accentInk: '#14261c', bg: '#f5f7f4', bgWarm: '#fafcf9', text: '#14261c', textMuted: '#52525b', border: '#dce5dc', heroA: '#14261c', heroB: '#233b2c', heroC: '#2d4a37' },
  { key: 'indigo-dream',   name: 'Indigo Dream',   primary: '#1e1b4b', primaryMid: '#312e81', primaryLight: '#4f46e5', accent: '#ec4899', accentLight: '#f472b6', accentInk: '#1e1b4b', bg: '#f5f5ff', bgWarm: '#fafaff', text: '#1e1b4b', textMuted: '#6b7280', border: '#e0e7ff', heroA: '#1e1b4b', heroB: '#312e81', heroC: '#3730a3' },
  { key: 'rose-gold',      name: 'Rose Gold',      primary: '#3f1d2b', primaryMid: '#831843', primaryLight: '#be185d', accent: '#d4a373', accentLight: '#e6c9a8', accentInk: '#3f1d2b', bg: '#fdf2f8', bgWarm: '#fffafc', text: '#3f1d2b', textMuted: '#6b7280', border: '#fce7f3', heroA: '#3f1d2b', heroB: '#6b1739', heroC: '#831843' },
  { key: 'cyber-neon',     name: 'Cyber Neon',     primary: '#0a0f1e', primaryMid: '#111827', primaryLight: '#22d3ee', accent: '#a3e635', accentLight: '#bef264', accentInk: '#0a0f1e', bg: '#f7fafc', bgWarm: '#fbfdff', text: '#0a0f1e', textMuted: '#4b5563', border: '#e5e7eb', heroA: '#020617', heroB: '#0a0f1e', heroC: '#111827' },
  { key: 'amber-earth',    name: 'Amber Earth',    primary: '#292524', primaryMid: '#57534e', primaryLight: '#a8a29e', accent: '#f59e0b', accentLight: '#fbbf24', accentInk: '#292524', bg: '#fafaf9', bgWarm: '#fffdf8', text: '#292524', textMuted: '#78716c', border: '#e7e5e4', heroA: '#1c1917', heroB: '#292524', heroC: '#44403c' },
  { key: 'sky-fresh',      name: 'Sky Fresh',      primary: '#0c4a6e', primaryMid: '#0369a1', primaryLight: '#0ea5e9', accent: '#f97316', accentLight: '#fb923c', accentInk: '#0c4a6e', bg: '#f0f9ff', bgWarm: '#f7fcff', text: '#0c4a6e', textMuted: '#64748b', border: '#e0f2fe', heroA: '#0c4a6e', heroB: '#075985', heroC: '#0369a1' },
  { key: 'plum-wine',      name: 'Plum Wine',      primary: '#2a0e29', primaryMid: '#6b21a8', primaryLight: '#a21caf', accent: '#fb7185', accentLight: '#fda4af', accentInk: '#2a0e29', bg: '#fdf4ff', bgWarm: '#fffafe', text: '#2a0e29', textMuted: '#6b7280', border: '#f5d0fe', heroA: '#2a0e29', heroB: '#4a1d47', heroC: '#6b21a8' },
  { key: 'graphite-lime',  name: 'Graphite Lime',  primary: '#18181b', primaryMid: '#27272a', primaryLight: '#52525b', accent: '#84cc16', accentLight: '#a3e635', accentInk: '#18181b', bg: '#fafafa', bgWarm: '#fefefe', text: '#18181b', textMuted: '#71717a', border: '#e4e4e7', heroA: '#09090b', heroB: '#18181b', heroC: '#27272a' },
  { key: 'aqua-mint',      name: 'Aqua Mint',      primary: '#134e4a', primaryMid: '#0f766e', primaryLight: '#14b8a6', accent: '#f59e0b', accentLight: '#fcd34d', accentInk: '#134e4a', bg: '#f0fdfa', bgWarm: '#f5fefc', text: '#134e4a', textMuted: '#52525b', border: '#ccfbf1', heroA: '#134e4a', heroB: '#115e59', heroC: '#0f766e' },
  { key: 'burgundy-cream', name: 'Burgundy Cream', primary: '#3b0a1e', primaryMid: '#881337', primaryLight: '#be123c', accent: '#ca8a04', accentLight: '#eab308', accentInk: '#fffbf5', bg: '#fffbf5', bgWarm: '#fffdfa', text: '#3b0a1e', textMuted: '#6b7280', border: '#fecdd3', heroA: '#3b0a1e', heroB: '#5c0f2c', heroC: '#881337' },
];

export const DEFAULT_THEME_KEY = 'midnight-gold';

export function getTheme(key?: string): Theme {
  return THEMES.find((t) => t.key === key) || THEMES[0];
}

/**
 * Build the CSS custom-property overrides for a theme. Injected into a <style>
 * tag on :root in layout.tsx. Because the whole site reads these variables,
 * one injection re-skins everything.
 */
export function themeCssVars(theme: Theme): string {
  const heroGrad = `linear-gradient(150deg, ${theme.heroA} 0%, ${theme.heroB} 55%, ${theme.heroC} 100%)`;
  return `:root{
  --primary:${theme.primary};
  --primary-mid:${theme.primaryMid};
  --primary-light:${theme.primaryLight};
  --accent:${theme.accent};
  --accent-light:${theme.accentLight};
  --accent-ink:${theme.accentInk};
  --accent-rgb:${hexToRgb(theme.accent)};
  --bg:${theme.bg};
  --bg-warm:${theme.bgWarm};
  --text:${theme.text};
  --text-muted:${theme.textMuted};
  --border:${theme.border};
  --hero-grad:${heroGrad};
  --hero-rgb:${hexToRgb(theme.primary)};
}`;
}
