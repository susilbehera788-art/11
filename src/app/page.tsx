import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  History,
  ShieldCheck,
  Trophy,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AdPlaceholder } from '@/components/ad-placeholder';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-stadium');

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            data-ai-hint={heroImage.imageHint}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="font-headline text-4xl font-bold md:text-6xl lg:text-7xl">
            Indian Cricket Journey
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            From the historic wins to the rising stars, explore the saga of
            Team India.
          </p>
          <div className="mt-8 flex gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/history">Explore History</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/cricketers">Find Players</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:px-6">
        {/* Live Score Section */}
        <section className="mb-16">
          <h2 className="mb-6 text-center font-headline text-3xl font-bold md:text-4xl">
            Live Action
          </h2>
          <Card className="overflow-hidden shadow-lg">
            <CardHeader className="bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  ICC World Cup - Final
                </p>
                <Badge
                  variant="destructive"
                  className="animate-pulse items-center gap-2"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
                  </span>
                  LIVE
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-around">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="font-bold text-lg md:text-2xl">India</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-3xl md:text-5xl">240/10</div>
                  <div className="text-sm text-muted-foreground">vs</div>
                  <div className="font-bold text-3xl md:text-5xl">241/4</div>
                </div>
                <div className="flex flex-col items-center gap-2 text-center">
                   <div className="font-bold text-lg md:text-2xl">Australia</div>
                </div>
              </div>
              <div className="mt-6 border-t pt-4 text-center text-lg font-medium text-primary">
                Australia won by 6 wickets
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Ad Placeholder */}
        <AdPlaceholder className="my-12" />

        {/* Features Section */}
        <section>
          <h2 className="mb-8 text-center font-headline text-3xl font-bold md:text-4xl">
            Explore the Chronicles
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<Trophy className="h-10 w-10 text-accent" />}
              title="Trophies & Victories"
              description="Relive the glory of every major trophy won by the Indian cricket team."
              link="/history"
            />
            <FeatureCard
              icon={<Users className="h-10 w-10 text-accent" />}
              title="Cricketer Profiles"
              description="Detailed profiles of Indian cricket legends and current stars."
              link="/cricketers"
            />
            <FeatureCard
              icon={<History className="h-10 w-10 text-accent" />}
              title="Team History"
              description="A journey through the significant moments that shaped Indian cricket."
              link="/history"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  link,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <Card className="group flex flex-col items-center text-center transition-transform hover:-translate-y-2">
      <CardHeader>
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle className="font-headline">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <div className="p-6 pt-0">
        <Button asChild variant="link" className="text-primary">
          <Link href={link}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}
