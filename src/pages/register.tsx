import { Film } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { RegisterForm } from '@/components/register_form';

export default function LoginPage() {
  return (
    <div className='grid min-h-svh lg:grid-cols-2'>
      <div className='flex flex-col gap-4 p-6 md:p-10'>
        <div className='flex items-center justify-between'>
          <div className='flex justify-center gap-2 md:justify-start'>
            <a href='#' className='flex items-center gap-2 font-medium'>
              <div className='flex items-center gap-2'>
                <Film className='h-6 w-6' />
                <span className='text-lg font-bold'>Movie Admin</span>
              </div>
            </a>
          </div>
          <ModeToggle />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          <div className='w-full max-w-xs'>
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className='relative hidden bg-muted lg:block' style={{ width: '952px', height: '933px' }}>
        <img src='/movie_poster.png' alt='Image' className='absolute inset-0 h-full w-full object-cover ' />
      </div>
    </div>
  );
}
