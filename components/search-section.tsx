// "use client";

// import { useState } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Search } from 'lucide-react';

// export function SearchSection() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const [query, setQuery] = useState(searchParams.get('query') || '');

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       router.push(`/browse?query=${encodeURIComponent(query)}`);
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
//       <div className="relative group">
//         <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-lg blur-xl group-hover:blur-2xl transition-all opacity-70 -z-10" />
//         <div className="relative flex gap-2">
//           <Input
//             type="search"
//             placeholder="متل شۆھاز..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="flex-1 h-12 text-lg bg-background/80 backdrop-blur border-primary/20 focus:border-primary transition-colors"
//             aria-label="Search proverbs"
//           />
//           <Button 
//             type="submit" 
//             size="lg"
//             className="min-w-[120px] text-lg"
//           >
//             <Search className="h-5 w-5 ml-2" aria-hidden="true" />
//             شۆھاز
//           </Button>
//         </div>
//       </div>
//     </form>
//   );
// }
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export function SearchSection() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/browse?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="relative flex justify-center  rounded-full border-2 border-primary/30 p-1 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <Input
            type="search"
            placeholder="پہ شوھازگ ءَ گال ءَ ادا نبشتہ کن اِت"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="text-xl leading-[3rem] ps-5 sm:ps-2  flex-grow focus:outline-none w-full rounded-full    border-none outline-none border-transparent focus:border-transparent ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0"
            aria-label="Search proverbs"
          />
          <Button 
            type="submit" 
            className="text-lg rounded-full"
            variant="ghost">
            <Search className="h-5 w-5 text-primary" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </form>
  );
}