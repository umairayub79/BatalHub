export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { ProverbList } from "@/components/proverb-list";
import { SearchSection } from "@/components/search-section";
import { AlphabetBrowse } from "@/components/alphabet-browse";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrowsePage({
  searchParams,
}: {
  searchParams: { query?: string; letter?: string; page?: string };
}) {
  const { query, letter } = searchParams;

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">درگیج</h1>
        </div>
        <SearchSection />
      </div>

      {letter && (
        <div className="space-y-8">
          <AlphabetBrowse layout="scroll" />
        </div>
      )}

      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <ProverbList initialQuery={query} initialLetter={letter} />
      </Suspense>
    </div>
  );
}
