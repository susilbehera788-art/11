
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, RotateCw, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

// Game constants
const BOARD_SIZE = 500;
const POCKET_RADIUS = 20;
const STRIKER_RADIUS = 15;
const COIN_RADIUS = 12;
const BASE_LINE_Y = BOARD_SIZE - 70;

const initialCoins = [
    // Red Queen
    { id: 'red-1', type: 'red', x: BOARD_SIZE / 2, y: BOARD_SIZE / 2, inPocket: false, color: '#ff4136' },
    // Black coins
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `black-${i}`,
      type: 'black',
      x: 0,
      y: 0,
      inPocket: false,
      color: '#111111',
    })),
    // White coins
    ...Array.from({ length: 9 }, (_, i) => ({
      id: `white-${i}`,
      type: 'white',
      x: 0,
      y: 0,
      inPocket: false,
      color: '#DDDDDD',
    })),
];

// Function to arrange coins at the start
const arrangeCoins = () => {
  const arranged = JSON.parse(JSON.stringify(initialCoins));
  const center = BOARD_SIZE / 2;
  const queen = arranged.find(c => c.type === 'red');
  queen.x = center;
  queen.y = center;

  const blackCoins = arranged.filter(c => c.type === 'black');
  const whiteCoins = arranged.filter(c => c.type === 'white');

  const arrangement = [
    { coin: whiteCoins[0], angle: 0 }, { coin: whiteCoins[1], angle: 60 }, { coin: whiteCoins[2], angle: 120 },
    { coin: whiteCoins[3], angle: 180 }, { coin: whiteCoins[4], angle: 240 }, { coin: whiteCoins[5], angle: 300 },
    
    { coin: blackCoins[0], angle: 30 }, { coin: blackCoins[1], angle: 90 }, { coin: blackCoins[2], angle: 150 },
    { coin: blackCoins[3], angle: 210 }, { coin: blackCoins[4], angle: 270 }, { coin: blackCoins[5], angle: 330 },
  ];

  arrangement.forEach(({coin, angle}) => {
    coin.x = center + (COIN_RADIUS * 2.2 * Math.cos(angle * Math.PI / 180));
    coin.y = center + (COIN_RADIUS * 2.2 * Math.sin(angle * Math.PI / 180));
  });

  // outer ring
  const outerArrangement = [
    { coin: whiteCoins[6], angle: 15 }, { coin: whiteCoins[7], angle: 75 }, { coin: whiteCoins[8], angle: 105 },
    { coin: blackCoins[6], angle: 45 },
  ];
   // A bit of manual placement for a standard-ish layout
  whiteCoins[6].x = center + (COIN_RADIUS * 4.4 * Math.cos(15 * Math.PI / 180));
  whiteCoins[6].y = center + (COIN_RADIUS * 4.4 * Math.sin(15 * Math.PI / 180));
  blackCoins[6].x = center + (COIN_RADIUS * 4.4 * Math.cos(45 * Math.PI / 180));
  blackCoins[6].y = center + (COIN_RADIUS * 4.4 * Math.sin(45 * Math.PI / 180));
  whiteCoins[7].x = center + (COIN_RADIUS * 4.4 * Math.cos(75 * Math.PI / 180));
  whiteCoins[7].y = center + (COIN_RADIUS * 4.4 * Math.sin(75 * Math.PI / 180));
  whiteCoins[8].x = center + (COIN_RADIUS * 4.4 * Math.cos(105 * Math.PI / 180));
  whiteCoins[8].y = center + (COIN_RADIUS * 4.4 * Math.sin(105 * Math.PI / 180));

  // Just placing remaining coins around, this part is not a standard layout
  blackCoins[7].x = center - (COIN_RADIUS * 4.4 * Math.cos(15 * Math.PI / 180));
  blackCoins[7].y = center - (COIN_RADIUS * 4.4 * Math.sin(15 * Math.PI / 180));
  blackCoins[8].x = center - (COIN_RADIUS * 4.4 * Math.cos(45 * Math.PI / 180));
  blackCoins[8].y = center - (COIN_RADIUS * 4.4 * Math.sin(45 * Math.PI / 180));


  return arranged;
}

type Player = 'Player 1' | 'Player 2';

export default function CarromGamePage() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, gameOver
  const [coins, setCoins] = useState(arrangeCoins());
  const [striker, setStriker] = useState({ x: BOARD_SIZE / 2, y: BASE_LINE_Y, vx: 0, vy: 0 });
  const [currentPlayer, setCurrentPlayer] = useState<Player>('Player 1');
  const [scores, setScores] = useState({ 'Player 1': 0, 'Player 2': 0 });
  const [turnState, setTurnState] = useState('positioning'); // positioning, aiming, shooting, animating
  const [aim, setAim] = useState({ x: BOARD_SIZE / 2, y: BOARD_SIZE / 2 });
  const [power, setPower] = useState(5);
  const [winner, setWinner] = useState<Player | null>(null);

  const boardRef = useRef<SVGSVGElement>(null);
  const animationFrameRef = useRef<number>();

  const POCKETS = [
    { x: POCKET_RADIUS, y: POCKET_RADIUS },
    { x: BOARD_SIZE - POCKET_RADIUS, y: POCKET_RADIUS },
    { x: POCKET_RADIUS, y: BOARD_SIZE - POCKET_RADIUS },
    { x: BOARD_SIZE - POCKET_RADIUS, y: BOARD_SIZE - POCKET_RADIUS },
  ];
  
  const assignedCoins = {
    'Player 1': 'white',
    'Player 2': 'black',
  }

  const resetGame = () => {
    setGameState('playing');
    setCoins(arrangeCoins());
    setStriker({ x: BOARD_SIZE / 2, y: BASE_LINE_Y, vx: 0, vy: 0 });
    setCurrentPlayer('Player 1');
    setScores({ 'Player 1': 0, 'Player 2': 0 });
    setTurnState('positioning');
    setWinner(null);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (turnState !== 'aiming' || !boardRef.current) return;
    const svgPoint = boardRef.current.createSVGPoint();
    svgPoint.x = e.clientX;
    svgPoint.y = e.clientY;
    const { x, y } = svgPoint.matrixTransform(boardRef.current.getScreenCTM()?.inverse());
    setAim({ x, y });
  };
  
  const handleStrikerMove = (direction: 'left' | 'right') => {
      if (turnState !== 'positioning') return;
      const step = 10;
      const minX = BOARD_SIZE * 0.25;
      const maxX = BOARD_SIZE * 0.75;
      setStriker(s => ({
          ...s,
          x: Math.max(minX, Math.min(maxX, s.x + (direction === 'left' ? -step : step)))
      }));
  }

  const lockAim = () => {
    if (turnState === 'aiming') {
      setTurnState('shooting');
    }
  };

  const shoot = () => {
    if (turnState !== 'shooting') return;
    const angle = Math.atan2(aim.y - striker.y, aim.x - striker.x);
    setStriker(s => ({
      ...s,
      vx: Math.cos(angle) * power,
      vy: Math.sin(angle) * power,
    }));
    setTurnState('animating');
  };
  
  // Super simplified physics loop
  useEffect(() => {
    if (turnState !== 'animating') {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        return;
    }

    let allCoins = [...coins, striker];
    const friction = 0.98;

    const animate = () => {
      let isMoving = false;
      let pocketedThisTurn = { player: false, opponent: false, queen: false, foul: false };

      // Move and check for pocketing
      allCoins.forEach(c => {
          if (!c.vx && !c.vy) return;

          isMoving = true;
          c.x += c.vx;
          c.y += c.vy;
          c.vx *= friction;
          c.vy *= friction;

          // Stop if velocity is very low
          if (Math.abs(c.vx) < 0.1 && Math.abs(c.vy) < 0.1) {
            c.vx = 0; c.vy = 0;
          }

          // Wall collisions
          if (c.x < COIN_RADIUS || c.x > BOARD_SIZE - COIN_RADIUS) c.vx *= -1;
          if (c.y < COIN_RADIUS || c.y > BOARD_SIZE - COIN_RADIUS) c.vy *= -1;
          c.x = Math.max(COIN_RADIUS, Math.min(BOARD_SIZE - COIN_RADIUS, c.x));
          c.y = Math.max(COIN_RADIUS, Math.min(BOARD_SIZE - COIN_RADIUS, c.y));

          // Pocket collisions
          POCKETS.forEach(p => {
              const dist = Math.hypot(c.x - p.x, c.y - p.y);
              if (dist < POCKET_RADIUS) {
                  if (c.id) { // it's a coin
                      if(!c.inPocket) {
                          c.inPocket = true;
                          c.vx = 0; c.vy = 0;
                          if (c.type === assignedCoins[currentPlayer]) pocketedThisTurn.player = true;
                          else if (c.type === 'red') pocketedThisTurn.queen = true;
                          else pocketedThisTurn.opponent = true;
                      }
                  } else { // it's the striker
                      pocketedThisTurn.foul = true;
                      c.vx = 0; c.vy = 0;
                  }
              }
          });
      });

      // Simplified coin-coin collisions
      for (let i = 0; i < allCoins.length; i++) {
          for (let j = i + 1; j < allCoins.length; j++) {
              const c1 = allCoins[i];
              const c2 = allCoins[j];
              if(c1.inPocket || c2.inPocket) continue;

              const dist = Math.hypot(c1.x - c2.x, c1.y - c2.y);
              const radii = (c1.id ? COIN_RADIUS : STRIKER_RADIUS) + COIN_RADIUS;
              
              if (dist < radii) {
                  // Basic collision response: swap velocities (not physically accurate but simple)
                  [c1.vx, c2.vx] = [c2.vx, c1.vx];
                  [c1.vy, c2.vy] = [c2.vy, c1.vy];
              }
          }
      }

      setCoins([...coins]);
      setStriker({...striker});

      if (isMoving) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // End of turn logic
        const playerCoin = assignedCoins[currentPlayer];
        const newScores = {...scores};
        
        coins.forEach(c => {
            if(c.inPocket && !c.tallied) {
                if(c.type === playerCoin) newScores[currentPlayer]++;
                else if (c.type !== 'red') newScores[currentPlayer === 'Player 1' ? 'Player 2' : 'Player 1']++;
                c.tallied = true; // prevent re-scoring
            }
        });
        
        setScores(newScores);
        
        // Determine next player
        if (!pocketedThisTurn.player && !pocketedThisTurn.queen) {
            setCurrentPlayer(p => p === 'Player 1' ? 'Player 2' : 'Player 1');
        }

        // Reset striker
        const nextPlayerBaseline = currentPlayer === 'Player 1' ? BASE_LINE_Y : 70;
        setStriker({ x: BOARD_SIZE / 2, y: nextPlayerBaseline, vx: 0, vy: 0 });
        setTurnState('positioning');
        
        // Check for game over
        const whiteCoinsLeft = coins.filter(c => c.type === 'white' && !c.inPocket).length;
        const blackCoinsLeft = coins.filter(c => c.type === 'black' && !c.inPocket).length;

        if (whiteCoinsLeft === 0) {
            setWinner('Player 1');
            setGameState('gameOver');
        } else if (blackCoinsLeft === 0) {
            setWinner('Player 2');
            setGameState('gameOver');
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [turnState]);


  if (gameState === 'menu') {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50"><path d="M3 9h18v10H3z"/><path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2"/><path d="M8 12v2"/><path d="M12 12v2"/><path d="M16 12v2"/><path d="M5 12v2"/></svg>
        <h1 className="mt-8 font-headline text-4xl font-bold">Carrom Board</h1>
        <p className="mt-4 max-w-lg text-lg text-muted-foreground">
          A classic two-player game. Pot your coins before your opponent does. Player 1 is White, Player 2 is Black.
        </p>
        <Button onClick={resetGame} className="mt-8 px-8 py-6 text-xl font-bold">
          <Users className="mr-2 h-6 w-6" /> Start 2-Player Game
        </Button>
      </div>
    );
  }
  
  if (gameState === 'gameOver') {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold">Game Over!</h1>
        <p className="mt-4 text-2xl text-primary">{winner} wins!</p>
        <Card className="mt-8 text-center">
            <CardHeader><CardTitle>Final Score</CardTitle></CardHeader>
            <CardContent className="space-y-2 text-lg">
                <p>Player 1: {scores['Player 1']}</p>
                <p>Player 2: {scores['Player 2']}</p>
            </CardContent>
        </Card>
        <div className="mt-8 flex gap-4">
            <Button onClick={resetGame}>
                <RotateCw className="mr-2 h-4 w-4" /> Play Again
            </Button>
            <Button asChild variant="outline">
                <Link href="/game-zone">Back to Game Zone</Link>
            </Button>
        </div>
      </div>
    );
  }
  
  const strikerBaselineY = currentPlayer === 'Player 1' ? BASE_LINE_Y : 70;
  const showAimLine = turnState === 'aiming' || turnState === 'shooting';

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8 md:px-6">
       <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Game Board */}
          <div className="md:col-span-2 flex items-center justify-center">
            <svg
                ref={boardRef}
                width="100%"
                height="100%"
                viewBox={`0 0 ${BOARD_SIZE} ${BOARD_SIZE}`}
                className="max-w-[500px] max-h-[500px] aspect-square rounded-lg border-8 border-yellow-800 bg-yellow-600 shadow-lg"
                onMouseMove={handleMouseMove}
                onClick={lockAim}
            >
                {/* Board Surface */}
                <rect width={BOARD_SIZE} height={BOARD_SIZE} fill="#f3bf6d" />

                {/* Pockets */}
                {POCKETS.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={POCKET_RADIUS} fill="black" />)}
                
                {/* Baselines */}
                {[70, BOARD_SIZE-70].map(y => (
                  <g key={y}>
                    <line x1={BOARD_SIZE*0.25} y1={y} x2={BOARD_SIZE*0.75} y2={y} stroke="black" strokeWidth="2" />
                    <circle cx={BOARD_SIZE*0.25} cy={y} r={15} stroke="red" fill="none" strokeWidth="2" />
                    <circle cx={BOARD_SIZE*0.75} cy={y} r={15} stroke="red" fill="none" strokeWidth="2" />
                  </g>
                ))}

                {/* Center circle */}
                <circle cx={BOARD_SIZE/2} cy={BOARD_SIZE/2} r={50} fill="none" stroke="red" strokeWidth="2" />
                <circle cx={BOARD_SIZE/2} cy={BOARD_SIZE/2} r={20} fill="red" />

                {/* Coins */}
                {coins.map(c => !c.inPocket && (
                    <circle key={c.id} cx={c.x} cy={c.y} r={COIN_RADIUS} fill={c.color} stroke={c.type==='white' ? '#888' : 'none'} strokeWidth="1" />
                ))}

                {/* Striker */}
                <circle
                    cx={striker.x}
                    cy={turnState === 'positioning' ? strikerBaselineY : striker.y}
                    r={STRIKER_RADIUS}
                    fill="blue"
                    className={cn(turnState === 'positioning' ? 'cursor-pointer' : 'cursor-default')}
                    onClick={(e) => { e.stopPropagation(); if (turnState === 'positioning') setTurnState('aiming'); }}
                />

                {/* Aim Line */}
                {showAimLine && (
                    <g>
                        <line x1={striker.x} y1={strikerBaselineY} x2={aim.x} y2={aim.y} stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeDasharray="5,5" />
                        <circle cx={aim.x} cy={aim.y} r="5" fill="rgba(255,255,255,0.5)" />
                    </g>
                )}
            </svg>
          </div>
          
          {/* Controls & Score */}
          <div className="flex flex-col gap-6">
            <Card>
                <CardHeader><CardTitle>Scoreboard</CardTitle></CardHeader>
                <CardContent className="space-y-4 text-lg">
                    <div className={cn("font-bold p-2 rounded", currentPlayer === 'Player 1' && 'bg-primary text-primary-foreground')}>
                        Player 1 (White): {scores['Player 1']}
                    </div>
                     <div className={cn("font-bold p-2 rounded", currentPlayer === 'Player 2' && 'bg-primary text-primary-foreground')}>
                        Player 2 (Black): {scores['Player 2']}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        {currentPlayer}'s Turn
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {turnState === 'positioning' && (
                        <div className="space-y-4 text-center">
                            <p>Position your striker on the baseline.</p>
                            <div className="flex justify-center gap-4">
                                <Button onClick={() => handleStrikerMove('left')}><ChevronLeft /> Move Left</Button>
                                <Button onClick={() => handleStrikerMove('right')}>Move Right <ChevronRight/></Button>
                            </div>
                            <Button className="w-full" onClick={() => setTurnState('aiming')}>Click Striker to Aim</Button>
                        </div>
                    )}
                     {turnState === 'aiming' && (
                        <div className="space-y-2 text-center">
                            <p>Move your mouse to aim.</p>
                            <Button className="w-full" onClick={lockAim}>Click Board to Lock Aim</Button>
                        </div>
                    )}
                    {turnState === 'shooting' && (
                        <div className="space-y-4">
                            <p className="text-center">Adjust power and shoot!</p>
                             <Slider
                                defaultValue={[power]}
                                max={20}
                                min={2}
                                step={1}
                                onValueChange={(value) => setPower(value[0])}
                            />
                            <p className="text-center">Power: {power}</p>
                            <Button className="w-full" onClick={shoot}>SHOOT</Button>
                        </div>
                    )}
                    {turnState === 'animating' && (
                        <div className="text-center">
                            <p>Animating...</p>
                        </div>
                    )}
                </CardContent>
            </Card>

             <Button onClick={resetGame} variant="outline">
                <RotateCw className="mr-2 h-4 w-4" /> Reset Game
            </Button>
          </div>
       </div>
    </div>
  );
}

    