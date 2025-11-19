import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cricketers } from '@/lib/data';
import { AdPlaceholder } from '@/components/ad-placeholder';

export default function CricketersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          Legends of the Game
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Discover the icons who have defined Indian cricket through their
          skill, passion, and dedication.
        </p>
      </div>

      <AdPlaceholder className="mb-12" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {cricketers.map((cricketer, index) => {
          const totalMatches =
            cricketer.matches.test +
            cricketer.matches.odi +
            cricketer.matches.t20;
          const totalRuns =
            cricketer.stats.runs.test +
            cricketer.stats.runs.odi +
            cricketer.stats.runs.t20;

          return (
            <Link
              key={cricketer.id}
              href={`/cricketers/${cricketer.id}`}
              passHref
              className={index === 2 ? 'md:col-span-2 md:mx-auto md:w-1/2' : ''}
            >
              <Card className="group flex h-full transform flex-col overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex-row items-center gap-4 p-4">
                  <div className="flex-grow">
                    <CardTitle className="font-headline text-xl">
                      {cricketer.name}
                    </CardTitle>
                    <CardDescription>
                      {cricketer.debutYear} -{' '}
                      {cricketer.retirementYear || 'Present'}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 pt-0">
                  <div className="flex justify-around text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">
                        {totalMatches}
                      </p>
                      <p className="text-xs text-muted-foreground">Matches</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">
                        {totalRuns.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Runs</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4">
                  <Button variant="link" className="w-full text-primary">
                    View Profile
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
