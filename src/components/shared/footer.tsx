import { Link } from 'react-router';
import { Film } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='border-t bg-muted/40 flex items-center justify-center'>
      <div className='container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0'>
        <div className='flex items-center gap-2'>
          <Film className='h-5 w-5' />
          <span className='text-sm font-semibold'>Movie Admin</span>
        </div>
        <div className='flex flex-col items-center gap-4 md:flex-row'>
          <nav className='flex gap-4 text-sm'>
            <Link to='#' className='text-muted-foreground transition-colors hover:text-foreground'>
              Terms
            </Link>
            <Link to='#' className='text-muted-foreground transition-colors hover:text-foreground'>
              Privacy
            </Link>
            <Link to='#' className='text-muted-foreground transition-colors hover:text-foreground'>
              Cookies
            </Link>
          </nav>
          <p className='text-center text-sm text-muted-foreground md:text-left'>
            &copy; {new Date().getFullYear()} Movie Admin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
