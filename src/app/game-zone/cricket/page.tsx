'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Gamepad2, Play, RefreshCw } from 'lucide-react';
import Link from 'next/link';

const MAX_OVERS = 2;
const MAX_WICKETS = 10;
const SHOTS = [0, 1, 2, 3, 4, 6, 'OUT'];
const SHOT_PROBABILITY = [0.3, 0.2, 0.1, 0.05, 0.15, 0.1, 0.1]; // Must add up to 1

export default function CricketGamePage() {
  const [gameState, setGameState] = useState({
    score: 0,
    wickets: 0,
    overs: 0,
    balls: 0,
    commentary: ['Welcome to the Cricket Challenge! Press "Play Shot" to start.'],
    isGameOver: false,
    isGameStarted: false,
  });

  const resetGame = () => {
    setGameState({
      score: 0,
      wickets: 0,
      overs: 0,
      balls: 0,
      commentary: ['Welcome to the Cricket Challenge! Press "Play Shot" to start.'],
      isGameOver: false,
      isGameStarted: false,
    });
  };

  const handlePlayShot = () => {
    if (gameState.isGameOver) return;

    if (!gameState.isGameStarted) {
      setGameState(prevState => ({ ...prevState, isGameStarted: true, commentary: ['The match begins!'] }));
    }

    const random = Math.random();
    let cumulativeProb = 0;
    let outcome: (typeof SHOTS)[number] = 0;

    for (let i = 0; i < SHOTS.length; i++) {
      cumulativeProb += SHOT_PROBABILITY[i];
      if (random < cumulativeProb) {
        outcome = SHOTS[i];
        break;
      }
    }

    let newScore = gameState.score;
    let newWickets = gameState.wickets;
    let newBalls = gameState.balls + 1;
    let newOvers = gameState.overs;
    let newCommentary: string;

    if (outcome === 'OUT') {
      newWickets++;
      newCommentary = `It's OUT! A big wicket for the opposition.`;
    } else {
      newScore += outcome;
      if (outcome === 0) {
        newCommentary = `A dot ball. The pressure builds.`;
      } else if (outcome === 4) {
        newCommentary = `FOUR! A glorious shot to the boundary.`;
      } else if (outcome === 6) {
        newCommentary = `SIX! That's out of the park!`;
      } else {
        newCommentary = `${outcome} run${outcome > 1 ? 's' : ''}. Good running between the wickets.`;
      }
    }

    if (newBalls === 6) {
      newOvers++;
      newBalls = 0;
    }

    const isGameOver = newWickets >= MAX_WICKETS || newOvers >= MAX_OVERS;
    
    if (isGameOver && !gameState.isGameOver) {
      if (newWickets >= MAX_WICKETS) {
          newCommentary = `All out! The innings is over. Final score: ${newScore}/${newWickets}.`;
      } else {
          newCommentary = `Innings complete! You scored ${newScore}/${newWickets} in ${MAX_OVERS} overs.`;
      }
    }

    setGameState(prevState => ({
      ...prevState,
      score: newScore,
      wickets: newWickets,
      overs: newOvers,
      balls: newBalls,
      commentary: [newCommentary, ...prevState.commentary].slice(0, 5),
      isGameOver: isGameOver,
    }));
  };
  
  if (!gameState.isGameStarted) {
    return (
        <div className="flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center text-center">
            <Gamepad2 className="h-24 w-24 text-muted-foreground/50" />
            <h1 className="mt-8 text-4xl font-bold">Cricket Challenge</h1>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">
                Step up to the crease and face the AI bowler. You have {MAX_OVERS} overs and {MAX_WICKETS} wickets. Can you set a high score?
            </p>
            <Button onClick={handlePlayShot} className="mt-8 px-8 py-6 text-xl font-bold">
                <Play className="mr-2 h-6 w-6" /> Start Game
            </Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Card className="overflow-hidden shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-center text-3xl">Cricket Challenge</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Scoreboard */}
          <div className="grid grid-cols-3 divide-x divide-border rounded-lg border bg-muted/50 p-4 text-center">
            <div>
              <p className="text-4xl font-bold text-primary">{gameState.score}/{gameState.wickets}</p>
              <p className="text-sm text-muted-foreground">Score</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{gameState.overs}</p>
              <p className="text-sm text-muted-foreground">Overs</p>
            </div>
            <div>
              <p className="text-4xl font-bold">{gameState.balls}</p>
              <p className="text-sm text-muted-foreground">Balls</p>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <Button 
                onClick={handlePlayShot} 
                disabled={gameState.isGameOver}
                className="w-full max-w-xs px-8 py-6 text-xl font-bold shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Play Shot
            </Button>
          </div>

          {/* Commentary */}
          <div>
            <h3 className="mb-2 text-lg font-semibold">Commentary</h3>
            <div className="h-48 space-y-2 overflow-y-auto rounded-md border bg-background p-4 text-sm">
              {gameState.commentary.map((text, index) => (
                <p key={index} className={`transition-opacity duration-500 ${index === 0 ? 'opacity-100' : 'opacity-70'}`}>{text}</p>
              ))}
            </div>
          </div>

          {/* Game Over Screen */}
          {gameState.isGameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white">
                  <h2 className="text-4xl font-bold">Game Over!</h2>
                  <p className="mt-2 text-xl">Final Score: {gameState.score}/{gameState.wickets}</p>
                  <Button onClick={resetGame} className="mt-8">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Play Again
                  </Button>
                  <Button asChild variant="link" className="mt-2 text-white">
                      <Link href="/game-zone">Back to Game Zone</Link>
                  </Button>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
