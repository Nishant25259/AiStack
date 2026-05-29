import { cn } from "@/lib/utils";

type Variant = "default" | "free" | "paid" | "freemium" | "featured" | "verified";

const variants: Record<Variant, string> = {
  default: "bg-zinc-800 text-zinc-300",
  free: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  paid: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  freemium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  featured: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  verified: "bg-sky-500/10 text-sky-400 border border-sky-500/20",
};

export function Badge({ children, variant = "default", className }: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium", variants[variant], className)}>
      {children}
    </span>
  );
}
