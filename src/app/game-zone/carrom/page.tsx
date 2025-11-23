import { Button } from '@/components/ui/button';
import { Disc3 } from 'lucide-react';
import Link from 'next/link';

export default function CarromGamePage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <Disc3 className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 text-4xl font-bold">Carrom Board</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This game is under construction. Check back soon!
      </p>
      <Button asChild className="mt-8">
        <Link href="/game-zone">Back to Game Zone</Link>
      </Button>
    </div>
  );
}
