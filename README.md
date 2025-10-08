# Portfolio Website

Personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS variables
- **Animations**: Framer Motion
- **Theming**: next-themes
- **Form**: React Hook Form + Zod validation
- **Email**: Resend API
- **Icons**: Lucide React

## Getting Started

Install dependencies:
```bash
npm install
```

Set up environment variables:
```bash
cp .env.example .env.local
# Add your Resend API key and other variables
```

Run development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Responsive design with mobile-first approach
- Light/dark theme with system preference detection
- Working contact form with email notifications
- Smooth animations and micro-interactions
- SEO optimized with proper meta tags
- Accessible with keyboard navigation support

## Environment Variables

Required variables in `.env.local`:

- `RESEND_API_KEY` - Your Resend API key for email functionality
- `EMAIL_FROM` - Sender email address
- `EMAIL_TO` - Your email address for receiving messages
- `SITE_URL` - Your website URL

## Deployment

The site is optimized for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## Project Structure

- `app/` - Next.js app router pages and API routes
- `components/` - React components organized by type
- `lib/` - Utilities, data, and configurations
- `public/` - Static assets and images
