# AIStack ⚡ — AI Tools Discovery Platform

AIStack is a high-performance, zero-database curation directory for AI tools (think "Product Hunt meets Google for AI tools"). Users can browse, search, and filter across a curated catalog of **291 tools** classified into **33 categories**.

To maintain instant startup, zero setup complexity, and fail-safe compilation inside sandboxed environments, the project uses a **Next.js static JSON data-layer model** instead of active database queries.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | High-speed React framework with static routes |
| **Language** | TypeScript | Strong typing for tools, categories, and query parameters |
| **Styling** | Tailwind CSS v4 + Custom CSS | Glassmorphism card effects and a dark-theme aesthetic |
| **Data Layer** | Static JSON | Reads directly from localized datasets |
| **Icons** | Lucide React | Clean, scalable vector outline icons |
| **Hosting** | Vercel | Instant deployments, no database connection variables needed |

---

## 📂 Project Structure

```
aistack/
├── data/
│   ├── tools.json          ← 291 AI tools dataset (Source of truth)
│   └── categories.json     ← 33 category metadata definitions
│
├── lib/
│   ├── db.ts               ← Query helper layer (getTools, searchTools, getTool...)
│   └── auth.ts             ← Authentication providers template
│
├── app/
│   ├── page.tsx            ← Homepage (Hero, statistics, categories grid, featured tools)
│   ├── tools/page.tsx      ← Directory list (Search, filter bar, pagination)
│   ├── tools/[slug]/       ← Pre-rendered static tool detail page
│   ├── categories/page.tsx ← Complete categories overview grid
│   ├── trending/page.tsx   ← Trending tools feed
│   ├── favorites/page.tsx  ← Saved/bookmarked tools (UI only)
│   ├── auth/signin/        ← Sign-in and onboarding portal (UI only)
│   ├── globals.css         ← Global CSS variables, utility tokens, and badges
│   └── api/                ← Static REST endpoints (tools, categories, search)
│
└── components/
    ├── Navbar.tsx          ← Global navigation header with keyboard shortcut (⌘K) live-search modal
    ├── ToolCard.tsx        ← Reusable product card with pricing badges and tags
    ├── FilterBar.tsx       ← Sidebar navigation filters (categories and pricing filter)
    └── SearchBar.tsx       ← Standard inline text input for queries
```

---

## 🚀 Quick Start

Get your developer environment up and running in three simple steps—no databases, APIs, or credentials needed:

```bash
# 1. Clone the repository
git clone <your-repo> && cd aistack

# 2. Install package dependencies
npm install

# 3. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view your local site.

---

## ⚡ Deployment to Vercel (2-minute Setup)

Since the project uses a static JSON configuration, you do not need to configure complex database hooks or connection strings during hosting.

1. Push your project to a remote GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initialize static AIStack build"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aistack.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com).
3. Import your `aistack` repository.
4. Click **Deploy**. Vercel will bundle and serve the app as a static site in less than a minute.

---

## ✍️ Adding or Editing Tools

All database records are stored inside `data/tools.json`. To add a new tool, append a new object to the array:

```json
{
  "id": "292",
  "name": "Your AI Tool",
  "slug": "your-ai-tool",
  "description": "A concise one-sentence summary explaining what the tool does.",
  "website": "https://example.com",
  "pricing": "FREEMIUM",
  "featured": false,
  "verified": true,
  "apiAvailable": false,
  "categorySlug": "coding",
  "tags": ["developer-tools", "productivity", "autocomplete"]
}
```

### Supported Values
*   **Pricing Options**: `"FREE"` | `"FREEMIUM"` | `"PAID"`
*   **Available Categories (`categorySlug`)**:
    `chatbots` · `coding` · `image-gen` · `video` · `writing` · `presentations` · `audio` · `music` · `productivity` · `automation` · `research` · `website-builders` · `design` · `seo-marketing` · `students` · `meeting-assistants` · `transcription` · `note-taking` · `resume-builders` · `interview-prep` · `email-assistants` · `sales` · `crm` · `pdf-doc-chat` · `spreadsheets` · `legal` · `finance` · `customer-support` · `ecommerce` · `creative-thumbnail-tools` · `translation` · `education` · `open-source-ai-platforms`

---

## 🌐 API Reference

AIStack exposes static GET endpoints under the `app/api/` router:

| Method | Endpoint | Query Parameters | Description |
|---|---|---|---|
| **GET** | `/api/tools` | `q` (string), `category` (slug), `pricing` (FREE/FREEMIUM/PAID), `featured` (true/false), `page` (number), `limit` (number) | Retrieves paginated lists of tools filtered by query matching |
| **GET** | `/api/tools/[slug]` | None | Fetches detailed metadata for a single tool matching the slug |
| **GET** | `/api/search` | `q` (string) | Fast search endpoint powering live search bars; returns top 8 matches |
| **GET** | `/api/categories` | None | Returns the list of all categories along with current tool counts |

---

## 💻 Available Scripts

*   `npm run dev` — Starts the Next.js development server locally.
*   `npm run build` — Compiles and builds the production project (runs dynamic static pre-rendering).
*   `npm run start` — Serves the compiled production build locally.
*   `npm run lint` — Runs ESLint checks across the codebase.
