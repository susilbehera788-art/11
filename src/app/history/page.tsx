import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { trophies } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AdPlaceholder } from '@/components/ad-placeholder';

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          A Legacy of Triumph
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          From the underdog victory in 1983 to modern-day dominance, explore
          the glorious moments when India conquered the world.
        </p>
      </div>
      
      <AdPlaceholder className="mb-12" />

      <div className="relative">
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
        {trophies.sort((a,b) => a.year - b.year).map((trophy, index) => {
          const image = PlaceHolderImages.find((img) => img.id === trophy.imageId);
          const isLeft = index % 2 === 0;

          return (
            <div
              key={trophy.year}
              className={`relative mb-12 flex w-full items-center ${
                isLeft ? 'justify-start' : 'justify-end'
              }`}
            >
              <div
                className={`w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}`}
              >
                <Card className="shadow-lg transition-transform hover:-translate-y-1">
                  <CardHeader>
                    {image && (
                      <div className="relative mb-4 h-48 w-full overflow-hidden rounded-t-lg">
                        <Image
                          src={image.imageUrl}
                          alt={image.description}
                          data-ai-hint={image.imageHint}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-headline text-2xl">
                        {trophy.name}
                      </CardTitle>
                      <div className="font-bold text-primary">{trophy.year}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{trophy.description}</CardDescription>
                  </CardContent>
                </Card>
              </div>
              <div className="absolute left-1/2 z-10 -translate-x-1/2 transform rounded-full bg-primary p-3">
                <Trophy className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
