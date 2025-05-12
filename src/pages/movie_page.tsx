import { useEffect } from 'react';
import { MovieTable } from '@/components/customs/movie_table';
import { toast } from 'react-toastify';
import { MovieItem, MovieQueryParams } from '@/@types/movies';
import { useQuery } from '@tanstack/react-query';
import { useQueryConfig } from '@/hooks/query_config';
import movieApi from '@/APIs/movie.api';
import { createSearchParams, useNavigate } from 'react-router';
import path from '@/constants/path';
import PaginationWrapper from '@/components/customs/pagination_wrapper';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function MoviePage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['movies', queryConfig],
    queryFn: () => movieApi.getMovies(queryConfig as MovieQueryParams),
    placeholderData: (previousData) => previousData
  });
  const content = data?.data.content;

  const handleEdit = (movie: MovieItem) => {
    toast.info(`Edit movie: ${movie.tenPhim}`);
  };

  const handleDelete = (movieId: number) => {
    toast.success(`Deleted movie with ID: ${movieId}`);
  };

  const handleSchedule = (movieId: number) => {
    toast.info(`Schedule for movie ID: ${movieId}`);
  };

  const handleAddMovie = () => {
    toast.info('Thêm phim mới');
  };

  useEffect(() => {
    if (!content) return;

    const currentPage = parseInt(queryConfig.soTrang as string);
    const itemsPerPage = parseInt(queryConfig.soPhanTuTrenTrang as string);
    const totalItems = content.totalCount;
    const maxPage = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > maxPage) {
      navigate({
        pathname: path.movies,
        search: createSearchParams({ ...queryConfig, soTrang: maxPage.toString() }).toString()
      });
    }
  }, [queryConfig, navigate, content]);

  const goToPage = (page: number) => {
    navigate({
      pathname: path.movies,
      search: createSearchParams({
        ...queryConfig,
        soTrang: page.toString()
      }).toString()
    });
  };

  // Tính toán lại số trang tổng cộng
  const calculateTotalPages = () => {
    if (!content) return 1;
    const itemsPerPage = parseInt(queryConfig.soPhanTuTrenTrang as string);
    const totalItems = content.totalCount;
    return Math.ceil(totalItems / itemsPerPage);
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-semibold'>Movie Management</h1>
          <Button onClick={handleAddMovie} className='flex items-center gap-2'>
            <Plus className='w-4 h-4' />
            Thêm phim
          </Button>
        </div>
        {content?.items && (
          <MovieTable movies={content.items} onEdit={handleEdit} onDelete={handleDelete} onSchedule={handleSchedule} />
        )}
      </div>

      <div className='border-t p-6 mt-auto'>
        <PaginationWrapper
          goToPage={goToPage}
          currentPage={parseInt(queryConfig.soTrang as string) || 1}
          totalPages={calculateTotalPages()}
        />
      </div>
    </div>
  );
}
