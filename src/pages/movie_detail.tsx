import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import movieApi from '@/APIs/movie.api';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { MovieItem } from '@/@types/movies';

export default function MovieDetailPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieApi.getMovieDetail(id as string),
    enabled: Boolean(id)
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.data?.content) return <div>Movie not found.</div>;

  const movie: MovieItem = data.data.content;

  return (
    <div className='flex justify-center mt-10'>
      <Card className='w-full max-w-xl p-6 flex flex-col items-center gap-6'>
        <Avatar className='w-40 h-60'>
          <img src={movie.hinhAnh} alt={movie.tenPhim} className='object-cover w-full h-full rounded-md' />
        </Avatar>
        <div className='w-full'>
          <h2 className='text-2xl font-bold mb-2'>{movie.tenPhim}</h2>
          <p className='text-muted-foreground mb-2'>{movie.moTa}</p>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            <div>
              <span className='font-semibold'>ID:</span> {movie.maPhim}
            </div>
            <div>
              <span className='font-semibold'>Group:</span> {movie.maNhom}
            </div>
            <div>
              <span className='font-semibold'>Release:</span> {movie.ngayKhoiChieu}
            </div>
            <div>
              <span className='font-semibold'>Rating:</span> {movie.danhGia}
            </div>
            <div>
              <span className='font-semibold'>Hot:</span> {movie.hot ? 'Yes' : 'No'}
            </div>
            <div>
              <span className='font-semibold'>Now Showing:</span> {movie.dangChieu ? 'Yes' : 'No'}
            </div>
            <div>
              <span className='font-semibold'>Coming Soon:</span> {movie.sapChieu ? 'Yes' : 'No'}
            </div>
            <div>
              <span className='font-semibold'>Trailer:</span>{' '}
              <a href={movie.trailer} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
                Watch
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
