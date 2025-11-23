import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Cricket, Disc3 } from 'lucide-react';
import Link from 'next/link';

export default function GameZonePage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          Game Zone
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Ready to play? Choose a game below and test your skills.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Cricket className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-2xl">Cricket Challenge</CardTitle>
            <CardDescription>Step up to the crease and face the AI bowler in a thrilling 2-over match.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/game-zone/cricket">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Disc3 className="h-8 w-8" />
            </div>
            <CardTitle className="font-headline text-2xl">Carrom Board</CardTitle>
            <CardDescription>Challenge our AI or a friend in a classic game of Carrom. Clear the board to win!</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/game-zone/carrom">Play Now</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
