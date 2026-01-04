# Coding Standards

> All coding conventions, TypeScript rules, ESLint config, naming, and folder structure.

## TypeScript

### Strict Mode

- `strict: true` is enabled in `tsconfig.json`
- No `any` types unless absolutely necessary (document why)
- Use interfaces for object shapes, types for unions/primitives

### Type Definitions

```typescript
// ✅ CORRECT
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

// ❌ AVOID
const project: any = { ... };
```

### Imports

```typescript
// Order: React → Next → External → Internal → Types
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/lib/types';
```

## ESLint

### Configuration

- Extends: `next/core-web-vitals`, `next/typescript`
- Run before every commit: `npm run lint`

### Common Rules

| Rule | Setting |
|------|---------|
| No unused variables | Error |
| No console.log | Warn (remove in production) |
| Prefer const | Error |
| React hooks rules | Error |

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | SCREAMING_SNAKE | `MAX_PROJECTS` |
| CSS classes | kebab-case | `section-heading` |
| Directories | kebab-case | `ui/`, `sections/` |

## Folder Structure

```
my-portfolio/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Home page
│   ├── globals.css         # CSS variables & base styles
│   └── api/                # API routes
│
├── components/
│   ├── layout/             # Navbar, Footer, ThemeProvider
│   ├── sections/           # Hero, About, Experience, etc.
│   └── ui/                 # Reusable: Button, Card, etc.
│
├── lib/
│   ├── data/               # Static data (experience, projects)
│   ├── types.ts            # TypeScript interfaces
│   ├── constants.ts        # App-wide constants
│   └── utils.ts            # Utility functions
│
└── public/                 # Static assets
```

## File Organization

### Component Files

```typescript
// components/ui/Button.tsx

"use client"; // Only if needed

import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'outline';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  // Implementation
}
```

### Data Files

```typescript
// lib/data/projects.ts

import type { Project } from '@/lib/types';

export const projects: Project[] = [
  // Data here
];
```

## Git Practices

- Commit messages: `type: description` (e.g., `feat: add contact form`)
- Types: `feat`, `fix`, `refactor`, `docs`, `style`, `chore`
- Never commit `.env.local` or API keys
