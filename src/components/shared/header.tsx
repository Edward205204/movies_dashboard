import { Film } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Link } from 'react-router';

export function RegisterHeader() {
  return (
    <header className='flex justify-center items-center fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-5'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Film className='h-6 w-6' />
          <span className='text-lg font-bold'>Movie Admin</span>
        </div>
        <div className='flex items-center gap-4'>
          <nav className='hidden gap-6 md:flex'>
            <Link to='#' className='text-sm font-medium transition-colors hover:text-primary'>
              Features
            </Link>
            <Link to='#' className='text-sm font-medium transition-colors hover:text-primary'>
              Pricing
            </Link>
            <Link to='#' className='text-sm font-medium transition-colors hover:text-primary'>
              About
            </Link>
            <Link to='#' className='text-sm font-medium transition-colors hover:text-primary'>
              Contact
            </Link>
          </nav>
          <ModeToggle />
          <Button asChild variant='outline' size='sm' className='hidden md:inline-flex'>
            <Link to='#'>Help Center</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
