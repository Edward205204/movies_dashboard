import { AddMovieForm } from '@/components/add_movie_form';
import { AddMovieFormSchemaType } from '@/utils/zod.schema';

export default function AddFilmPage() {
  const handleAddMovie = (values: AddMovieFormSchemaType) => {
    // TODO: Gửi API thêm phim ở đây
    console.log('Giá trị form thêm phim:', values);
  };

  return (
    <div className='max-w-xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Thêm phim mới</h1>
      <AddMovieForm onFormSubmit={handleAddMovie} />
    </div>
  );
}
