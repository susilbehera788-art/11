import { cn } from '@/lib/utils';
import { Megaphone } from 'lucide-react';

export function AdPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex min-h-[100px] w-full items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 p-4 text-center text-muted-foreground',
        className
      )}
    >
      <div className="flex flex-col items-center gap-2">
        <Megaphone className="h-8 w-8" />
        <p className="text-sm font-medium">Advertisement</p>
      </div>
    </div>
  );
}
