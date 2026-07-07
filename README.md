<div align="center">

<img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
<img src="https://img.shields.io/badge/Tools-460%2B-8b5cf6?style=for-the-badge" />
<img src="https://img.shields.io/badge/Categories-39-f59e0b?style=for-the-badge" />
<img src="https://img.shields.io/badge/PRs-Welcome-34d399?style=for-the-badge" />

<br /><br />

# ⚡ AIStack

### The largest open-source AI tools discovery platform.
### Browse, search, and filter **460+ AI tools** across **39 categories** — all in one place.

<br />

**[🌐 Live Demo](https://ai-stack-ebon.vercel.app)** &nbsp;·&nbsp;
**[⭐ Star on GitHub](https://github.com/Nishant25259/AiStack)** &nbsp;·&nbsp;
**[🤝 Contribute](./CONTRIBUTING.md)** &nbsp;·&nbsp;
**[🐛 Report Bug](https://github.com/Nishant25259/AiStack/issues)**

</div>

---

## 🤔 Why I Built This

Every time I needed an AI tool — for coding, writing, design, meetings, legal, finance — I was jumping between Reddit threads, Twitter posts, and random blog articles. It was frustrating and time-consuming.

I always wanted **one place** where I could find every AI tool for every use case, with clear pricing info and zero friction.

So I built it.

> **AIStack** is a curated, community-maintained directory of AI tools — think *"Product Hunt meets Google, but only for AI"*. Zero database. Zero setup. Instant to deploy. Open for everyone to contribute.

---

## ✨ Features

- 🔍 **Instant Search** — Live search modal (⌘K) across 460+ tools by name, tag, or category
- 🗂️ **39 Categories** — From AI chatbots and code editors to legal tools and vector databases
- 💰 **Pricing Filters** — Filter by Free, Freemium, or Paid in one click
- ⭐ **Featured & Verified** — Hand-curated highlights across every category
- 📄 **Tool Detail Pages** — Individual static pages for every tool with tags, pricing, and direct links
- ⚡ **Zero Database** — Runs entirely on static JSON — no credentials, no setup, no cost
- 🚀 **Instant Deploy** — Live on Vercel in under 2 minutes with zero environment variables
- 🤝 **Open Source** — Add a tool by editing one JSON file and opening a PR

---

## 🛠️ Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | SSG + static route pre-rendering |
| Language | TypeScript | Fully typed tools, categories, and query params |
| Styling | Tailwind CSS v4 + Custom CSS | Dark theme, glassmorphism cards, CSS variables |
| Data Layer | Static JSON | `data/tools.json` + `data/categories.json` |
| Icons | Lucide React | Clean scalable vector icons |
| Deployment | Vercel | Zero-config, no env vars required |

---

## 📂 Project Structure

```
aistack/
│
├── data/
│   ├── tools.json              ← 460+ AI tools (source of truth)
│   └── categories.json         ← 39 category definitions with icons and colors
│
├── lib/
│   ├── db.ts                   ← Query layer: getTools(), getTool(), searchTools(), getCategories()
│   └── auth.ts                 ← Auth providers template (NextAuth ready)
│
├── app/
│   ├── page.tsx                ← Homepage — hero, stats bar, category grid, featured tools
│   ├── tools/
│   │   ├── page.tsx            ← Browse page — search, filters, pagination
│   │   └── [slug]/page.tsx     ← Static tool detail pages (pre-rendered for all 460 tools)
│   ├── categories/page.tsx     ← Full category grid with tool counts
│   ├── trending/page.tsx       ← Trending tools feed
│   ├── favorites/page.tsx      ← Saved tools (UI ready, auth coming soon)
│   ├── auth/signin/page.tsx    ← Sign-in portal (UI ready, auth coming soon)
│   ├── globals.css             ← Design tokens, CSS variables, badge styles, utility classes
│   └── api/
│       ├── tools/route.ts      ← GET /api/tools (filter, search, paginate)
│       ├── tools/[id]/route.ts ← GET /api/tools/:slug
│       ├── search/route.ts     ← GET /api/search?q=
│       └── categories/route.ts ← GET /api/categories
│
└── components/
    ├── Navbar.tsx              ← Sticky nav with ⌘K live search modal and scroll effects
    ├── ToolCard.tsx            ← Tool card with pricing badge, tags, featured flag
    ├── FilterBar.tsx           ← Sidebar filters (category + pricing)
    └── SearchBar.tsx           ← Inline search input with URL sync
```

---

## 🚀 Quick Start

No database. No environment variables. No configuration needed.

```bash
# 1. Clone the repository
git clone https://github.com/Nishant25259/AiStack.git
cd AiStack

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you're live. ✅

---

## ☁️ Deploy to Vercel (2 minutes)

Because this project uses static JSON — no database connection strings, no secrets, no `.env` file needed.

```bash
# Push to GitHub
git init
git add .
git commit -m "init: AIStack v1"
git branch -M main
git remote add origin https://github.com/Nishant25259/AiStack.git
git push -u origin main
```

Then:
1. Go to [vercel.com](https://vercel.com) → **Import Project**
2. Select your repository
3. Click **Deploy**

Your site is live in ~60 seconds. 🚀

---

## ✍️ Adding a Tool

All tools live in `data/tools.json`. To add a new tool, append a JSON object to the end of the array:

```json
{
  "id": "461",
  "name": "Your AI Tool",
  "slug": "your-ai-tool",
  "description": "One clear sentence describing what this tool does and who it is for.",
  "website": "https://yourtool.com",
  "pricing": "FREEMIUM",
  "featured": false,
  "verified": true,
  "apiAvailable": false,
  "categorySlug": "coding",
  "tags": ["developer-tools", "autocomplete", "productivity"]
}
```

### Pricing Values

| Value | When to use |
|---|---|
| `"FREE"` | Completely free, no paid plan |
| `"FREEMIUM"` | Free tier exists with paid upgrades |
| `"PAID"` | Paid only, no free tier |

### Available Category Slugs

```
chatbots · coding · image-generation · video · writing · presentations
audio · music · productivity · automation · research · website-builders
design · seo-marketing · students · meeting-assistants · transcription
note-taking · resume-builders · interview-prep · email-assistants · sales
crm · pdf-docs · spreadsheets · legal · finance · customer-support
ecommerce · creative-tools · translation · education · open-source-ai
code-editors · code-assistants · frontend-dev · backend-dev · databases · apis-docs
```

---

## 🌐 API Reference

AIStack exposes static GET endpoints under `app/api/`:

| Method | Endpoint | Query Params | Description |
|---|---|---|---|
| `GET` | `/api/tools` | `q`, `category`, `pricing`, `featured`, `page`, `limit` | Paginated filtered tool list |
| `GET` | `/api/tools/[slug]` | — | Single tool detail by slug |
| `GET` | `/api/search` | `q` | Live search — returns top 8 matches |
| `GET` | `/api/categories` | — | All categories with tool counts |

---

## 💻 Scripts

```bash
npm run dev      # Start local dev server → localhost:3000
npm run build    # Production build with static pre-rendering
npm run start    # Serve production build locally
npm run lint     # Run ESLint checks
```

---

## 🗺️ Roadmap

- [x] 460+ tools across 39 categories
- [x] Live search with ⌘K modal
- [x] Filter by category and pricing
- [x] Static tool detail pages (pre-rendered)
- [x] Vercel deployment (zero config)
- [ ] User authentication (NextAuth — Google + GitHub)
- [ ] Favorites with persistence
- [ ] User reviews and star ratings
- [ ] AI-powered tool recommendations
- [ ] Weekly "New Tools" newsletter
- [ ] Programmatic SEO pages (`/best-ai-tools-for-students` etc.)
- [ ] Submit a tool form (no PR needed)
- [ ] Browser extension

---

## 🤝 Contributing

Contributions are what make AIStack better for everyone. The whole project is designed to make contributing as easy as possible — **no backend, no database, just edit a JSON file.**

Please read **[CONTRIBUTING.md](./CONTRIBUTING.md)** for the full guide.

**Quick version:**
1. Fork the repo
2. Edit `data/tools.json` or `data/categories.json`
3. Validate your JSON at [jsonlint.com](https://jsonlint.com)
4. Open a Pull Request

Every ⭐ star, every PR, and every suggestion counts.

---

## 📊 Open Dataset

The full dataset is freely available for anyone to use in their own projects:

- `data/tools.json` — 460+ tools with name, slug, description, website, pricing, tags, and category
- `data/categories.json` — 39 categories with name, slug, icon (emoji), color (hex), and description

Feel free to use this data in your own projects. A credit or link back is appreciated but not required.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

You are free to use, copy, modify, merge, publish, distribute, and contribute to this project.

---

## 👨‍💻 Author

<div align="center">

<img src="https://github.com/Nishant25259.png" width="90" style="border-radius:50%" />

### Nishant Pawade

B.Tech Computer Science & Engineering · Gujarat, India

*"I built the platform I always wished existed."*

<br />

[![GitHub](https://img.shields.io/badge/GitHub-Nishant25259-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Nishant25259)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/nishant25259)
[![Live Site](https://img.shields.io/badge/Live-ai--stack--ebon.vercel.app-8b5cf6?style=flat-square&logo=vercel&logoColor=white)](https://ai-stack-ebon.vercel.app)

</div>

---

## 🌟 Show Your Support

If AIStack saved you time finding the right AI tool — give it a ⭐ on GitHub. It helps more people discover the project.

**[⭐ Star AIStack on GitHub](https://github.com/Nishant25259/AiStack)**

---

<div align="center">

Built with ❤️ by <a href="https://github.com/Nishant25259">Nishant Pawade</a> &nbsp;·&nbsp; <a href="https://ai-stack-ebon.vercel.app">ai-stack-ebon.vercel.app</a>

</div>
