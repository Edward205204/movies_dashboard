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

  useEffect(() => {
    if (
      queryConfig.soTrang &&
      content &&
      (parseInt(queryConfig.soTrang) > content.totalPages || parseInt(queryConfig.soTrang) < 1)
    ) {
      navigate({
        pathname: path.movies,
        search: createSearchParams({ ...queryConfig, soTrang: '1' }).toString()
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

  return (
    <div className='flex flex-col h-full'>
      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Movie Management</h1>
        {content?.items && (
          <MovieTable movies={content.items} onEdit={handleEdit} onDelete={handleDelete} onSchedule={handleSchedule} />
        )}
      </div>

      <div className='border-t p-6 mt-auto'>
        <PaginationWrapper
          goToPage={goToPage}
          currentPage={parseInt(queryConfig.soTrang as string) || 1}
          totalPages={content?.totalPages ? Number(content.totalPages) : 1}
        />
      </div>
    </div>
  );
}
