import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AdPlaceholder } from '@/components/ad-placeholder';

const historySections = [
  {
    title: 'PAGE 1 – EARLY BEGINNINGS (1721–1932)',
    content: [
      '1721: First recorded cricket match in India in Cambay, Gujarat, played by British sailors.',
      '1792: Calcutta Cricket Club formed—one of the oldest cricket clubs outside England.',
      '1848: Parsis form the Oriental Cricket Club in Bombay—first Indian community to embrace cricket.',
      '1864: Bombay Gymkhana established; British vs Indian teams start clashes.',
      '1886–1890: Parsi cricket teams tour England, gaining experience.',
      '1892: Hindu Gymkhana formed; later, the Muslim Gymkhana and others create the Quadrangular Tournament.',
      '1911: First All-India Team tours England under Maharaja of Patiala. Team includes fast bowler Palwankar Baloo, a Dalit legend, sparking early caste-based controversy.',
      '1928: BCCI (Board of Control for Cricket in India) founded under Grant Govan.',
      '1932: India plays its first-ever Test match at Lord’s under CK Nayudu.',
    ],
    imageId: 'vintage-cricket',
  },
  {
    title: 'PAGE 2 – POST-INDEPENDENCE & EARLY ACHIEVEMENTS (1947–1970)',
    content: [
      '1947: India becomes independent; cricket grows nationally.',
      '1952: India wins its first Test match vs England in Madras—Vinoo Mankad shines.',
      '1950s–60s: Rise of Indian spin quartet—Prasanna, Bedi, Chandrasekhar, Venkataraghavan.',
      '1961: MAK Pataudi becomes youngest cricket captain at 21 after Nari Contractor is injured.',
      'Controversies:',
      '  - Regional favoritism in team selections.',
      '  - Pataudi vs selectors dispute over leadership.',
      '  - Crowd violence during the 1969 series vs. Australia.',
    ],
  },
  {
    title: 'PAGE 3 – 1971 GOLDEN ERA: WEST INDIES & ENGLAND',
    content: [
      '1971: India defeats West Indies in West Indies—the first historic victory.',
      'Sunil Gavaskar debuts with 774 runs in his maiden series.',
      '1971: India beats England at The Oval—Bhagwat Chandrasekhar leads with 6 wickets.',
      'Controversy: Ajit Wadekar vs conservative selectors; selection politics intensify.',
    ],
    imageId: 'sachin-tendulkar' // Placeholder, should be Gavaskar if available
  },
  {
    title: 'PAGE 4 – 1975–1983: INDIA EMERGES AS A COMPETITOR',
    content: [
      'India participates in first ODI World Cup (1975).',
      'Kapil Dev becomes captain in late 70s.',
      '1983: India shocks the world, defeating West Indies to win first ODI World Cup.',
      'Kirti Azad, Madan Lal, Roger Binny contribute massively.',
      'Impact: Cricket becomes India’s biggest sport; massive boom in popularity.',
      'Controversies:',
      '  - Sunil Gavaskar walking off the field (Melbourne 1981) after a bad umpiring decision.',
      '  - Gavaskar–Kapil captaincy conflict.',
    ],
    imageId: '1983-world-cup',
  },
  {
    title: 'PAGE 5 – 1984–1999: MODERN ERA BEGINS',
    content: [
      '1984–85: India wins Benson & Hedges World Championship.',
      '1987: India co-hosts World Cup for the first time.',
      '1989: A 16-year-old Sachin Tendulkar debuts.',
      '1996: Sourav Ganguly & Rahul Dravid debut; rise of new Indian batting class.',
      '1999: Anil Kumble takes 10 wickets in an innings vs Pakistan.',
      'Major Controversy (2000): Match Fixing Scandal',
      '  - Mohammad Azharuddin banned.',
      '  - Ajay Jadeja implicated.',
      '  - Bookies exposed; Hansie Cronje case linked.',
    ],
    imageId: 'sachin-tendulkar',
  },
  {
    title: 'PAGE 6 – 2000–2011: INDIAN CRICKET REVOLUTION',
    content: [
      '2000: Sourav Ganguly becomes captain; sparks new aggressive cricket culture.',
      '2002: India ties NatWest final; Ganguly waves shirt at Lord’s—historic moment.',
      '2007: India wins first-ever T20 World Cup under MS Dhoni.',
      '2008: IPL is launched—global cricket changes forever.',
      '2011: India wins ODI World Cup after 28 years; Dhoni hits iconic winning six.',
      'Controversies:',
      '  - 2008 Monkeygate Scandal (Harbhajan–Symonds).',
      '  - Greg Chappell’s controversial tenure as coach.',
      '  - IPL team conflicts and money-driven politics.',
    ],
    imageId: '2011-world-cup',
  },
  {
    title: 'PAGE 7 – 2013–2016: TRANSITION AND TURBULENCE',
    content: [
      '2013: India wins Champions Trophy; Dhoni becomes 1st captain to win all ICC trophies.',
      'Tendulkar retires from international cricket.',
      '2014–2016:',
      '  - Kohli takes over Test captaincy.',
      '  - Rise of Rohit Sharma, Ashwin, Jadeja.',
      'Controversies:',
      '  - IPL Spot Fixing (Sreesanth, CSK/RR ban).',
      '  - BCCI vs Supreme Court: Lodha Committee reforms.',
      '  - Dhoni accused of conflict of interest (Rhiti Sports).',
    ],
    imageId: 'ms-dhoni'
  },
  {
    title: 'PAGE 8 – 2017–2020: KOHLI ERA OF FITNESS & AGGRESSION',
    content: [
      '2017: Virat Kohli becomes full-time captain.',
      'India reaches No.1 Test ranking.',
      '2018–19: India wins first Test series in Australia.',
      'Controversy: Kohli–Kumble fallout; Kumble resigns calling his captain “intimidating”.',
      '2019: India reaches World Cup semifinal; loss vs NZ sparks debates.',
    ],
    imageId: 'virat-kohli',
  },
  {
    title: 'PAGE 9 – 2021–2025: NEW CAPTAINS & MEGA EVENTS',
    content: [
      '2021: India leads 2–1 in England Test series; Gabba win recorded.',
      '2022: Rohit Sharma becomes all-format captain.',
      '2023: India dominates World Cup but loses final to Australia.',
      '2024–2025: Rise of Shubman Gill, Yashasvi Jaiswal, and pace attack led by Bumrah.',
      'Controversies:',
      '  - Kohli captaincy removal controversy.',
      '  - 2023 World Cup pitch controversy (ICC vs BCCI).',
      '  - Umpiring bias allegations.',
      '  - Player workload & IPL scheduling debates.',
    ],
    imageId: 'rohit-sharma'
  },
  {
    title: 'PAGE 10 – COMPLETE LIST OF INDIA’S BIGGEST CRICKET CONTROVERSIES',
    content: [
      '1. 1930s: Caste discrimination against Palwankar Baloo.',
      '2. 1974–1984: Captaincy conflicts (Gavaskar, Kapil Dev, Wadekar).',
      '3. 1981: Gavaskar walk-off incident.',
      '4. 2000: Match-fixing scandal (Azharuddin banned).',
      '5. 2008: Monkeygate Scandal.',
      '6. 2013: IPL spot fixing (Sreesanth; CSK, RR suspended).',
      '7. 2017: Kohli–Kumble fallout.',
      '8. 2021: Kohli’s captaincy removal dispute.',
      '9. 2023: World Cup pitch controversies.',
      '10. Ongoing: Selection bias, workload, BCCI politics.',
    ],
  },
];

export default function HistoryPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-bold md:text-5xl">
          Detailed History of Indian Cricket
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          From its early beginnings to modern-day triumphs and controversies,
          explore the complete timeline of Team India's journey.
        </p>
      </div>

      <AdPlaceholder className="mb-12" />

      <Accordion type="single" collapsible className="w-full">
        {historySections.map((section, index) => {
          const image = PlaceHolderImages.find((img) => img.id === section.imageId);
          return (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="font-headline text-left text-xl hover:no-underline">
                {section.title}
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none text-muted-foreground">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2 md:col-span-2">
                    {section.content.map((point, i) => (
                      <p key={i} className="leading-relaxed">{point}</p>
                    ))}
                  </div>
                  {image && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-full">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        data-ai-hint={image.imageHint}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
