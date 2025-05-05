import path from '@/constants/path';
import { Film, Home } from 'lucide-react';

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
  }
];
export default navigateItems;
