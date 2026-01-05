# Implementation Guide

> Theming, animations, and component implementation patterns.

---

## Part 1: Theming with next-themes

### Setup

Theme provider wraps the app in `layout.tsx`:

```tsx
// app/layout.tsx
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Using Theme in Components

```tsx
"use client";
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

### Rules

| Rule | Implementation |
|------|----------------|
| No hydration mismatch | Always check `mounted` state before rendering theme UI |
| No hardcoded colors | Use semantic classes that read CSS variables |
| Theme persists | Stored in localStorage via `next-themes` |

---

## Part 2: Animations with Framer Motion

### Performance Rules

| ✅ ANIMATE | ❌ NEVER ANIMATE |
|-----------|-----------------|
| `opacity` | `width`, `height` |
| `x`, `y` (transform) | `margin`, `padding` |
| `scale` | `top`, `left` |
| `rotate` | `background` |

### Standard Patterns

#### Fade In Up (Most Common)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
```

#### Scroll Reveal

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6 }}
>
```

#### Staggered Children

```tsx
const container = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const item = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

<motion.div variants={container} initial="initial" animate="animate">
  {items.map(i => <motion.div key={i} variants={item} />)}
</motion.div>
```

#### Hover Effects

```tsx
<motion.div
  whileHover={{ y: -5, scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
```

---

## Part 3: Atmospheric Standards

To elevate the UI beyond generic digital "flatness", use layered atmospheric effects.

### 1. Grain Texture
Add a subtle SVG noise overlay to page headers or hero sections to create cinematic depth.
- **Opacity**: 0.03 - 0.05
- **Blend Mode**: `mix-blend-overlay`

### 2. Terminal Scanlines
Use for high-tech or engineer-focused sections.
- **Implementation**: CSS linear-gradient repeating pattern.
- **Opacity**: 0.01 - 0.02 (Must be extremely subtle)

### 3. Mouse-Following Spotlights
Use Framer Motion `useMotionValue` and `useMotionTemplate` for radial gradients.
- **Radius**: Large (600px - 900px)
- **Intensity**: Extremely low alpha (e.g., `hsl(var(--primary) / 0.08)`)

---

## Part 4: Terminal/Premium Component Patterns

To maintain the "System Interface" aesthetic, use these specialized patterns.

### 1. System Modules (Skills/Status)
Used for categorized lists or capability modules.

- **Header**: `font-mono text-[10px] tracking-widest text-primary` with a light indicator.
- **Path metadata**: `font-mono text-[10px] text-muted-foreground/50` (e.g., `~/src/languages`).
- **Tags**: Monospace, high-contrast, bold.

```tsx
<div className="border border-border/60 bg-card/60 backdrop-blur-sm rounded-xl overflow-hidden p-4">
  <div className="flex justify-between items-center mb-4 border-b border-border/40 pb-2">
    <div className="flex gap-2 items-center">
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      <span className="font-mono text-[10px] font-bold">MOD_01</span>
    </div>
    <span className="font-mono text-[10px] text-muted-foreground">~/src/core</span>
  </div>
  {/* Content */}
</div>
```

### 2. Secure Channel (Contact/Forms)
Used for user input and data transmission.

- **Split-Pane**: Left monitor (status) vs Right input (command line).
- **Prompt**: `guest@zayed:~$` in primary color.
- **Labels**: High-contrast, standard English (HR-friendly).
- **Button**: `SEND MESSAGE` or `EXECUTE_TRANSMISSION`.

```tsx
<div className="flex flex-col lg:flex-row border border-border rounded-lg overflow-hidden">
  {/* Monitor Panel */}
  <div className="w-1/3 bg-muted/30 border-r border-border p-6 font-mono text-xs">
    <div className="text-foreground font-bold">SYSTEM ONLINE</div>
    {/* Status logs */}
  </div>
  
  {/* Input Panel */}
  <div className="w-2/3 p-10 bg-background">
    <div className="flex items-baseline gap-2 mb-2">
       <span className="text-primary font-bold">guest@zayed:~$</span>
       <label className="font-bold">FULL NAME</label>
    </div>
    <input className="w-full bg-transparent border-b-2 border-border focus:border-primary" />
  </div>
</div>
```

### 3. Execution Logs (Experience)
Used for timelines or sequence-based data.

- **PID**: Randomly generated deterministic ID (e.g., `PID:8492`).
- **Timestamp**: High-contrast bold date.
- **Status badges**: `RUNNING`, `SUCCESS`, `DEPLOYED`.

---

## Part 5: Core UI Components

### Reusable AnimatedSection

```tsx
// components/ui/AnimatedSection.tsx
export function AnimatedSection({ children, delay = 0, className = "" }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Section Heading

```tsx
// components/ui/SectionHeading.tsx
export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

---

## Quick Checklist

Before implementing any feature:

- [ ] Does it follow a system metaphor (Module, Channel, Repository, Log)?
- [ ] Uses semantic CSS variable classes (no hardcoded colors)
- [ ] Animations use only `opacity`, `x`, `y`, `scale`, `rotate`
- [ ] All animations under 1 second
- [ ] `viewport={{ once: true }}` for scroll animations
- [ ] Mobile-first responsive classes used
- [ ] Typography follows hierarchy (monospaced for technical accents)
- [ ] Design feels premium and intentional (no "AI slop")
- [ ] Form labels are understandable for non-technical users
- [ ] Theme UI checks `mounted` state
