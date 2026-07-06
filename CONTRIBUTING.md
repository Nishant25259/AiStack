# Contributing to AIStack 🤝

First of all — thank you for taking the time to contribute! AIStack is a community-driven project and every contribution, no matter how small, makes it better for everyone.

---

## Table of Contents

- [What can I contribute?](#what-can-i-contribute)
- [Adding a New Tool](#adding-a-new-tool)
- [Adding a New Category](#adding-a-new-category)
- [Fixing Existing Data](#fixing-existing-data)
- [How to Submit a Pull Request](#how-to-submit-a-pull-request)
- [Contribution Guidelines](#contribution-guidelines)
- [Good First Contributions](#good-first-contributions)

---

## What can I contribute?

| Type | Example |
|---|---|
| ➕ Add a new AI tool | Add Perplexity Pro, Claude Projects, etc. |
| 🗂️ Add a new category | AI Video Editing, AI HR Tools, etc. |
| ✏️ Fix a description | Improve an unclear or outdated description |
| 🔗 Fix a broken link | Update a tool's website URL |
| 💰 Fix pricing info | Mark a tool as Freemium instead of Paid |
| 🏷️ Add/fix tags | Add missing tags to a tool |
| ⭐ Fix featured/verified flags | Mark a popular tool as featured |
| 🐛 Report a bug | Open an issue for broken UI or wrong data |

---

## Adding a New Tool

All tools live in one file:

```
data/tools.json
```

Each tool is a JSON object. Add your tool to the **end of the array** (before the closing `]`).

### Tool Schema

```json
{
  "id": "459",
  "name": "Tool Name",
  "slug": "tool-name",
  "description": "One clear sentence describing what this tool does and who it's for.",
  "website": "https://toolwebsite.com",
  "pricing": "FREE",
  "featured": false,
  "verified": false,
  "apiAvailable": false,
  "categorySlug": "writing",
  "tags": ["tag1", "tag2", "tag3"]
}
```

### Field Reference

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | string | ✅ | Next number after the last tool in the file |
| `name` | string | ✅ | Official name of the tool |
| `slug` | string | ✅ | Lowercase, hyphen-separated, unique (e.g. `my-tool`) |
| `description` | string | ✅ | One sentence, max 160 characters, no hype words |
| `website` | string | ✅ | Full URL including `https://` |
| `pricing` | string | ✅ | Must be exactly `"FREE"`, `"FREEMIUM"`, or `"PAID"` |
| `featured` | boolean | ✅ | `true` only for well-known, widely used tools |
| `verified` | boolean | ✅ | `true` if the tool is actively maintained and real |
| `apiAvailable` | boolean | ✅ | `true` if the tool offers a public API |
| `categorySlug` | string | ✅ | Must match an existing category `id` in `categories.json` |
| `tags` | array | ✅ | 2–5 lowercase tags, hyphen-separated |

### Pricing Guide

| Value | When to use |
|---|---|
| `"FREE"` | Completely free, no paid plan required |
| `"FREEMIUM"` | Free tier exists but has paid upgrades |
| `"PAID"` | No free tier, paid subscription only |

### Example — Adding a Real Tool

```json
{
  "id": "459",
  "name": "Perplexity Pro",
  "slug": "perplexity-pro",
  "description": "AI-powered answer engine with real-time web search, citations, and Pro search for deep research.",
  "website": "https://perplexity.ai",
  "pricing": "FREEMIUM",
  "featured": true,
  "verified": true,
  "apiAvailable": true,
  "categorySlug": "chatbots",
  "tags": ["search", "citations", "research", "real-time"]
}
```

---

## Adding a New Category

Categories live in:

```
data/categories.json
```

### Category Schema

```json
{
  "id": "your-category-slug",
  "name": "AI Category Name",
  "slug": "your-category-slug",
  "icon": "🔥",
  "color": "#6366f1",
  "description": "Short description of what tools belong here."
}
```

> ⚠️ The `id` and `slug` must be identical and unique across all categories.

### Available Category Colors (pick one or use your own hex)

```
Purple    #6366f1    Blue      #3b82f6    Violet    #8b5cf6
Red       #ef4444    Amber     #f59e0b    Green     #10b981
Teal      #14b8a6    Pink      #ec4899    Orange    #f97316
Lime      #84cc16    Cyan      #06b6d4    Rose      #f43f5e
Yellow    #eab308    Emerald   #22c55e    Sky       #38bdf8
```

> **Note:** Only open a PR for a new category if you are also adding **at least 5 tools** to it.

---

## Fixing Existing Data

Find the tool in `data/tools.json` and edit the relevant field directly. No need to create an issue first for small fixes — just submit the PR.

Common fixes:
- Wrong pricing → update `"pricing"` field
- Outdated website → update `"website"` field
- Vague description → rewrite the `"description"` field (keep it under 160 chars)
- Missing tags → add to the `"tags"` array
- Tool has a public API → set `"apiAvailable": true`

---

## How to Submit a Pull Request

### Step 1 — Fork the repo

Click **Fork** on the top right of the GitHub page.

### Step 2 — Clone your fork

```bash
git clone https://github.com/YOUR_USERNAME/AiStack.git
cd AiStack
```

### Step 3 — Install and run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000` to preview your changes.

### Step 4 — Make your changes

Edit `data/tools.json` or `data/categories.json`.

### Step 5 — Verify your JSON is valid

Paste your edited file into [jsonlint.com](https://jsonlint.com) and confirm it shows **Valid JSON**.

Or run this in your terminal:

```bash
node -e "JSON.parse(require('fs').readFileSync('data/tools.json','utf8')); console.log('✅ Valid')"
```

### Step 6 — Commit and push

```bash
git add data/tools.json
git commit -m "feat: add [Tool Name] to [category] category"
git push origin main
```

### Step 7 — Open a Pull Request

Go to your fork on GitHub and click **Compare & pull request**.

Use this PR title format:
```
feat: add [Tool Name]          ← for new tools
fix: update [Tool Name] pricing
fix: correct [Tool Name] URL
feat: add [Category Name] category
```

---

## Contribution Guidelines

### ✅ Do

- Add tools that are **real, actively maintained, and publicly accessible**
- Keep descriptions **factual and neutral** — no marketing language
- Use the correct pricing tier — check the tool's actual pricing page
- Check that the `slug` is **unique** before submitting
- Make sure the `id` is the **next sequential number** after the last tool
- Keep tags **lowercase and hyphen-separated** (e.g. `"natural-language"` not `"Natural Language"`)

### ❌ Don't

- Add tools that are shutting down, abandoned, or invite-only with no public access
- Write descriptions with words like "revolutionary", "game-changing", or "best"
- Submit duplicate tools (search `tools.json` for the tool name first)
- Change other tools' data without a clear reason
- Add tools with fake/placeholder websites
- Submit more than 10 tools in a single PR (keep PRs focused)

---

## Good First Contributions

Not sure where to start? Here are some easy first contributions:

- 🔍 Search the internet for AI tools we're missing and add them
- ✏️ Find tools with vague descriptions and rewrite them clearly
- 🏷️ Add missing tags to tools that only have 1–2 tags
- 💰 Verify pricing for tools and fix any that are wrong
- ⭐ Set `"featured": true` for well-known tools that aren't marked yet

Browse the current tools at **[ai-stack-ebon.vercel.app](https://ai-stack-ebon.vercel.app)** to see what's already there.

---

## Questions?

Open an [issue on GitHub](https://github.com/Nishant25259/AiStack/issues) and tag it with the `question` label.

---

**Thank you for making AIStack better for everyone. Every star, every PR, every suggestion counts. 🙏**
