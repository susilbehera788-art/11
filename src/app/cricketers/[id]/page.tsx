import { notFound } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cricketers } from '@/lib/data';
import type { Cricketer } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Star } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { AdPlaceholder } from '@/components/ad-placeholder';

export default function CricketerProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const cricketer = cricketers.find((c) => c.id === params.id);

  if (!cricketer) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Profile Picture and Key Info */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 text-center">
            <CardHeader>
              <CardTitle className="pt-4 font-headline text-3xl">
                {cricketer.name}
              </CardTitle>
              <CardDescription>
                {cricketer.debutYear} - {cricketer.retirementYear || 'Present'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator className="my-4" />
              <div className="flex justify-around">
                <StatItem label="Tests" value={cricketer.matches.test} />
                <StatItem label="ODIs" value={cricketer.matches.odi} />
                <StatItem label="T20s" value={cricketer.matches.t20} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Detailed Stats, Bio, Achievements */}
        <div className="md:col-span-2">
          {/* Biography */}
          <section className="mb-8">
            <h2 className="mb-4 font-headline text-2xl font-bold">Biography</h2>
            <p className="text-muted-foreground">{cricketer.bio}</p>
          </section>

          <AdPlaceholder className="my-8" />

          {/* Career Statistics */}
          <section className="mb-8">
            <h2 className="mb-4 font-headline text-2xl font-bold">
              Career Statistics
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <StatsCard format="Test" stats={cricketer.stats} />
              <StatsCard format="ODI" stats={cricketer.stats} />
              <StatsCard format="T20" stats={cricketer.stats} />
            </div>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="mb-4 font-headline text-2xl font-bold">
              Career Achievements
            </h2>
            <ul className="space-y-3">
              {cricketer.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Star className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div>
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function StatsCard({ format, stats }: { format: 'Test' | 'ODI' | 'T20', stats: Cricketer['stats'] }) {
    const formatKey = format.toLowerCase() as 'test' | 'odi' | 't20';
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{format} Career</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <StatItem label="Runs" value={stats.runs[formatKey].toLocaleString()} />
        <StatItem label="Wickets" value={stats.wickets[formatKey].toLocaleString()} />
      </CardContent>
    </Card>
  );
}
