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
import * as z from 'zod';
import { useState } from 'react';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const movieSchema = z.object({
  tenPhim: z.string().min(1, 'Tên phim không được để trống'),
  trailer: z.string().min(1, 'Trailer không được để trống'),
  moTa: z.string().min(1, 'Mô tả không được để trống'),
  ngayKhoiChieu: z.string().min(1, 'Ngày khởi chiếu không được để trống'),
  sapChieu: z.boolean(),
  dangChieu: z.boolean(),
  hot: z.boolean(),
  danhGia: z.number().min(0).max(10),
  hinhAnh: z.instanceof(File).optional()
});

type MovieFormValues = z.infer<typeof movieSchema>;

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
    onSuccess: () => {
      toast.success('Thêm phim thành công');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['movies'] });
    },
    onError: () => {
      toast.error('Thêm phim thất bại');
    }
  });

  const handleEdit = (movie: MovieItem) => {
    toast.info(`Edit movie: ${movie.tenPhim}`);
  };

  const handleDelete = (movieId: number) => {
    toast.success(`Deleted movie with ID: ${movieId}`);
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
    danhGia: 10
  };

  const handleSubmit = (values: MovieFormValues) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });
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
                Thêm phim
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Thêm phim mới</DialogTitle>
              </DialogHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={toFormikValidationSchema(movieSchema)}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue }) => (
                  <Form className='space-y-4'>
                    <div>
                      <label htmlFor='tenPhim' className='block text-sm font-medium mb-1'>
                        Tên phim
                      </label>
                      <Field as={Input} id='tenPhim' name='tenPhim' />
                      <ErrorMessage name='tenPhim' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <div>
                      <label htmlFor='trailer' className='block text-sm font-medium mb-1'>
                        Trailer
                      </label>
                      <Field as={Input} id='trailer' name='trailer' />
                      <ErrorMessage name='trailer' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <div>
                      <label htmlFor='moTa' className='block text-sm font-medium mb-1'>
                        Mô tả
                      </label>
                      <Field as={Textarea} id='moTa' name='moTa' />
                      <ErrorMessage name='moTa' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <div>
                      <label htmlFor='ngayKhoiChieu' className='block text-sm font-medium mb-1'>
                        Ngày khởi chiếu
                      </label>
                      <Field as={Input} type='date' id='ngayKhoiChieu' name='ngayKhoiChieu' />
                      <ErrorMessage name='ngayKhoiChieu' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='flex items-center justify-between'>
                          <span className='text-sm font-medium'>Sắp chiếu</span>
                          <Field name='sapChieu'>
                            {({ field }: FieldProps<boolean>) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => setFieldValue('sapChieu', checked)}
                              />
                            )}
                          </Field>
                        </label>
                      </div>

                      <div>
                        <label className='flex items-center justify-between'>
                          <span className='text-sm font-medium'>Đang chiếu</span>
                          <Field name='dangChieu'>
                            {({ field }: FieldProps<boolean>) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={(checked: boolean) => setFieldValue('dangChieu', checked)}
                              />
                            )}
                          </Field>
                        </label>
                      </div>
                    </div>

                    <div>
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
                    </div>

                    <div>
                      <label htmlFor='danhGia' className='block text-sm font-medium mb-1'>
                        Đánh giá
                      </label>
                      <Field as={Input} type='number' min={0} max={10} id='danhGia' name='danhGia' />
                      <ErrorMessage name='danhGia' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <div>
                      <label htmlFor='hinhAnh' className='block text-sm font-medium mb-1'>
                        Hình ảnh
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
                      <ErrorMessage name='hinhAnh' component='div' className='text-red-500 text-sm mt-1' />
                    </div>

                    <Button type='submit' className='w-full'>
                      Thêm phim
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
