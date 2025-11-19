import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/components/icons';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
        <Icons.CricketBall className="h-24 w-24 text-muted-foreground/50" />
      <h2 className="mt-8 text-4xl font-bold">404 - Page Not Found</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Looks like you've been stumped! The page you're looking for doesn't exist.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Return to the Pavilion</Link>
      </Button>
    </div>
  );
}
