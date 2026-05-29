// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient, PricingType } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Categories
  const categories = [
    { name: "Writing", slug: "writing", icon: "✍️", color: "#f59e0b" },
    { name: "Image Generation", slug: "image-generation", icon: "🎨", color: "#8b5cf6" },
    { name: "Coding", slug: "coding", icon: "💻", color: "#3b82f6" },
    { name: "Video", slug: "video", icon: "🎬", color: "#ef4444" },
    { name: "Audio", slug: "audio", icon: "🎵", color: "#10b981" },
    { name: "Productivity", slug: "productivity", icon: "⚡", color: "#f97316" },
    { name: "SEO", slug: "seo", icon: "🔍", color: "#06b6d4" },
    { name: "Research", slug: "research", icon: "🔬", color: "#6366f1" },
    { name: "Marketing", slug: "marketing", icon: "📣", color: "#ec4899" },
    { name: "Data Analysis", slug: "data-analysis", icon: "📊", color: "#84cc16" },
    { name: "Chatbots", slug: "chatbots", icon: "🤖", color: "#14b8a6" },
    { name: "Design", slug: "design", icon: "🖌️", color: "#a855f7" },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const catMap: Record<string, string> = {};
  const allCats = await prisma.category.findMany();
  for (const c of allCats) catMap[c.slug] = c.id;

  // Tools
  const tools = [
    {
      name: "ChatGPT",
      slug: "chatgpt",
      description: "OpenAI's powerful conversational AI assistant for writing, coding, and analysis.",
      website: "https://chat.openai.com",
      pricing: PricingType.FREEMIUM,
      featured: true,
      verified: true,
      apiAvailable: true,
      categorySlug: "chatbots",
      tags: ["openai", "gpt", "chatbot", "writing"],
    },
    {
      name: "Midjourney",
      slug: "midjourney",
      description: "AI art generator that creates stunning images from text prompts via Discord.",
      website: "https://midjourney.com",
      pricing: PricingType.PAID,
      featured: true,
      verified: true,
      apiAvailable: false,
      categorySlug: "image-generation",
      tags: ["art", "images", "discord", "creative"],
    },
    {
      name: "GitHub Copilot",
      slug: "github-copilot",
      description: "AI pair programmer that suggests code completions in your editor.",
      website: "https://github.com/features/copilot",
      pricing: PricingType.PAID,
      featured: true,
      verified: true,
      apiAvailable: false,
      categorySlug: "coding",
      tags: ["coding", "github", "vscode", "autocomplete"],
    },
    {
      name: "Notion AI",
      slug: "notion-ai",
      description: "Built-in AI writing and summarization tools inside Notion.",
      website: "https://www.notion.so/product/ai",
      pricing: PricingType.FREEMIUM,
      featured: false,
      verified: true,
      apiAvailable: false,
      categorySlug: "productivity",
      tags: ["notion", "writing", "notes", "productivity"],
    },
    {
      name: "Runway ML",
      slug: "runway-ml",
      description: "AI-powered creative video tools including text-to-video generation.",
      website: "https://runwayml.com",
      pricing: PricingType.FREEMIUM,
      featured: true,
      verified: true,
      apiAvailable: true,
      categorySlug: "video",
      tags: ["video", "creative", "text-to-video"],
    },
    {
      name: "ElevenLabs",
      slug: "elevenlabs",
      description: "Realistic AI voice synthesis and cloning for any use case.",
      website: "https://elevenlabs.io",
      pricing: PricingType.FREEMIUM,
      featured: false,
      verified: true,
      apiAvailable: true,
      categorySlug: "audio",
      tags: ["voice", "tts", "audio", "cloning"],
    },
    {
      name: "Perplexity AI",
      slug: "perplexity-ai",
      description: "AI-powered search engine that gives cited, real-time answers.",
      website: "https://perplexity.ai",
      pricing: PricingType.FREEMIUM,
      featured: true,
      verified: true,
      apiAvailable: true,
      categorySlug: "research",
      tags: ["search", "research", "citations", "web"],
    },
    {
      name: "Jasper AI",
      slug: "jasper-ai",
      description: "AI writing assistant built for marketing teams and content creators.",
      website: "https://jasper.ai",
      pricing: PricingType.PAID,
      featured: false,
      verified: true,
      apiAvailable: true,
      categorySlug: "writing",
      tags: ["writing", "marketing", "content", "copywriting"],
    },
    {
      name: "Canva AI",
      slug: "canva-ai",
      description: "AI design tools built into Canva for instant graphics and visuals.",
      website: "https://canva.com",
      pricing: PricingType.FREEMIUM,
      featured: false,
      verified: true,
      apiAvailable: false,
      categorySlug: "design",
      tags: ["design", "graphics", "marketing", "templates"],
    },
    {
      name: "Surfer SEO",
      slug: "surfer-seo",
      description: "AI-powered SEO optimization tool for content that ranks on Google.",
      website: "https://surferseo.com",
      pricing: PricingType.PAID,
      featured: false,
      verified: true,
      apiAvailable: false,
      categorySlug: "seo",
      tags: ["seo", "content", "ranking", "google"],
    },
    {
      name: "Claude",
      slug: "claude",
      description: "Anthropic's AI assistant known for nuanced reasoning and long context windows.",
      website: "https://claude.ai",
      pricing: PricingType.FREEMIUM,
      featured: true,
      verified: true,
      apiAvailable: true,
      categorySlug: "chatbots",
      tags: ["anthropic", "chatbot", "writing", "coding"],
    },
    {
      name: "DALL·E 3",
      slug: "dalle-3",
      description: "OpenAI's image generation model integrated into ChatGPT and the API.",
      website: "https://openai.com/dall-e-3",
      pricing: PricingType.FREEMIUM,
      featured: false,
      verified: true,
      apiAvailable: true,
      categorySlug: "image-generation",
      tags: ["openai", "images", "art", "generation"],
    },
  ];

  for (const tool of tools) {
    const { tags, categorySlug, ...toolData } = tool;
    const categoryId = catMap[categorySlug];
    if (!categoryId) continue;

    const created = await prisma.tool.upsert({
      where: { slug: toolData.slug },
      update: {},
      create: { ...toolData, categoryId },
    });

    for (const tagName of tags) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, "-");
      const tag = await prisma.tag.upsert({
        where: { slug: tagSlug },
        update: {},
        create: { name: tagName, slug: tagSlug },
      });
      await prisma.toolTag.upsert({
        where: { toolId_tagId: { toolId: created.id, tagId: tag.id } },
        update: {},
        create: { toolId: created.id, tagId: tag.id },
      });
    }
  }

  console.log("✅ Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
