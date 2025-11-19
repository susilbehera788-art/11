import Link from 'next/link';
import { Icons } from './icons';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center space-x-2">
              <Icons.CricketBall className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">
                Bharat Cricket Chronicles
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your ultimate source for everything about Indian cricket.
            </p>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/history" className="text-sm text-muted-foreground hover:text-primary">History</Link></li>
              <li><Link href="/cricketers" className="text-sm text-muted-foreground hover:text-primary">Cricketers</Link></li>
              <li><Link href="/players" className="text-sm text-muted-foreground hover:text-primary">Current Players</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                Address: Wankhede Stadium, Mumbai, India
              </li>
              <li className="flex items-center">
                Mobile: +91 84804 47800
              </li>
              <li className="flex items-center">
                Email: contact@bcc.example.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
             <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Bharat Cricket Chronicles. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
