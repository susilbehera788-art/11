import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { currentPlayers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AdPlaceholder } from '@/components/ad-placeholder';

export default function CurrentPlayersPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          The Current Squad
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Meet the players currently representing Team India on the
          international stage.
        </p>
      </div>

      <AdPlaceholder className="mb-12" />

      <div className="overflow-hidden rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Player</TableHead>
              <TableHead>Formats</TableHead>
              <TableHead>Key Stat</TableHead>
              <TableHead>Recent Performance</TableHead>
              <TableHead>Upcoming Match</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPlayers.map((player) => {
              const image = PlaceHolderImages.find(p => p.id === player.imageId);
              return (
                <TableRow key={player.name}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{player.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {player.formats.map((format) => (
                        <Badge key={format} variant="secondary">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{player.stats}</TableCell>
                  <TableCell>{player.recentPerformance}</TableCell>
                  <TableCell>{player.upcoming}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      
      <AdPlaceholder className="mt-12" />
    </div>
  );
}
