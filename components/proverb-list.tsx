"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProverbCard } from './proverb-card';
import type { Proverb } from '@/lib/supabase';
import { Pagination } from './pagination';
import { Skeleton } from './ui/skeleton';
import { useRouter, useSearchParams } from 'next/navigation';

interface ProverbListProps {
  initialQuery?: string;
  initialLetter?: string;
}

const PAGE_SIZE = 9;

export function ProverbList({ initialQuery, initialLetter }: ProverbListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [proverbs, setProverbs] = useState<Proverb[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProverbs = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // First, get total count
        let countQuery = supabase
          .from('batals')
          .select('id', { count: 'exact' });

        if (initialQuery) {
          countQuery = countQuery.ilike('batal', `%${initialQuery}%`);
        }
        if (initialLetter) {
          countQuery = countQuery.ilike('batal', `${initialLetter}%`);
        }

        const { count, error: countError } = await countQuery;

        if (countError) throw countError;

        const total = count || 0;
        setTotalPages(Math.ceil(total / PAGE_SIZE));

        // Then fetch the current page
        let query = supabase
          .from('batals')
          .select('*')
          .order('created_at', { ascending: false })
          .range((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE - 1);

        if (initialQuery) {
          query = query.ilike('batal', `%${initialQuery}%`);
        }
        if (initialLetter) {
          query = query.ilike('batal', `${initialLetter}%`);
        }

        const { data, error: fetchError } = await query;

        if (fetchError) throw fetchError;

        setProverbs(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProverbs();
  }, [currentPage, initialQuery, initialLetter]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/browse?${params.toString()}`);
  };

  if (error) {
    return (
      <div className="text-center py-8 text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <Skeleton key={i} className="h-[300px] rounded-xl" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {proverbs.map((proverb) => (
              <ProverbCard key={proverb.id} proverb={proverb} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}

          {proverbs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>چیزے پہ پیش کنگ ءَ دست نہ کَپت</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}