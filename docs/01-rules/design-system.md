# Design System & Philosophy

> All design rules: Tailwind config, CSS variables, typography, spacing, and design philosophy.

---

## Part 1: Design Philosophy

### Core Mindset

This is a **premium, world-class portfolio**. Every pixel matters.

### FORBIDDEN Patterns

| Pattern | Why It's Bad |
|---------|--------------|
| Generic gradient cards | Overused, screams "AI-generated" |
| Floating dots/circles | Lazy decoration, adds nothing |
| Rainbow gradients | Unprofessional, distracting |
| Excessive blur/glassmorphism | Overused trend, slows performance |
| Basic layouts | No imagination, forgettable |
| Placeholder content | Looks unfinished, unprofessional |

### REQUIRED Standards

| Standard | Implementation |
|----------|----------------|
| Premium feel | Subtle shadows, refined spacing, elegant typography |
| Unique identity | Custom color palette, distinctive hover effects |
| Purposeful animation | Every animation serves UX, not decoration |
| Mobile-first | Design for mobile, enhance for desktop |
| Accessibility | Contrast ratios, keyboard navigation, focus states |

### Decision Framework

Before adding ANY visual element, ask:
1. Does this serve the user or just look "cool"?
2. Would a Fortune 500 company use this design?
3. Is this unique or copied from a template?
4. Does this work on mobile?

---

## Part 2: Tailwind Configuration

### CSS Variables Architecture

All colors defined in `globals.css`, NOT hardcoded in classes.

```css
/* globals.css */
:root {
  --background: 210 40% 98%;        /* slate-50 */
  --foreground: 222 47% 11%;        /* slate-900 */
  --card: 0 0% 100%;                /* white */
  --card-foreground: 222 47% 11%;
  --primary: 221 83% 53%;           /* blue-600 */
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96%;         /* slate-100 */
  --muted: 210 40% 96%;
  --muted-foreground: 215 16% 47%;  /* slate-600 */
  --border: 214 32% 87%;            /* slate-200 */
  --ring: 221 83% 53%;
}

.dark {
  --background: 222 47% 11%;        /* slate-950 */
  --foreground: 213 31% 91%;        /* slate-100 */
  --card: 217 33% 17%;              /* slate-900 */
  --primary: 217 91% 60%;           /* blue-400 */
  --muted-foreground: 215 20% 65%;  /* slate-400 */
  --border: 217 33% 17%;            /* slate-800 */
}
```

### Semantic Classes

| Use Case | Class | Notes |
|----------|-------|-------|
| Page background | `bg-background` | Auto-adapts to theme |
| Card background | `bg-card` | White in light, slate-900 in dark |
| Primary text | `text-foreground` | High contrast |
| Secondary text | `text-muted-foreground` | Subtle, for descriptions |
| Accent elements | `bg-primary text-primary-foreground` | CTAs, links |
| Borders | `border-border` | Subtle dividers |

### NEVER Use

```tsx
// ❌ FORBIDDEN - Hardcoded colors
bg-white bg-black text-white text-black
bg-gray-100 text-gray-500 bg-blue-600
dark:bg-slate-900 dark:text-white

// ✅ CORRECT - Semantic variables
bg-background bg-card text-foreground
text-muted-foreground bg-primary border-border
```

---

## Part 3: Typography Scale

### Hierarchy

| Level | Class | Usage |
|-------|-------|-------|
| H1 | `text-4xl md:text-5xl lg:text-6xl font-bold` | Page titles only |
| H2 | `text-3xl md:text-4xl font-bold` | Section headings |
| H3 | `text-xl md:text-2xl font-semibold` | Card titles |
| Body | `text-base md:text-lg` | Paragraphs |
| Small | `text-sm text-muted-foreground` | Captions, metadata |

### Font Stack

- **Headings**: `Inter Tight` or System Sans (Bold, tracking-tight)
- **Monospace (Terminal Accents)**: **JetBrains Mono** (Use for status badges, technical labels, versioning, logs, and buttons)
- **Body**: Default sans-serif (Geist Sans), optimized for readability

### Technical Aesthetic Rules

| Element | Style Rule |
|---------|------------|
| Badges | Monospace, `tracking-[0.2em]`, bold, high-contrast |
| Status Indicators | Glowing emerald, terminal-style label pairing |
| Underlines | Use SVG paths for custom 'hand-drawn' or 'technical' strokes |
| Logs | Use `text-xs font-mono text-muted-foreground` with `>` prefix |
| File Trees | Use tree structures with folder icons for technical context |

---

## Part 4: Spacing System

### Consistent Rhythm

| Element | Spacing |
|---------|---------|
| Section vertical | `py-16 md:py-24` |
| Container width | `max-w-7xl mx-auto px-4 md:px-6` |
| Card padding | `p-6 md:p-8` |
| Component gaps | `space-y-4` or `gap-4` |
| Between sections | `space-y-16 md:space-y-24` |

### Grid System

```tsx
// Standard responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

---

## Part 5: Component Patterns

### Cards

```tsx
// Premium card with hover
<div className="bg-card border border-border rounded-xl p-6 
                shadow-sm hover:shadow-lg hover:-translate-y-1 
                transition-all duration-300">
```

### Buttons

```tsx
// Primary CTA
<button className="bg-primary text-primary-foreground px-6 py-3 
                   rounded-lg font-medium hover:opacity-90 
                   transition-opacity">

// Secondary/Outline
<button className="border border-primary text-primary px-6 py-3 
                   rounded-lg font-medium hover:bg-primary/10 
                   transition-colors">
```

### Floating Indicators (Terminal Style)

```tsx
// Premium card-over-image style
<div className="bg-background/95 backdrop-blur-xl border border-white/10 
                shadow-[0_0_20px_rgba(0,0,0,0.3)] p-4 rounded-xl">
```

### System Log / Timeline (Experience Section)

```tsx
// Log entry style
<div className="font-mono text-sm border-l border-border pl-4">
  <span className="text-muted-foreground">PID:8492</span>
  <span className="text-primary font-bold">RUNNING</span>
</div>
```

### Codebase Explorer (Projects Section)

```tsx
// Repository card style
<div className="border border-border rounded-xl bg-card flex">
  <div className="w-64 border-r border-border bg-secondary/30">
    {/* File Tree */}
  </div>
  <div className="flex-1 p-6">
    {/* README Preview */}
  </div>
</div>
```

---

## Quick Checklist

Before committing ANY design change:

- [ ] Uses semantic color classes only (`bg-background`, not `bg-white`)
- [ ] No `dark:` prefixes (CSS variables handle this)
- [ ] Typography follows hierarchy scale
- [ ] Spacing uses consistent tokens
- [ ] Hover states are subtle, not excessive
- [ ] Mobile-first responsive classes used
- [ ] Design feels premium, not generic
