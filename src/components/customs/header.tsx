import { Film, Menu, Search, Bell, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext, useState } from 'react';
import navigateItems from '@/constants/menu_items';
import { removeAccessTokenAndProfile } from '@/utils/auth';
import { AppContext } from '@/context/app.context';
import { ModeToggle } from '../mode-toggle';
import { createSearchParams } from 'react-router';
import path from '@/constants/path';
import { useQueryConfig } from '@/hooks/query_config';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { setIsAuthenticated } = useContext(AppContext);
  const location = useLocation();
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessTokenAndProfile();
    setIsAuthenticated(false);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
    if (location.pathname === path.movies) {
      const newQueryConfig = {
        ...queryConfig,
        ...(value ? { tenPhim: value } : {})
      };
      navigate({
        pathname: path.movies,
        search: createSearchParams(newQueryConfig).toString()
      });
    }
  };

  return (
    <header className='sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6'>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='w-72 pr-0'>
          <div className='flex items-center gap-2 pb-4'>
            <Film className='h-6 w-6' />
            <span className='text-lg font-semibold'>Movie Admin</span>
          </div>
          <div className='grid gap-2 py-4'>
            {navigateItems.map((item) => (
              <Link
                key={item.link}
                to={item.link}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                  location.pathname === item.link
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                <item.icon className='h-5 w-5' />
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <div className='flex items-center gap-2'>
        <Film className='h-6 w-6 md:h-8 md:w-8' />
        <span className='text-lg font-semibold hidden md:inline-flex'>Movie Admin</span>
      </div>

      <div className='flex-1'>
        <form className='hidden md:block'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder={location.pathname === path.movies ? 'Search movies...' : 'Search...'}
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              className='w-full bg-background pl-8 md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>

      <div className='flex items-center gap-4'>
        <ModeToggle />

        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='h-5 w-5' />
          <span className='absolute right-1 top-1 flex h-2 w-2 rounded-full bg-primary'></span>
          <span className='sr-only'>Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src='/placeholder.svg' alt='Admin' />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
