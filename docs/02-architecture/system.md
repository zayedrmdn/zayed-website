# System Architecture

> Project structure, tech stack, and the **Terminal/Premium** thematic architecture.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + CSS variables |
| Animations | Framer Motion |
| Theming | next-themes |
| Forms | React Hook Form + Zod |
| Email | Resend API |
| Icons | Lucide React |
| Deployment | Vercel |

## Design Architecture: "The Secure System"

The portfolio is designed as an immersive terminal/system interface, using specific metaphors for each section:

| Section | Metaphor | Key Features |
|---------|----------|--------------|
| **Experience** | Execution History | PID tracking, status logs, terminal-style timelines. |
| **Featured Work**| Git Repository | File trees, branch labels, README previews. |
| **Other Projects**| File Index | High-density grid, low-contrast "hidden" metadata. |
| **Skills** | System Modules | `MOD_0X` headers, filesystem paths, status lights. |
| **Contact** | Secure Channel | Split-pane CLI, encrypted uplink metaphors, live logging. |

## Project Structure

```
my-portfolio/
├── app/                         # Next.js App Router
│   ├── layout.tsx               # Root layout, providers, metadata
│   ├── page.tsx                 # Home page (single-page portfolio)
│   ├── globals.css              # CSS variables, base styles
│   └── api/
│       └── contact/
│           └── route.ts         # Contact form API endpoint
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Navigation with theme toggle
│   │   ├── Footer.tsx           # Footer with social links
│   │   └── ThemeProvider.tsx    # next-themes wrapper
│   │
│   ├── sections/
│   │   ├── Hero.tsx             # Hero section with intro
│   │   ├── About.tsx            # About section
│   │   ├── Experience.tsx       # "Execution History" timeline
│   │   ├── Projects.tsx         # "Git Repository" & "File Index"
│   │   ├── Skills.tsx           # "System Modules"
│   │   └── Contact.tsx          # "Secure Channel"
│   │
│   └── ui/
│       ├── Button.tsx           # Reusable button component
│       ├── Card.tsx             # Reusable card component
│       ├── AnimatedSection.tsx  # Scroll-triggered animations
│       ├── SectionHeading.tsx   # Consistent section headers
│       ├── ThemeToggle.tsx      # Theme switch button
│       └── ThemedImage.tsx      # Theme-aware images
│
├── lib/
│   ├── data/
│   │   ├── personal.ts          # Personal info, bio
│   │   ├── experience.ts        # Work experience entries
│   │   ├── projects.ts          # Project data
│   │   ├── skills.ts            # Skills by category
│   │   └── achievements.ts      # Certifications, awards
│   │
│   ├── types.ts                 # TypeScript interfaces
│   ├── constants.ts             # App-wide constants
│   └── utils.ts                 # Utility functions
│
├── public/                      # Static assets
└── [config files]               # next.config.ts, tailwind.config.ts, etc.
```

## Key Files

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, ThemeProvider, fonts, metadata |
| `app/globals.css` | CSS variables for theming, base styles |
| `tailwind.config.ts` | Tailwind customization |
| `lib/types.ts` | All TypeScript interfaces |
| `lib/constants.ts` | Centralized constants |

## Data Flow

```
lib/data/*.ts (static data)
        ↓
components/sections/*.tsx (render data + apply system metaphor)
        ↓
app/page.tsx (compose sections)
        ↓
app/layout.tsx (wrap with providers)
```

## API Routes

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/contact` | POST | Handle contact form submissions |

## Adding New Content

### New Section

1. Create component in `components/sections/NewSection.tsx`
2. Follow the **Terminal/Premium** design philosophy (see `docs/01-rules/design-philosophy.md`)
3. Use `AnimatedSection` wrapper for scroll animations
4. Import in `app/page.tsx`

### New Data Type

1. Define interface in `lib/types.ts`
2. Create data file in `lib/data/`
3. Import in relevant component
