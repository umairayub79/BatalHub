import { SearchSection } from "@/components/search-section";
import { AlphabetBrowse } from "@/components/alphabet-browse";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-16">
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-l from-primary/20 via-primary/10 to-transparent rounded-3xl blur-3xl -z-10" />
        <SearchSection />
      </section>

      <section className="space-y-8">
        <AlphabetBrowse layout="grid"/>
      </section>
    </div>
  );
}
