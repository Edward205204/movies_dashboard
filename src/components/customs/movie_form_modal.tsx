import { useFormik } from 'formik';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { MovieFormValues, movieSchema } from '@/utils/zod.schema';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { ChangeEvent } from 'react';

interface MovieFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: MovieFormValues;
  onSubmit: (values: MovieFormValues) => void;
  title?: string;
}

export function MovieFormModal({ open, onClose, initialValues, onSubmit, title }: MovieFormModalProps) {
  const formik = useFormik<MovieFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(movieSchema),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>{title || 'Add / Edit Movie'}</DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div className='space-y-1'>
            <label htmlFor='tenPhim' className='block text-sm font-medium'>
              Movie Name
            </label>
            <Input
              id='tenPhim'
              name='tenPhim'
              value={formik.values.tenPhim}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.tenPhim && formik.errors.tenPhim && (
              <div className='text-red-500 text-xs'>{formik.errors.tenPhim}</div>
            )}
          </div>
          <div className='space-y-1'>
            <label htmlFor='trailer' className='block text-sm font-medium'>
              Trailer
            </label>
            <Input
              id='trailer'
              name='trailer'
              value={formik.values.trailer}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.trailer && formik.errors.trailer && (
              <div className='text-red-500 text-xs'>{formik.errors.trailer}</div>
            )}
          </div>
          <div className='space-y-1'>
            <label htmlFor='moTa' className='block text-sm font-medium'>
              Description
            </label>
            <Textarea
              id='moTa'
              name='moTa'
              value={formik.values.moTa}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='min-h-[100px]'
            />
            {formik.touched.moTa && formik.errors.moTa && (
              <div className='text-red-500 text-xs'>{formik.errors.moTa}</div>
            )}
          </div>
          <div className='space-y-1'>
            <label htmlFor='ngayKhoiChieu' className='block text-sm font-medium'>
              Release Date
            </label>
            <Input
              id='ngayKhoiChieu'
              name='ngayKhoiChieu'
              type='date'
              value={formik.values.ngayKhoiChieu}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.ngayKhoiChieu && formik.errors.ngayKhoiChieu && (
              <div className='text-red-500 text-xs'>{formik.errors.ngayKhoiChieu}</div>
            )}
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <label className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Coming Soon</span>
                <Switch
                  checked={formik.values.sapChieu}
                  onCheckedChange={(val) => formik.setFieldValue('sapChieu', val)}
                />
              </label>
              {formik.touched.sapChieu && formik.errors.sapChieu && (
                <div className='text-red-500 text-xs'>{formik.errors.sapChieu}</div>
              )}
            </div>
            <div className='space-y-1'>
              <label className='flex items-center justify-between'>
                <span className='text-sm font-medium'>Now Showing</span>
                <Switch
                  checked={formik.values.dangChieu}
                  onCheckedChange={(val) => formik.setFieldValue('dangChieu', val)}
                />
              </label>
              {formik.touched.dangChieu && formik.errors.dangChieu && (
                <div className='text-red-500 text-xs'>{formik.errors.dangChieu}</div>
              )}
            </div>
          </div>
          <div className='space-y-1'>
            <label className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Hot</span>
              <Switch checked={formik.values.hot} onCheckedChange={(val) => formik.setFieldValue('hot', val)} />
            </label>
            {formik.touched.hot && formik.errors.hot && <div className='text-red-500 text-xs'>{formik.errors.hot}</div>}
          </div>
          <div className='space-y-1'>
            <label htmlFor='danhGia' className='block text-sm font-medium'>
              Rating
            </label>
            <Input
              id='danhGia'
              name='danhGia'
              type='number'
              min={0}
              max={10}
              value={formik.values.danhGia}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.danhGia && formik.errors.danhGia && (
              <div className='text-red-500 text-xs'>{formik.errors.danhGia}</div>
            )}
          </div>
          <div className='space-y-1'>
            <label htmlFor='hinhAnh' className='block text-sm font-medium'>
              Poster
            </label>
            <Input
              id='hinhAnh'
              name='hinhAnh'
              type='file'
              accept='image/*'
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];
                if (file) formik.setFieldValue('hinhAnh', file);
              }}
            />
            {formik.touched.hinhAnh && formik.errors.hinhAnh && (
              <div className='text-red-500 text-xs'>{formik.errors.hinhAnh}</div>
            )}
          </div>
          <Button type='submit' className='w-full'>
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
