"use client";

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const alphabet = 'اآبپتٹثجچحخدڈذرڑزژسشصضطظعغفقکگلمنوہیے'.split('');

export function AlphabetBrowse({ layout = 'scroll' }) { // Add layout prop with default 'scroll'
  const searchParams = useSearchParams();
  const currentLetter = searchParams.get('letter');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.75;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    if (currentLetter && scrollContainerRef.current) {
      const activeElement = scrollContainerRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [currentLetter]);

  return (
    <div className="relative">
      <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">آبانی ردا بتل بچار</h2>
          <p className="text-muted-foreground text-lg">بَتل ءِ چارگ ھاترا یک آبے گچِین کن</p>
        </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-primary/10 to-primary/5 rounded-2xl -z-10" />
      
      {/* Conditionally render based on layout prop */}
      {layout === 'scroll' ? (
        // Horizontal Scroll Layout
        <div className="relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('left')}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scroll('right')}
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto scrollbar-hide px-10 py-6 snap-x snap-mandatory scroll-smooth"
          >
            {alphabet.map((letter) => {
              const isActive = currentLetter === letter;
              return (
                <Link 
                  key={letter} 
                  href={`/browse?letter=${encodeURIComponent(letter)}`}
                  className="flex-none snap-center mx-1 first:ml-4 last:mr-4"
                  data-active={isActive}
                >
                  <div className="group relative">
                    <div className={cn(
                      "absolute inset-0 rounded-xl transition-all duration-300",
                      isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/10"
                    )} />
                    <div className={cn(
                      "relative h-12 w-12 flex items-center justify-center text-lg font-medium transition-all duration-300",
                      isActive ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
                    )}>
                      {letter}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        // Grid Layout
        <div className="md:block">
          <div className="grid grid-cols-5 md:grid-cols-10 gap-3 p-6 rounded-2xl backdrop-blur-sm">
            {alphabet.map((letter) => {
              const isActive = currentLetter === letter;
              return (
                <Link 
                  key={letter} 
                  href={`/browse?letter=${encodeURIComponent(letter)}`}
                  className="group relative"
                >
                  <div className={cn(
                    "absolute inset-0 rounded-xl transition-all duration-300",
                    isActive ? "bg-primary" : "bg-transparent group-hover:bg-primary/10"
                  )} />
                  <div className={cn(
                    "relative h-12 flex items-center justify-center text-lg font-medium transition-all duration-300",
                    isActive ? "text-primary-foreground" : "text-foreground group-hover:text-primary"
                  )}>
                    {letter}
                  </div> 
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
