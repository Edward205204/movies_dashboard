import { Link } from 'react-router';
import { Film, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <div className='flex-1 p-6'>
      <div className='flex flex-col items-center gap-6'>
        <div className='flex items-center gap-4'>
          <Film className='w-16 h-16' />
          <span className='text-5xl font-extrabold tracking-tight'>Movie & User Admin</span>
        </div>
        <p className='text-xl text-muted-foreground max-w-xl text-center'>
          Welcome to the Movie and User Management System.
          <br />
          Please select a function below to start managing!
        </p>
        <div className='flex gap-6 mt-4'>
          <Link
            to='/movies'
            className='flex items-center gap-2 border border-border rounded-lg px-6 py-3 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors'
          >
            <Film className='w-6 h-6' />
            Movie Management
          </Link>
          <Link
            to='/users'
            className='flex items-center gap-2 border border-border rounded-lg px-6 py-3 text-lg font-semibold hover:bg-accent hover:text-accent-foreground transition-colors'
          >
            <Users className='w-6 h-6' />
            User Management
          </Link>
        </div>
      </div>
    </div>
  );
}
