import { getTools, getCategories } from '@/lib/db';

export async function GET() {
  const base = 'https://ai-stack-ebon.vercel.app';

  // gather urls: homepage, categories, tools, main listing
  const urls = new Set<string>();
  urls.add(`${base}/`);
  urls.add(`${base}/tools`);
  urls.add(`${base}/categories`);

  const categories = getCategories();
  categories.forEach((c) => urls.add(`${base}/tools?category=${c.slug}`));

  const allTools = getTools({ limit: 10000 }).tools;
  allTools.forEach((t) => urls.add(`${base}/tools/${t.slug}`));

  const urlEntries = Array.from(urls)
    .map((loc) => `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.6</priority>\n  </url>`)
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
