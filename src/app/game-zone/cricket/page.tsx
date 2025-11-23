import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cricket } from 'lucide-react';
import Link from 'next/link';

export default function CricketGamePage() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
      <Cricket className="h-24 w-24 text-muted-foreground/50" />
      <h1 className="mt-8 text-4xl font-bold">Cricket Challenge</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This game is under construction. Check back soon!
      </p>
      <Button asChild className="mt-8">
        <Link href="/game-zone">Back to Game Zone</Link>
      </Button>
    </div>
  );
}
