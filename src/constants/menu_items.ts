import path from '@/constants/path';
import { Film, Home, User } from 'lucide-react';

const navigateItems = [
  {
    name: 'Dashboard',
    link: path.home,
    icon: Home
  },
  {
    name: 'Movies',
    link: path.movies,
    icon: Film
  },
  {
    name: 'Users',
    link: path.users,
    icon: User
  }
];

export default navigateItems;
