import { useEffect, useState } from 'react';
import { MovieTable } from '@/components/customs/movie_table';
import { toast } from 'react-toastify';
import { MovieItem, MovieQueryParams } from '@/@types/movies';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useQueryConfig } from '@/hooks/query_config';
import movieApi from '@/APIs/movie.api';
import { createSearchParams, useNavigate } from 'react-router';
import path from '@/constants/path';
import PaginationWrapper from '@/components/customs/pagination_wrapper';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { MovieFormModal } from '@/components/customs/movie_form_modal';
import { MovieFormValues } from '@/utils/zod.schema';

export default function MoviePage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState<MovieFormValues | null>(null);

  const { data } = useQuery({
    queryKey: ['movies', queryConfig],
    queryFn: () => movieApi.getMovies(queryConfig as MovieQueryParams),
    placeholderData: (previousData) => previousData
  });
  const content = data?.data.content;

  const addMovieMutation = useMutation({
    mutationFn: (formData: FormData) => movieApi.addMovie(formData),
    onSuccess: (data) => {
      toast.success(data.data.message);
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to add movie');
    }
  });

  const deleteMovieMutation = useMutation({
    mutationFn: (movieId: number) => movieApi.deleteMovie(movieId.toString()),
    onSuccess: () => {
      toast.success('Movie deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: () => {
      toast.error('Failed to delete movie');
    }
  });

  const updateMovieMutation = useMutation({
    mutationFn: (formData: FormData) => movieApi.updateMovie(formData),
    onSuccess: () => {
      toast.success('Movie updated successfully');
      setEditOpen(false);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: () => {
      toast.error('Failed to update movie');
    }
  });

  const handleEdit = (movie: MovieItem) => {
    setEditInitialValues({
      maPhim: movie.maPhim,
      tenPhim: movie.tenPhim,
      trailer: movie.trailer,
      moTa: movie.moTa,
      ngayKhoiChieu: movie.ngayKhoiChieu.includes('/')
        ? movie.ngayKhoiChieu.split('/').reverse().join('-')
        : movie.ngayKhoiChieu.split('T')[0],
      sapChieu: movie.sapChieu,
      dangChieu: movie.dangChieu,
      hot: movie.hot,
      danhGia: movie.danhGia,
      hinhAnh: undefined
    });
    setEditOpen(true);
  };

  const handleDelete = (movieId: number) => {
    deleteMovieMutation.mutate(movieId);
  };

  const handleSchedule = (movieId: number) => {
    toast.info(`Schedule for movie ID: ${movieId}`);
  };

  const initialValues: MovieFormValues = {
    tenPhim: '',
    trailer: '',
    moTa: '',
    ngayKhoiChieu: '',
    sapChieu: true,
    dangChieu: true,
    hot: true,
    danhGia: 10,
    hinhAnh: undefined
  };

  const handleSubmit = (values: MovieFormValues) => {
    const formData = new FormData();
    let ngayKhoiChieuFormatted = values.ngayKhoiChieu;
    if (values.ngayKhoiChieu && values.ngayKhoiChieu.includes('-')) {
      const [year, month, day] = values.ngayKhoiChieu.split('-');
      const dayFormatted = day.padStart(2, '0');
      const monthFormatted = month.padStart(2, '0');
      ngayKhoiChieuFormatted = `${dayFormatted}/${monthFormatted}/${year}`;
    }
    formData.append('tenPhim', values.tenPhim);
    formData.append('trailer', values.trailer);
    formData.append('moTa', values.moTa);
    formData.append('ngayKhoiChieu', ngayKhoiChieuFormatted);
    formData.append('sapChieu', values.sapChieu ? 'true' : 'false');
    formData.append('dangChieu', values.dangChieu ? 'true' : 'false');
    formData.append('hot', values.hot ? 'true' : 'false');
    formData.append('danhGia', values.danhGia.toString());
    if (values.hinhAnh) {
      formData.append('File', values.hinhAnh);
    }
    formData.append('maNhom', 'GP01');
    addMovieMutation.mutate(formData);
  };

  const handleUpdateMovie = (values: MovieFormValues) => {
    const formData = new FormData();
    const getValue = (key: keyof MovieFormValues) => {
      if (values[key] !== undefined && values[key] !== '' && values[key] !== null) return values[key];
      if (editInitialValues) return editInitialValues[key];
      return '';
    };
    formData.append('tenPhim', getValue('tenPhim') as string);
    formData.append('trailer', getValue('trailer') as string);
    formData.append('moTa', getValue('moTa') as string);
    let ngayKhoiChieuFormatted = getValue('ngayKhoiChieu') as string;
    if (ngayKhoiChieuFormatted && ngayKhoiChieuFormatted.includes('-')) {
      const [year, month, day] = ngayKhoiChieuFormatted.split('-');
      const dayFormatted = day.padStart(2, '0');
      const monthFormatted = month.padStart(2, '0');
      ngayKhoiChieuFormatted = `${dayFormatted}/${monthFormatted}/${year}`;
    }
    formData.append('ngayKhoiChieu', ngayKhoiChieuFormatted);
    formData.append('sapChieu', getValue('sapChieu') ? 'true' : 'false');
    formData.append('dangChieu', getValue('dangChieu') ? 'true' : 'false');
    formData.append('hot', getValue('hot') ? 'true' : 'false');
    formData.append('danhGia', getValue('danhGia')?.toString() || '0');
    if (values.hinhAnh) {
      formData.append('File', values.hinhAnh);
    }
    if (values.maPhim) {
      formData.append('maPhim', values.maPhim.toString());
    }
    formData.append('maNhom', 'GP01');
    updateMovieMutation.mutate(formData);
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
          <Button className='flex items-center gap-2' onClick={() => setOpen(true)}>
            <Plus className='w-4 h-4' />
            Add Movie
          </Button>
          <MovieFormModal
            open={open}
            onClose={() => setOpen(false)}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            title='Add New Movie'
          />
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

      <MovieFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={editInitialValues || initialValues}
        onSubmit={handleUpdateMovie}
        title='Edit Movie'
      />
    </div>
  );
}
