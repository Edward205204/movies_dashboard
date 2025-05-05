'use client';

import { useState } from 'react';
import { MovieTable } from '@/components/customs/movie_table';
import { toast } from 'react-toastify'; // or any other toast lib you use
import { MovieItem, MovieQueryParams } from '@/@types/movies';
import { useQuery } from '@tanstack/react-query';
import { useQueryConfig } from '@/hooks/query_config';
import movieApi from '@/APIs/movie.api';

export default function MoviePage() {
  const [movies, setMovies] = useState<MovieItem[]>([]);
  const queryConfig = useQueryConfig();

  const { data } = useQuery({
    queryKey: ['movies', queryConfig],
    queryFn: () => movieApi.getMovies(queryConfig as MovieQueryParams),
    placeholderData: (previousData) => previousData
  });

  const handleEdit = (movie: MovieItem) => {
    toast.info(`Edit movie: ${movie.tenPhim}`);
    // Navigate to edit page or open a modal here
  };

  const handleDelete = (movieId: number) => {
    toast.success(`Deleted movie with ID: ${movieId}`);
    // Call delete API and update state
    setMovies((prev) => prev.filter((m) => m.maPhim !== movieId));
  };

  const handleSchedule = (movieId: number) => {
    toast.info(`Schedule for movie ID: ${movieId}`);
    // Navigate to schedule page or open modal
  };
  const firmList = data?.data.content.items;
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-semibold mb-4'>Movie Management</h1>
      {firmList && (
        <MovieTable movies={firmList} onEdit={handleEdit} onDelete={handleDelete} onSchedule={handleSchedule} />
      )}
    </div>
  );
}
