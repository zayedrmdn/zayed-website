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

### Timing Reference

| Element | Duration | Delay |
|---------|----------|-------|
| Page load elements | 0.6-0.8s | 0-0.4s stagger |
| Scroll reveal | 0.6s | 0s |
| Card hover | 0.3s | 0s |
| Button tap | 0.15s | 0s |

### NEVER Do

```tsx
// ❌ Infinite animations (distracting)
transition={{ repeat: Infinity }}

// ❌ Slow animations (blocks interaction)
transition={{ duration: 3 }}

// ❌ Large movements (nauseating)
initial={{ x: -200 }}

// ❌ Animate on every scroll (annoying)
viewport={{ once: false }}
```

### Accessibility

Always include in `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Part 3: Component Patterns

### Reusable AnimatedSection

```tsx
// components/ui/AnimatedSection.tsx
"use client";
import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

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

### Card Component

```tsx
// components/ui/Card.tsx
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = true, className = "" }: CardProps) {
  const baseStyles = "bg-card border border-border rounded-xl p-6";
  const hoverStyles = hover 
    ? "hover:shadow-lg hover:-translate-y-1 transition-all duration-300" 
    : "";

  return (
    <motion.div 
      className={`${baseStyles} ${hoverStyles} ${className}`}
      whileHover={hover ? { y: -5 } : undefined}
    >
      {children}
    </motion.div>
  );
}
```

### Section Heading

```tsx
// components/ui/SectionHeading.tsx
interface Props {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

---

## Part 4: Form Implementation

### React Hook Form + Zod

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message too short"),
});

type FormData = z.infer<typeof schema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span>{errors.name.message}</span>}
      {/* ... */}
    </form>
  );
}
```

---

## Quick Checklist

Before implementing any feature:

- [ ] Uses semantic CSS variable classes
- [ ] Animations use only `opacity`, `x`, `y`, `scale`, `rotate`
- [ ] All animations under 1 second
- [ ] `viewport={{ once: true }}` for scroll animations
- [ ] Mobile tap states with `whileTap`
- [ ] Reduced motion preference respected
- [ ] Theme UI checks `mounted` state
