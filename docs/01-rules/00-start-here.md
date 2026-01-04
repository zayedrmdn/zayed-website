# Portfolio Website - AI Agent Entry Point

> **PRIORITY**: This document is for AI coding agents. Read this FIRST before any modifications.

## Project Identity

- **Type**: Personal portfolio website
- **Stack**: Next.js 15 + TypeScript + Tailwind CSS + Framer Motion
- **Location**: Code lives in `my-portfolio/` directory

## Critical Constraints

### DO NOT

- Use hardcoded colors (e.g., `bg-white`, `text-gray-500`) → Use semantic classes only
- Use `dark:` prefix → CSS variables handle theming automatically
- Create generic/basic UI → Everything must be premium, world-class
- Use common AI patterns (gradient cards, floating dots, etc.)
- Skip TypeScript strict mode or ESLint rules
- Animate `width`, `height`, `margin` → Use `transform`, `opacity` only

### ALWAYS

- Use CSS variables: `bg-background`, `text-foreground`, `bg-primary`
- Follow existing component patterns in `components/`
- Keep animations under 1 second, use `viewport={{ once: true }}`
- Run `npm run lint` and `npm run build` before committing
- Centralize constants in `lib/constants.ts`

## File Reference

| Need | File |
|------|------|
| Coding rules | `docs/01-rules/coding.md` |
| Design philosophy | `docs/01-rules/design-philosophy.md` |
| Design system | `docs/01-rules/design-system.md` |
| Theming & animations | `docs/01-rules/implementation.md` |
| Project structure | `docs/02-architecture/system.md` |
| Setup & deployment | `docs/03-reference/setup.md` |

## Quick Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # Check for errors
```
