# Setup & Deployment

> Installation, environment variables, local development, and deployment.

## Prerequisites

- Node.js 18+
- npm or yarn
- Git

## Installation

```bash
# Clone repository
git clone <repo-url>
cd my-portfolio

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

Create `.env.local` in the `my-portfolio` directory:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | Yes | Resend API key for email |
| `EMAIL_FROM` | Yes | Sender email (e.g., `noreply@yourdomain.com`) |
| `EMAIL_TO` | Yes | Your email for receiving messages |
| `SITE_URL` | Yes | Your website URL |

Example `.env.local`:

```bash
RESEND_API_KEY=re_xxxxxxxxx
EMAIL_FROM=onboarding@resend.dev
EMAIL_TO=your-email@example.com
SITE_URL=https://yourwebsite.com
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Development Workflow

1. Create feature branch
2. Make changes
3. Run `npm run lint` to check for errors
4. Run `npm run build` to verify production build
5. Commit with conventional message (e.g., `feat: add new section`)
6. Push and create PR

## Deployment (Vercel)

### First-Time Setup

1. Connect GitHub repository to Vercel
2. Configure settings:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Add environment variables in Vercel dashboard
4. Deploy

### Automatic Deploys

- Push to `main` → Production deploy
- Push to other branches → Preview deploy

### Environment Variables in Vercel

Add the same variables from `.env.local`:

1. Go to Project Settings → Environment Variables
2. Add each variable
3. Select environments (Production, Preview, Development)

## Sitemap & SEO

Sitemap auto-generated via `next-sitemap`:

```js
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.SITE_URL,
  generateRobotsTxt: true,
};
```

Generate after build:

```bash
npm run postbuild
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Hydration mismatch | Check theme UI uses `mounted` state |
| Styles not updating | Clear `.next` cache, restart dev |
| Build fails | Run `npm run lint`, fix errors |
| Email not sending | Verify Resend API key and domain |

## Security Checklist

- [ ] `.env.local` in `.gitignore`
- [ ] No API keys in code
- [ ] Resend domain verified
- [ ] HTTPS enabled (Vercel default)
