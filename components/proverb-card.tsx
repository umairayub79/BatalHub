"use client";

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import type { Proverb } from '@/lib/supabase';


interface ProverbCardProps {
  proverb: Proverb;
  featured?: boolean;
}

export function ProverbCard({ proverb, featured = false }: ProverbCardProps) {

  const handleCopy = async () => {
    await navigator.clipboard.writeText(proverb.batal);
    toast.success('کاپی بوت!');
  };

  return (
    <Card className={`group overflow-hidden transition-all duration-300 hover:shadow-lg ${
      featured ? 'border-primary/50 bg-primary/5' : 'hover:border-primary/30'
    }`}>
      <CardContent className="p-6">
        <div className="space-y-4">
          <p className="text-2xl font-semibold text-right leading-relaxed">
            {proverb.batal}
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
          <p className="text-muted-foreground text-xl leading-relaxed">
            {proverb.meaning}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-6 pt-0">
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleCopy}
            className="hover:bg-primary/10"
            aria-label="Copy proverb"
          >
            <Copy className="h-4 w-4 text-primary" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}