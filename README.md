# AIStack — AI Tools Discovery Platform

The largest curated directory of AI tools. Built with Next.js 15, TypeScript, Tailwind CSS, Prisma, and PostgreSQL.

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS |
| Backend | Next.js API Routes |
| Database | PostgreSQL + Prisma ORM |
| Auth | NextAuth.js v5 (Google + GitHub) |
| Hosting | Vercel + Supabase (recommended) |

## Project Structure

```
aistack/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  ← Auth endpoints
│   │   ├── tools/               ← GET all tools (filter, search, paginate)
│   │   ├── tools/[id]/          ← GET single tool
│   │   ├── search/              ← Quick search endpoint
│   │   ├── reviews/             ← POST review
│   │   ├── favorites/           ← POST toggle favorite
│   │   └── categories/          ← GET all categories
│   ├── tools/                   ← Browse page
│   ├── tools/[slug]/            ← Tool detail page
│   ├── categories/              ← All categories
│   ├── trending/                ← Trending tools
│   ├── favorites/               ← User favorites
│   └── auth/signin/             ← Sign in page
├── components/
│   ├── Navbar.tsx
│   ├── ToolCard.tsx
│   ├── SearchBar.tsx            ← Live search with dropdown
│   ├── FilterBar.tsx            ← Category + pricing filters
│   └── ui/                      ← Badge, Button, Input
├── lib/
│   ├── prisma.ts                ← Prisma singleton
│   ├── auth.ts                  ← NextAuth config
│   └── utils.ts                 ← cn(), slugify(), formatCount()
└── prisma/
    ├── schema.prisma            ← Full DB schema
    └── seed.ts                  ← 12 sample tools + categories
```

## Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd aistack
npm install
```

### 2. Set up Environment Variables

Copy `.env.local` and fill in your values:

```env
DATABASE_URL="postgresql://user:password@host:5432/aistack"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# Google OAuth (console.cloud.google.com)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# GitHub OAuth (github.com/settings/developers)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

### 3. Set up Database

```bash
# Push schema to your PostgreSQL database
npx prisma db push

# Seed with 12 sample tools
npm run db:seed

# Optional: Open Prisma Studio to browse data
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

- **User** — Auth, profile, role (USER/ADMIN)
- **Tool** — Core tool data: name, slug, description, pricing, category, flags
- **Category** — 12 built-in categories (Writing, Coding, Image, etc.)
- **Tag / ToolTag** — Many-to-many tags
- **Review** — Star rating + comment, one per user per tool
- **Favorite** — User bookmarks
- **Account / Session / VerificationToken** — NextAuth tables

## API Reference

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tools` | GET | List tools. Query: `q`, `category`, `pricing`, `page`, `limit` |
| `/api/tools/:slug` | GET | Tool detail + reviews + tags |
| `/api/search?q=` | GET | Quick search (top 8 results) |
| `/api/categories` | GET | All categories with tool count |
| `/api/reviews` | POST | Create/update review (auth required) |
| `/api/favorites` | POST | Toggle favorite (auth required) |

## Deployment

### Vercel + Supabase (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Create a PostgreSQL database in [Supabase](https://supabase.com)
4. Add all environment variables in Vercel dashboard
5. Deploy — Vercel runs `npm run build` automatically

### After Deploy

```bash
# Run seed on production DB
DATABASE_URL="your-prod-db-url" npx prisma db seed
```

## Roadmap

- [ ] Admin panel (add/edit/approve tools)
- [ ] AI recommendation engine
- [ ] Tool comparison (side by side)
- [ ] Browser extension
- [ ] Prompt marketplace
- [ ] Workflow builder
- [ ] Programmatic SEO pages

## OAuth Setup

**Google:** [console.cloud.google.com](https://console.cloud.google.com) → Create project → OAuth 2.0 → Redirect URI: `http://localhost:3000/api/auth/callback/google`

**GitHub:** [github.com/settings/developers](https://github.com/settings/developers) → New OAuth App → Callback URL: `http://localhost:3000/api/auth/callback/github`
