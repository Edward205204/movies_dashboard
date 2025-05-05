import { Link } from 'react-router';
import { cn } from '@/lib/utils';
import navigateItems from '@/constants/menu_items';

export default function Aside() {
  return (
    <aside className='hidden w-64 border-r bg-muted/40 md:block'>
      <div className='flex h-full flex-col gap-2'>
        <div className='flex-1 overflow-auto py-2'>
          <nav className='grid items-start px-2 text-sm font-medium'>
            {navigateItems.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 transition-colors',
                  location.pathname === item.link
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className='h-5 w-5' />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
}
