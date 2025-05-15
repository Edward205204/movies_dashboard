import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router';
import movieApi from '@/APIs/movie.api';
import { Button } from '@/components/ui/button';
import { MovieItem } from '@/@types/movies';
import { Pencil, ImageOff, Star, CalendarDays, Flame, Eye, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

function formatDateDMY(dateStr: string) {
  if (!dateStr) return '';
  // Nếu có dạng ISO hoặc có ký tự T
  if (dateStr.includes('T')) {
    // Thử parse dạng yyyy-MM-ddTHH:mm:ss hoặc dd/MM/yyyyTHH:mm:ss
    // Ưu tiên tách lấy phần ngày
    const [datePart] = dateStr.split('T');
    // Nếu là yyyy-MM-dd
    if (datePart.includes('-')) {
      const [y, m, d] = datePart.split('-');
      return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
    }
    // Nếu là dd/MM/yyyy
    if (datePart.includes('/')) {
      return datePart;
    }
    // Nếu là MM/yyyy hoặc các dạng khác thì trả về nguyên bản
    return datePart;
  }
  // Nếu là dd/MM/yyyy
  if (dateStr.includes('/')) return dateStr.split(' ')[0];
  // Nếu là yyyy-MM-dd
  if (dateStr.includes('-')) {
    const [y, m, d] = dateStr.split('-');
    return `${d.padStart(2, '0')}/${m.padStart(2, '0')}/${y}`;
  }
  return dateStr;
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', id],
    queryFn: () => movieApi.getMovieDetail(id as string),
    enabled: Boolean(id)
  });
  const [imgError, setImgError] = useState(false);

  if (isLoading) return <div className='flex justify-center items-center h-[60vh] text-lg'>Loading...</div>;
  if (isError || !data?.data?.content)
    return <div className='flex justify-center items-center h-[60vh] text-lg text-destructive'>Movie not found.</div>;

  const movie: MovieItem = data.data.content;

  return (
    <div className='relative flex flex-col md:flex-row w-full min-h-[80vh] bg-background p-0 md:p-12 gap-0 md:gap-12 items-center'>
      {/* Nút Back */}
      <Button
        variant='ghost'
        size='icon'
        className='absolute top-4 left-4 z-20 bg-white/80 hover:bg-white border shadow-md'
        onClick={() => navigate('/movies')}
      >
        <ArrowLeft className='w-6 h-6' />
      </Button>
      {/* Poster + Edit button */}
      <div className='relative w-full md:w-[340px] flex-shrink-0 flex justify-center items-center md:items-start mb-8 md:mb-0'>
        <div className='group relative w-[220px] h-[320px] md:w-[260px] md:h-[400px] flex items-end transition-all duration-300'>
          {imgError || !movie.hinhAnh ? (
            <div className='flex flex-col items-center justify-center w-full h-full bg-muted-foreground/10 text-muted-foreground rounded-xl border shadow-lg'>
              <ImageOff className='w-16 h-16 mb-2' />
              <span className='text-base'>No Image</span>
            </div>
          ) : (
            <img
              src={movie.hinhAnh}
              alt={movie.tenPhim}
              className='object-cover w-full h-full rounded-xl border shadow-lg group-hover:scale-105 transition-transform duration-300'
              onError={() => setImgError(true)}
            />
          )}
        </div>
      </div>
      {/* Movie Info */}
      <div className='flex-1 flex flex-col justify-center px-4 md:px-0 py-4 md:py-0 max-w-2xl'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='text-3xl md:text-4xl font-bold'>{movie.tenPhim}</h2>
          <Button
            variant='outline'
            size='icon'
            className='ml-4 bg-white/80 hover:bg-white border shadow-md'
            onClick={() => navigate(`/movies/edit/${movie.maPhim}`)}
          >
            <Pencil className='w-5 h-5' />
          </Button>
        </div>
        <div className='h-1 w-16 bg-primary rounded-full mb-6'></div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-base mb-8 md:flex md:flex-wrap md:gap-x-10 md:gap-y-4'>
          <div className='flex items-center gap-2 min-w-[220px]'>
            <CalendarDays className='w-5 h-5 text-blue-500' />
            <span className='font-semibold'>Release:</span> {formatDateDMY(movie.ngayKhoiChieu)}
          </div>
          <div className='flex items-center gap-2 min-w-[160px]'>
            <Star className='w-5 h-5 text-yellow-500' />
            <span className='font-semibold'>Rating:</span> {movie.danhGia}
          </div>
          <div className='flex items-center gap-2 min-w-[160px]'>
            <Flame className='w-5 h-5 text-red-500' />
            <span className='font-semibold'>Hot:</span> {movie.hot ? 'Yes' : 'No'}
          </div>
          <div className='flex items-center gap-2 min-w-[200px]'>
            <Eye className='w-5 h-5 text-green-500' />
            <span className='font-semibold'>Now Showing:</span> {movie.dangChieu ? 'Yes' : 'No'}
          </div>
          <div className='flex items-center gap-2 min-w-[200px]'>
            <Clock className='w-5 h-5 text-indigo-500' />
            <span className='font-semibold'>Coming Soon:</span> {movie.sapChieu ? 'Yes' : 'No'}
          </div>
          <div className='flex items-center gap-2 min-w-[120px]'>
            <span className='font-semibold'>ID:</span> {movie.maPhim}
          </div>
          <div className='flex items-center gap-2 min-w-[120px]'>
            <span className='font-semibold'>Group:</span> {movie.maNhom}
          </div>
        </div>
        <div className='mb-6'>
          <p className='text-muted-foreground text-base'>{movie.moTa}</p>
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <span className='font-semibold'>Trailer:</span>
          <a href={movie.trailer} target='_blank' rel='noopener noreferrer' className='text-blue-600 underline'>
            Watch
          </a>
        </div>
      </div>
    </div>
  );
}
