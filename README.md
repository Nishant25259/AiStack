# AIStack — AI Tools Directory (No Database)

A fully static Next.js AI tools directory. **No database, no setup, no env vars needed.**  
Just clone → install → run. Deploy to Vercel in 2 minutes.

## Tech Stack

| Layer     | Tech                              |
|-----------|-----------------------------------|
| Framework | Next.js 15 (App Router)           |
| Language  | TypeScript                        |
| Styling   | Tailwind CSS + Custom design system |
| Data      | JSON files (zero database)        |
| Hosting   | Vercel (free tier works perfectly)|

## How the data works

All tools and categories live in plain JSON files:
- `data/tools.json` — 116 AI tools with name, description, pricing, tags, category
- `data/categories.json` — 15 categories with icon, color, description

Adding a new tool = add one object to `tools.json`. That's it.

## Quick Start

```bash
# 1. Clone
git clone <your-repo> && cd aistack

# 2. Install
npm install

# 3. Run
npm run dev
```

Open → http://localhost:3000 ✅  
**No .env file needed. No database. No OAuth setup required.**

## Deploy to Vercel (2 minutes)

```bash
# Push to GitHub
git init && git add . && git commit -m "init"
git remote add origin https://github.com/YOUR_USER/aistack.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com) → Import Project
2. Select your repo
3. Click **Deploy** — no env vars needed!

Live in ~60 seconds. 🚀

## Project Structure

```
aistack/
├── data/
│   ├── tools.json          ← Add/edit tools here
│   └── categories.json     ← Add/edit categories here
│
├── lib/
│   └── db.ts               ← Query helpers (getTools, getTool, searchTools...)
│
├── app/
│   ├── page.tsx            ← Homepage
│   ├── tools/page.tsx      ← Browse + filter + search
│   ├── tools/[slug]/       ← Tool detail page
│   ├── categories/         ← All categories
│   ├── trending/           ← Trending tools
│   └── api/                ← REST endpoints (also use JSON)
│
└── components/
    ├── Navbar.tsx           ← Sticky nav + live search modal
    ├── ToolCard.tsx         ← Tool card
    ├── FilterBar.tsx        ← Sidebar filters
    └── SearchBar.tsx        ← Inline search
```

## Adding a New Tool

Open `data/tools.json` and add an entry:

```json
{
  "id": "117",
  "name": "Your Tool Name",
  "slug": "your-tool-name",
  "description": "What this tool does in one sentence.",
  "website": "https://yourtool.com",
  "pricing": "FREE",
  "featured": false,
  "verified": false,
  "apiAvailable": false,
  "categorySlug": "coding",
  "tags": ["tag1", "tag2", "tag3"]
}
```

**Pricing options:** `"FREE"` | `"FREEMIUM"` | `"PAID"`

**Category slugs:** `chatbots` · `coding` · `image-generation` · `video` · `writing` · `presentations` · `audio` · `music` · `productivity` · `automation` · `research` · `website-builders` · `design` · `seo-marketing` · `students`

## API Endpoints

| Endpoint              | Description                                    |
|-----------------------|------------------------------------------------|
| `GET /api/tools`      | All tools. Params: `q`, `category`, `pricing`, `featured`, `page`, `limit` |
| `GET /api/tools/:slug`| Single tool by slug                            |
| `GET /api/search?q=`  | Live search — returns top 8 matches            |
| `GET /api/categories` | All categories with tool count                 |

## Available Scripts

```bash
npm run dev      # Start dev server on localhost:3000
npm run build    # Production build (runs in ~15s)
npm run start    # Serve production build
```
