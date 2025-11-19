import Link from 'next/link';
import { Button } from './ui/button';
import { Icons } from './icons';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export function CreditCardApplyButton() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-accent shadow-lg transition-transform hover:scale-110 hover:bg-accent/90"
            aria-label="Apply for Credit Card via WhatsApp"
          >
            <Link
              href="https://wa.me/918480447800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.WhatsApp className="h-8 w-8 text-accent-foreground" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Apply for Credit Card</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
