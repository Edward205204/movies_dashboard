import { useEffect } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { movieSchema, MovieFormValues } from '@/utils/zod.schema';

export default function MoviePage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

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

  const handleEdit = (movie: MovieItem) => {
    toast.info(`Edit movie: ${movie.tenPhim}`);
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
    // Format ngày chiếu nếu có
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className='flex items-center gap-2'>
                <Plus className='w-4 h-4' />
                Add Movie
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[600px]'>
              <DialogHeader>
                <DialogTitle>Add New Movie</DialogTitle>
              </DialogHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(movieSchema)}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className='space-y-4'>
                    <div className='space-y-1'>
                      <label htmlFor='tenPhim' className='block text-sm font-medium'>
                        Movie Name
                      </label>
                      <Field as={Input} id='tenPhim' name='tenPhim' />
                      <div className='h-4'>
                        <ErrorMessage name='tenPhim' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label htmlFor='trailer' className='block text-sm font-medium'>
                        Trailer
                      </label>
                      <Field as={Input} id='trailer' name='trailer' />
                      <div className='h-4'>
                        <ErrorMessage name='trailer' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label htmlFor='moTa' className='block text-sm font-medium'>
                        Description
                      </label>
                      <Field as={Textarea} id='moTa' name='moTa' className='min-h-[100px]' />
                      <div className='h-4'>
                        <ErrorMessage name='moTa' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label htmlFor='ngayKhoiChieu' className='block text-sm font-medium'>
                        Release Date
                      </label>
                      <Field as={Input} type='date' id='ngayKhoiChieu' name='ngayKhoiChieu' />
                      <div className='h-4'>
                        <ErrorMessage name='ngayKhoiChieu' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div className='space-y-1'>
                        <label className='flex items-center justify-between'>
                          <span className='text-sm font-medium'>Coming Soon</span>
                          <Field name='sapChieu'>
                            {({ field }: FieldProps<boolean>) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => setFieldValue('sapChieu', checked)}
                              />
                            )}
                          </Field>
                        </label>
                        <div className='h-4'>
                          <ErrorMessage name='sapChieu' component='div' className='text-red-500 text-xs' />
                        </div>
                      </div>

                      <div className='space-y-1'>
                        <label className='flex items-center justify-between'>
                          <span className='text-sm font-medium'>Now Showing</span>
                          <Field name='dangChieu'>
                            {({ field }: FieldProps<boolean>) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => setFieldValue('dangChieu', checked)}
                              />
                            )}
                          </Field>
                        </label>
                        <div className='h-4'>
                          <ErrorMessage name='dangChieu' component='div' className='text-red-500 text-xs' />
                        </div>
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label className='flex items-center justify-between'>
                        <span className='text-sm font-medium'>Hot</span>
                        <Field name='hot'>
                          {({ field }: FieldProps<boolean>) => (
                            <Switch
                              checked={field.value}
                              onCheckedChange={(checked: boolean) => setFieldValue('hot', checked)}
                            />
                          )}
                        </Field>
                      </label>
                      <div className='h-4'>
                        <ErrorMessage name='hot' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label htmlFor='danhGia' className='block text-sm font-medium'>
                        Rating
                      </label>
                      <Field as={Input} type='number' min={0} max={10} id='danhGia' name='danhGia' />
                      <div className='h-4'>
                        <ErrorMessage name='danhGia' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <div className='space-y-1'>
                      <label htmlFor='hinhAnh' className='block text-sm font-medium'>
                        Poster
                      </label>
                      <Input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setFieldValue('hinhAnh', file);
                          }
                        }}
                      />
                      <div className='h-4'>
                        <ErrorMessage name='hinhAnh' component='div' className='text-red-500 text-xs' />
                      </div>
                    </div>

                    <Button type='submit' className='w-full'>
                      Add Movie
                    </Button>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </Dialog>
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
