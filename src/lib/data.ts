export type Cricketer = {
  id: string;
  name: string;
  debutYear: number;
  retirementYear: number | null;
  matches: {
    test: number;
    odi: number;
    t20: number;
  };
  stats: {
    runs: {
      test: number;
      odi: number;
      t20: number;
    };
    wickets: {
      test: number;
      odi: number;
      t20: number;
    };
  };
  bio: string;
  achievements: string[];
  imageId: string;
};

export const cricketers: Cricketer[] = [
  {
    id: 'sachin-tendulkar',
    name: 'Sachin Tendulkar',
    debutYear: 1989,
    retirementYear: 2013,
    matches: { test: 200, odi: 463, t20: 1 },
    stats: {
      runs: { test: 15921, odi: 18426, t20: 10 },
      wickets: { test: 46, odi: 154, t20: 1 },
    },
    bio: 'Widely regarded as one of the greatest batsmen of all time, Sachin Tendulkar is a legendary figure in cricket. His career spanned 24 years, and he holds numerous records, including the most runs in both Test and ODI cricket and the only player to have scored 100 international centuries.',
    achievements: [
      'Bharat Ratna, India\'s highest civilian award',
      'Most runs in Test and ODI cricket',
      '100 international centuries',
      '2011 ICC Cricket World Cup winner',
    ],
    imageId: 'sachin-tendulkar',
  },
  {
    id: 'virat-kohli',
    name: 'Virat Kohli',
    debutYear: 2008,
    retirementYear: null,
    matches: { test: 113, odi: 292, t20: 117 },
    stats: {
      runs: { test: 8848, odi: 13848, t20: 4037 },
      wickets: { test: 0, odi: 5, t20: 4 },
    },
    bio: 'Known for his aggressive batting style and incredible consistency, Virat Kohli is a modern-day great. He has captained India across all formats and has broken numerous records, particularly in ODI cricket, where he is among the fastest to reach various run milestones.',
    achievements: [
      'Sir Garfield Sobers Trophy for ICC Men\'s Cricketer of the Decade (2011-2020)',
      'Padma Shri award',
      'Most player-of-the-series awards in T20Is',
      'Fastest player to score 10,000 ODI runs',
    ],
    imageId: 'virat-kohli',
  },
  {
    id: 'ms-dhoni',
    name: 'MS Dhoni',
    debutYear: 2004,
    retirementYear: 2020,
    matches: { test: 90, odi: 350, t20: 98 },
    stats: {
      runs: { test: 4876, odi: 10773, t20: 1617 },
      wickets: { test: 0, odi: 1, t20: 0 },
    },
    bio: 'Renowned for his calm demeanor and exceptional leadership, MS Dhoni is the only captain in history to win all three major ICC trophies. His finishing skills as a batsman and his sharp wicket-keeping made him one of the most impactful players in the history of limited-overs cricket.',
    achievements: [
      'Only captain to win ICC T20 World Cup, ICC Cricket World Cup, and ICC Champions Trophy',
      'Padma Bhushan, India\'s third-highest civilian award',
      'ICC ODI Player of the Year (2008, 2009)',
      'Most successful Indian Test captain',
    ],
    imageId: 'ms-dhoni',
  },
];

export type Trophy = {
  year: number;
  name: string;
  description: string;
  imageId: string;
};

export const trophies: Trophy[] = [
  {
    year: 1983,
    name: 'Prudential World Cup',
    description: 'Under the captaincy of Kapil Dev, India defied all odds to win their first-ever World Cup by defeating the mighty West Indies in the final at Lord\'s. This victory is considered a turning point for Indian cricket.',
    imageId: '1983-world-cup',
  },
  {
    year: 2007,
    name: 'ICC World Twenty20',
    description: 'A young Indian team led by MS Dhoni won the inaugural T20 World Cup in South Africa. They defeated arch-rivals Pakistan in a thrilling final, heralding a new era of T20 cricket in India.',
    imageId: '2007-t20-world-cup',
  },
  {
    year: 2011,
    name: 'ICC Cricket World Cup',
    description: 'India won its second ODI World Cup after 28 years, this time on home soil. Captained by MS Dhoni, the team chased down Sri Lanka\'s target in the final, with Dhoni famously finishing the game with a six.',
    imageId: '2011-world-cup',
  },
];


export type CurrentPlayer = {
  name: string;
  formats: string[];
  recentPerformance: string;
  stats: string;
  upcoming: string;
  imageId: string;
};

export const currentPlayers: CurrentPlayer[] = [
    {
        name: 'Rohit Sharma',
        formats: ['Test', 'ODI', 'T20'],
        recentPerformance: '57 vs AUS (T20)',
        stats: '18,000+ Intl Runs',
        upcoming: 'vs ENG (Test Series)',
        imageId: 'rohit-sharma'
    },
    {
        name: 'Virat Kohli',
        formats: ['Test', 'ODI', 'T20'],
        recentPerformance: '76 vs SA (Test)',
        stats: '26,000+ Intl Runs',
        upcoming: 'vs ENG (Test Series)',
        imageId: 'virat-kohli'
    },
    {
        name: 'Jasprit Bumrah',
        formats: ['Test', 'ODI', 'T20'],
        recentPerformance: '6/61 vs SA (Test)',
        stats: '350+ Intl Wickets',
        upcoming: 'vs ENG (Test Series)',
        imageId: 'jasprit-bumrah'
    },
    {
        name: 'KL Rahul',
        formats: ['Test', 'ODI', 'T20'],
        recentPerformance: '101 vs SA (Test)',
        stats: '7,000+ Intl Runs',
        upcoming: 'vs ENG (Test Series)',
        imageId: 'kl-rahul'
    }
];
