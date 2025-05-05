import { Pencil, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MovieItem } from '@/@types/movies';

interface Props {
  movies: MovieItem[];
  onEdit: (movie: MovieItem) => void;
  onDelete: (movieId: number) => void;
  onSchedule: (movieId: number) => void;
}

export function MovieTable({ movies, onEdit, onDelete, onSchedule }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow key={movie.maPhim}>
            <TableCell>{movie.maPhim}</TableCell>
            <TableCell>
              <img
                src={movie.hinhAnh || '/placeholder.svg'}
                alt={movie.tenPhim}
                width={60}
                height={60}
                className='rounded-md object-cover'
              />
            </TableCell>
            <TableCell>{movie.tenPhim}</TableCell>
            <TableCell>
              <div className='line-clamp-2 max-w-xs text-sm text-muted-foreground'>{movie.moTa}</div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center gap-2'>
                <Button variant='outline' size='icon' className='h-8 w-8' onClick={() => onEdit(movie)}>
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button variant='destructive' size='icon' className='h-8 w-8' onClick={() => onDelete(movie.maPhim)}>
                  <Trash2 className='h-4 w-4' />
                </Button>
                <Button variant='secondary' size='icon' className='h-8 w-8' onClick={() => onSchedule(movie.maPhim)}>
                  <Calendar className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
