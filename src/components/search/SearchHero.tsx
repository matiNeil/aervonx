import type { SearchInitial } from "@/lib/types";
import { SearchForm, type SearchTab } from "@/components/search/SearchForm";

export function SearchHero({
  title,
  subtitle,
  initialTab,
  initial,
}: {
  title: string;
  subtitle: string;
  initialTab: SearchTab;
  initial?: SearchInitial;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand-400/15 blur-3xl" />
      <div className="absolute -bottom-28 right-0 h-72 w-72 rounded-full bg-accent-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-white sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-200 sm:text-base">
          {subtitle}
        </p>
        <div className="mt-7">
          <SearchForm initialTab={initialTab} initial={initial} />
        </div>
      </div>
    </section>
  );
}
