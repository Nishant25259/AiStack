import Link from "next/link";

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/categories`, { cache: "no-store" });
    return await res.json();
  } catch { return []; }
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">All Categories</h1>
      <p className="text-zinc-400 mb-10">Browse AI tools organized by use case</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat: { id: string; slug: string; icon: string; name: string; color: string; _count: { tools: number } }) => (
          <Link key={cat.id} href={`/tools?category=${cat.slug}`}
            className="group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 rounded-xl p-6 transition-all hover:bg-zinc-900 hover:-translate-y-0.5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="text-3xl">{cat.icon}</div>
              <div>
                <h3 className="font-semibold text-white">{cat.name}</h3>
                <p className="text-zinc-500 text-sm">{cat._count?.tools || 0} tools</p>
              </div>
            </div>
            <div className="h-1 rounded-full w-12 opacity-60" style={{ backgroundColor: cat.color }} />
          </Link>
        ))}
      </div>
    </div>
  );
}
