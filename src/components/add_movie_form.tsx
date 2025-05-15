import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { AddMovieFormSchema, AddMovieFormSchemaType } from '@/utils/zod.schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface AddMovieFormProps extends React.ComponentProps<'form'> {
  onFormSubmit: (values: AddMovieFormSchemaType) => void;
  initialValues?: AddMovieFormSchemaType;
}

export function AddMovieForm({ onFormSubmit, initialValues, className, ...props }: AddMovieFormProps) {
  const formik = useFormik<AddMovieFormSchemaType>({
    initialValues: initialValues || {
      tenPhim: '',
      trailer: '',
      moTa: '',
      ngayKhoiChieu: '',
      sapChieu: true,
      dangChieu: true,
      hot: true,
      danhGia: 10,
      hinhAnh: undefined
    },
    validationSchema: toFormikValidationSchema(AddMovieFormSchema),
    onSubmit: (values) => {
      onFormSubmit(values);
    }
  });

  return (
    <form className={cn('flex flex-col gap-6', className)} onSubmit={formik.handleSubmit} {...props}>
      <div className='grid gap-4'>
        <div>
          <Label htmlFor='tenPhim'>Tên phim</Label>
          <Input
            id='tenPhim'
            name='tenPhim'
            value={formik.values.tenPhim}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.tenPhim && formik.errors.tenPhim ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.tenPhim && formik.errors.tenPhim && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.tenPhim}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='trailer'>Trailer</Label>
          <Input
            id='trailer'
            name='trailer'
            value={formik.values.trailer}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.trailer && formik.errors.trailer ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.trailer && formik.errors.trailer && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.trailer}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='moTa'>Mô tả</Label>
          <Textarea
            id='moTa'
            name='moTa'
            value={formik.values.moTa}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.moTa && formik.errors.moTa ? 'border-destructive min-h-[100px]' : 'min-h-[100px]'}
          />
          <div className='h-5'>
            {formik.touched.moTa && formik.errors.moTa && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.moTa}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='ngayKhoiChieu'>Ngày khởi chiếu</Label>
          <Input
            id='ngayKhoiChieu'
            name='ngayKhoiChieu'
            type='date'
            value={formik.values.ngayKhoiChieu}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.ngayKhoiChieu}</p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label className='flex items-center justify-between'>
              Sắp chiếu
              <Switch
                checked={formik.values.sapChieu}
                onCheckedChange={(checked: boolean) => formik.setFieldValue('sapChieu', checked)}
              />
            </Label>
            <div className='h-5'>
              {formik.touched.sapChieu && formik.errors.sapChieu && (
                <p className='text-sm font-medium text-destructive'>{formik.errors.sapChieu}</p>
              )}
            </div>
          </div>
          <div>
            <Label className='flex items-center justify-between'>
              Đang chiếu
              <Switch
                checked={formik.values.dangChieu}
                onCheckedChange={(checked: boolean) => formik.setFieldValue('dangChieu', checked)}
              />
            </Label>
            <div className='h-5'>
              {formik.touched.dangChieu && formik.errors.dangChieu && (
                <p className='text-sm font-medium text-destructive'>{formik.errors.dangChieu}</p>
              )}
            </div>
          </div>
        </div>
        <div>
          <Label className='flex items-center justify-between'>
            Hot
            <Switch
              checked={formik.values.hot}
              onCheckedChange={(checked: boolean) => formik.setFieldValue('hot', checked)}
            />
          </Label>
          <div className='h-5'>
            {formik.touched.hot && formik.errors.hot && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.hot}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='danhGia'>Đánh giá</Label>
          <Input
            id='danhGia'
            name='danhGia'
            type='number'
            min={0}
            max={10}
            value={formik.values.danhGia}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={formik.touched.danhGia && formik.errors.danhGia ? 'border-destructive' : ''}
          />
          <div className='h-5'>
            {formik.touched.danhGia && formik.errors.danhGia && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.danhGia}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor='hinhAnh'>Hình ảnh</Label>
          <Input
            id='hinhAnh'
            name='hinhAnh'
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.currentTarget.files?.[0];
              formik.setFieldValue('hinhAnh', file);
            }}
          />
          <div className='h-5'>
            {formik.touched.hinhAnh && formik.errors.hinhAnh && (
              <p className='text-sm font-medium text-destructive'>{formik.errors.hinhAnh as string}</p>
            )}
          </div>
        </div>
        <Button type='submit' className='w-full'>
          Thêm phim
        </Button>
      </div>
    </form>
  );
}
