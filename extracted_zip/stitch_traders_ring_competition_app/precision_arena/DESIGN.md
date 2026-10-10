---
name: Precision Arena
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#434655'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#747686'
  outline-variant: '#c4c5d7'
  surface-tint: '#2151da'
  primary: '#0037b0'
  on-primary: '#ffffff'
  primary-container: '#1d4ed8'
  on-primary-container: '#cad3ff'
  inverse-primary: '#b7c4ff'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#7f2500'
  on-tertiary: '#ffffff'
  tertiary-container: '#a73400'
  on-tertiary-container: '#ffc9b7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dce1ff'
  primary-fixed-dim: '#b7c4ff'
  on-primary-fixed: '#001551'
  on-primary-fixed-variant: '#0039b5'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#ffdbcf'
  tertiary-fixed-dim: '#ffb59c'
  on-tertiary-fixed: '#390c00'
  on-tertiary-fixed-variant: '#832700'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  stat-display:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  stat-display-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.02em
  stat-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-table-header:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an ultra-crisp, high-fidelity fintech environment built for competitive forex trading. The aesthetic rejects decorative trends—foregoing gradients, neon badges, and extraneous accent colors—in favor of rigorous clarity, optical alignment, and uncompromised data legibility.

The interface evokes institutional trust, high-stakes focus, and speed. Target users include competitive forex traders, prop firm participants, and strategy evaluators who demand fast comprehension of equity curves, drawdown percentages, and rank movements. The design style combines modern enterprise SaaS minimalism with crisp financial terminal ergonomics: hairline delineation, crisp surface isolation, tabular metric layouts, and a singular functional blue accent.

## Colors

The palette is strictly restrained to functional blue, architectural slates, and pure white. All UI communication relies on value contrast, hairline weight, and typographic hierarchy rather than competing color fills.

- **Primary (`#1D4ED8`)**: Used exclusively for actionable controls, active leaderboard states, active tabs, metric highlights, and primary key performance indicators.
- **Surface Canvas (`#F8FAFC`)**: Base application background, providing subtle separation from container surfaces.
- **Surface Elevation (`#FFFFFF`)**: Pure white backgrounds for dashboard cards, podium tiles, metric widgets, and data tables.
- **Text & Hierarchy**:
  - Primary Headers / Critical Metrics: `#0F172A` (Slate 900)
  - Body Text / Secondary Context: `#475569` (Slate 600)
  - Muted Captions / Column Headers / Empty States: `#94A3B8` (Slate 400)
- **Borders & Dividers**: `#E2E8F0` (Slate 200) for structural containers; `#CBD5E1` (Slate 300) for interactive form field boundaries and hover borders.
- **Rule**: Gradients are completely prohibited. Tonal depth is achieved solely via flat `#FFFFFF` containers bounded by 1px `#E2E8F0` lines against the `#F8FAFC` canvas.

## Typography

The typography uses Inter across all viewports and contexts. The scale prioritizes structural density and mathematical alignment over ornamental styling.

- **Tabular Figures**: All numerical metrics, ranks, returns, drawdowns, and timestamps must render with `font-feature-settings: "tnum" 1, "cv05" 1` enabled. This guarantees fixed-width column alignment across live-updating leaderboards.
- **Labels & Table Headers**: Set in uppercase with tracked spacing (`letterSpacing: 0.05em`) using `#94A3B8` to decouple metric names from primary numbers.
- **Metric Prominence**: Stat figures (`stat-display`, `stat-md`) employ negative letter spacing and tight line heights to visually anchor analytical dashboards.

## Layout & Spacing

The layout model is a structured 12-column grid anchored inside a maximum container width of `1440px`.

- **Desktop (>= 1024px)**: 12 columns with `1.5rem` gutters and `2rem` screen margins. Dashboards employ dense vertical rhythms (`space-md` between interrelated widgets; `space-xl` between modular sections).
- **Tablet (768px - 1023px)**: 8 columns with `1rem` gutters and `1.5rem` outer margins. Secondary sidebar panels collapse into full-width stacked zones.
- **Mobile (< 768px)**: 4 columns with `0.75rem` gutters and `1rem` margins. Complex data rows convert from wide tables into consolidated card layouts with vertical metric pairings.
- **Data Density**: Compact internal component padding (`0.75rem` vertical on table rows; `1.25rem` to `1.5rem` on cards) maintains high information density without visual crowding.

## Elevation & Depth

Visual hierarchy is constructed exclusively using **low-contrast hairlines** paired with **micro ambient shadows**. No heavy drop shadows, colored glow effects, or blurry skeuomorphic tiers are permitted.

- **Base Card Elevation**: Flat `#FFFFFF` container with a continuous `1px solid #E2E8F0` hairline border and a micro shadow: `0 1px 2px 0 rgba(15, 23, 42, 0.04)`.
- **Interactive / Hover Surface**: Hairline shifts subtly to `#CBD5E1` with elevation scaling to: `0 2px 4px -1px rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`.
- **Floating Overlays & Modals**: Used for account connection dialogues and filter flyouts: `1px solid #E2E8F0` with `0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.03)`.

## Shapes

The geometric framework is uniform and disciplined. Core interactive components, inputs, and container cards share consistent curvature without deviating into pill shapes or sharp brutalist edges.

- **Containers & Cards**: Standardized at `0.75rem` (12px) border radius (`rounded-xl` equivalent), establishing a modern fintech container rhythm.
- **Form Controls & Buttons**: Set to `0.5rem` (8px) border radius for focused mechanical utility.
- **Badges & Small State Chips**: Set to `0.375rem` (6px) or `0.5rem` (8px) border radius. Full circular pills are avoided to keep tabular lines crisp.

## Components

### Buttons
- **Primary**: Background `#1D4ED8`, text `#FFFFFF`, font weight 600, border radius `0.5rem`, padding `0.5rem 1rem`. Hover state `#1E40AF`. Active state `#1E3A8A`. No drop shadows.
- **Secondary / Outline**: Background `#FFFFFF`, text `#0F172A`, border `1px solid #E2E8F0`, hover background `#F8FAFC` and border `#CBD5E1`.
- **Ghost**: Background transparent, text `#475569`, hover text `#0F172A`, hover background `#F1F5F9`.

### Input Fields & Join-Code Forms
- **Field Base**: Background `#FFFFFF`, border `1px solid #E2E8F0`, border radius `0.5rem`, text `#0F172A`, placeholder `#94A3B8`. Padding `0.625rem 0.875rem`.
- **Focus**: Border `1px solid #1D4ED8`, outline `2px solid rgba(29, 78, 216, 0.15)`, outline-offset `0`.
- **Competition Code Input**: Centered, uppercase tracking, `stat-md` typography with single-character separated cells or continuous monospaced entry format.

### Checkboxes & Radio Controls
- **Unchecked**: Background `#FFFFFF`, border `1px solid #CBD5E1`, border radius `4px` (checkbox) or full circle (radio).
- **Checked**: Background `#1D4ED8`, border `1px solid #1D4ED8`, inner indicator `#FFFFFF`.

### Leaderboard Podium
- Top 3 competitor spotlight using structured white cards with `1px solid #E2E8F0`.
- **Rank Indicator**: Clean slate badges (`#0F172A` fill with white text for #1; `#F1F5F9` fill with `#475569` text for #2 and #3). Avoid gold/silver/bronze textures. Rank #1 card is elevated with a top border accent: `2px solid #1D4ED8`.

### Data Tables & Metric Lists
- **Header**: Background `#F8FAFC`, border bottom `1px solid #E2E8F0`, text `label-table-header` in `#94A3B8`.
- **Row**: Height `52px`, background `#FFFFFF`, border bottom `1px solid #F1F5F9`, hover background `#F8FAFC`.
- **Data Cells**: Numerical metrics rendered in `font-feature-settings: "tnum" 1`.

### Account Status & Connection Chips
- **Connected (MT4/MT5 Read-Only)**: Background `#EFF6FF`, border `1px solid #DBEAFE`, text `#1D4ED8`, font weight 500, font size `12px`.
- **Inactive / Idle**: Background `#F8FAFC`, border `1px solid #E2E8F0`, text `#64748B`.