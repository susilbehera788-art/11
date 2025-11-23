'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import {
  Menu,
  Home,
  Trophy,
  Users,
  History,
  Phone,
  Gamepad2,
} from 'lucide-react';
import { Icons } from './icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import * as React from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/history', label: 'History', icon: History },
  { href: '/cricketers', label: 'Cricketers', icon: Users },
  { href: '/players', label: 'Current Players', icon: Trophy },
  { href: '/game-zone', label: 'Game Zone', icon: Gamepad2 },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2" prefetch={true}>
            <Icons.CricketBall className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              Bharat Cricket Chronicles
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-muted-foreground'
                )}
                prefetch={true}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="mb-6 flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <Icons.CricketBall className="h-6 w-6 text-primary" />
              <span className="font-bold">Bharat Cricket Chronicles</span>
            </Link>
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-md p-2 transition-colors hover:bg-accent hover:text-accent-foreground',
                    pathname === link.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                  )}
                  prefetch={true}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="flex items-center space-x-2 md:hidden">
          <Icons.CricketBall className="h-6 w-6 text-primary" />
          <span className="font-bold">BCC</span>
        </Link>
      </div>
    </header>
  );
}
