import { supabase } from '@/lib/supabase';
import { ProverbCard } from './proverb-card';

async function getRecentProverbs() {
  const { data, error } = await supabase
    .from('batals')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

export async function RecentAdditions() {
  const proverbs = await getRecentProverbs();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {proverbs.map((proverb) => (
        <ProverbCard key={proverb.id} proverb={proverb} />
      ))}
    </div>
  );
}