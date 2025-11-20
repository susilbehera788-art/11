'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

const cricketers = [
  'Virat Kohli',
  'MS Dhoni',
  'Rohit Sharma',
  'Sachin Tendulkar',
  'Virender Sehwag',
  'Yuvraj Singh',
  'KL Rahul',
];

const segmentColors = [
  'bg-red-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
];

export function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const segments = useMemo(() => {
    const numSegments = cricketers.length;
    const angle = 360 / numSegments;
    return cricketers.map((name, index) => ({
      name,
      angle: index * angle,
      color: segmentColors[index % segmentColors.length],
    }));
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setWinner(null);

    // Calculate a new random rotation
    const randomSpins = Math.floor(Math.random() * 5) + 5; // 5 to 9 full spins
    const randomStopAngle = Math.random() * 360;
    const newRotation = rotation + randomSpins * 360 + randomStopAngle;
    
    setRotation(newRotation);

    // Determine the winner after the spin animation
    setTimeout(() => {
      const finalAngle = newRotation % 360;
      const numSegments = segments.length;
      const segmentAngle = 360 / numSegments;

      // The pointer is at the top (0 degrees or 360 degrees).
      // We need to find which segment is under the pointer.
      // The wheel spins clockwise, so we need to calculate the inverse.
      const winningIndex = Math.floor((360 - finalAngle + segmentAngle / 2) % 360 / segmentAngle);

      setWinner(segments[winningIndex].name);
      setIsSpinning(false);
      setShowWinnerDialog(true);
    }, 6000); // Corresponds to the animation duration
  };

  const wheelStyle = {
    transform: `rotate(${rotation}deg)`,
    transition: isSpinning ? 'transform 6s cubic-bezier(0.25, 0.1, 0.25, 1)' : 'none',
  };

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }
  
  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8 rounded-lg bg-card text-card-foreground shadow-xl">
      <h2 className="mb-6 text-center font-headline text-2xl font-bold text-primary md:text-3xl">
        Choose Your Favourite Cricketer by Luck!
      </h2>
      <div className="relative flex h-[300px] w-[300px] items-center justify-center md:h-[400px] md:w-[400px]">
        {/* Pointer */}
        <div className="absolute -top-4 z-10 h-0 w-0 border-x-8 border-b-[16px] border-x-transparent border-b-red-600 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] md:-top-5 md:border-x-[12px] md:border-b-[24px]"></div>

        {/* Outer Frame */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 p-2 shadow-[inset_0_0_10px_rgba(0,0,0,0.3),0_5px_15px_rgba(0,0,0,0.2)] md:p-4">
          <div className="h-full w-full rounded-full bg-slate-100 shadow-inner"></div>
        </div>

        {/* Wheel */}
        <div
          className="relative h-[280px] w-[280px] rounded-full md:h-[370px] md:w-[370px]"
          style={wheelStyle}
        >
          {segments.map(({ name, angle, color }, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-0 h-1/2 w-1/2 origin-bottom-left"
              style={{
                transform: `rotate(${angle}deg)`,
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              }}
            >
              <div
                className={cn('absolute inset-0', color)}
              >
                <div className="flex h-full items-start justify-center pt-4 md:pt-6">
                  <span className="text-xs font-bold text-black/70 md:text-sm" style={{ transform: `rotate(90deg) translate(-50%, -50%)`, transformOrigin: 'center', writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                    {name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Center hub */}
        <div className="absolute h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-600 shadow-md md:h-12 md:w-12"></div>
      </div>
      <Button
        onClick={handleSpin}
        disabled={isSpinning}
        className="mt-8 bg-accent px-12 py-6 text-xl font-bold text-accent-foreground shadow-lg transition-all hover:scale-105 hover:bg-accent/90 active:scale-100"
      >
        {isSpinning ? 'Spinning...' : 'SPIN'}
      </Button>

      <AlertDialog open={showWinnerDialog} onOpenChange={setShowWinnerDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-center gap-2 text-2xl">
              <Star className="h-7 w-7 text-yellow-400" />
              Congratulations!
            </AlertDialogTitle>
            <AlertDialogDescription className="pt-4 text-center text-lg">
              Your Lucky Cricketer is:
              <br />
              <span className="mt-2 block font-bold text-primary text-2xl">{winner}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowWinnerDialog(false)}>
              Play Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
