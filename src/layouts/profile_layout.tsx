import Header from '@/components/customs/header';
import { Link, useLocation } from 'react-router';
import { User, Settings, Home } from 'lucide-react';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const menu = [
    { name: 'Profile', icon: User, link: '/profile' },
    { name: 'Setting', icon: Settings, link: '/profile/setting' }
  ];
  return (
    <div className='flex min-h-screen flex-col'>
      <Header />
      <div className='flex flex-1'>
        <aside className='w-56 border-r bg-muted/40 p-4 flex flex-col gap-2'>
          <Link
            to='/'
            className='flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-2 border border-transparent hover:border-black'
          >
            <Home className='w-5 h-5' />
            Back to Home
          </Link>
          {menu.map((item) => (
            <Link
              key={item.link}
              to={item.link}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                location.pathname === item.link
                  ? 'bg-accent text-accent-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <item.icon className='w-5 h-5' />
              {item.name}
            </Link>
          ))}
        </aside>
        <main className='flex-1 overflow-auto p-4 md:p-6'>{children}</main>
      </div>
    </div>
  );
}
