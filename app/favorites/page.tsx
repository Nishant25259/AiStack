export default function FavoritesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Favorites</h1>
      <p className="text-zinc-400 mb-10">Tools you've saved for later</p>
      <div className="text-center py-20 bg-zinc-900/30 border border-zinc-800 rounded-xl text-zinc-500">
        <p className="text-4xl mb-3">🔖</p>
        <p className="text-white font-medium mb-1">Sign in to see your favorites</p>
        <p className="text-sm">Save tools you love and access them from any device</p>
      </div>
    </div>
  );
}
