import { Pencil, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MovieItem } from '@/@types/movies';
import { useNavigate } from 'react-router';
interface Props {
  movies: MovieItem[];
  onEdit: (movie: MovieItem) => void;
  onDelete: (movieId: number) => void;
  onSchedule: (movieId: number) => void;
}

export function MovieTable({ movies, onEdit, onDelete, onSchedule }: Props) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow className='grid grid-cols-[80px_100px_1fr_2fr_460px] items-center gap-4 '>
          <TableHead>ID</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {movies.map((movie) => (
          <TableRow
            key={movie.maPhim}
            onClick={() => navigate(`/movies/${movie.maPhim}`)}
            className='grid grid-cols-[80px_100px_1fr_2fr_460px] items-center gap-4 cursor-pointer'
          >
            <TableCell>{movie.maPhim}</TableCell>
            <TableCell>
              <div className='w-[60px] h-[70px] overflow-hidden rounded-md'>
                <img
                  src={movie.hinhAnh || '/placeholder.svg'}
                  alt={movie.tenPhim}
                  className='w-full h-full object-cover'
                />
              </div>
            </TableCell>
            <TableCell>{movie.tenPhim}</TableCell>
            <TableCell>
              <div className='line-clamp-2 text-wrap max-w-xs text-sm text-muted-foreground'>{movie.moTa}</div>
            </TableCell>
            <TableCell>
              <div className='flex justify-center gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  className='h-8 w-8'
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(movie);
                  }}
                >
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button
                  variant='destructive'
                  size='icon'
                  className='h-8 w-8'
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(movie.maPhim);
                  }}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
                <Button
                  variant='secondary'
                  size='icon'
                  className='h-8 w-8'
                  onClick={(e) => {
                    e.stopPropagation();
                    onSchedule(movie.maPhim);
                  }}
                >
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
