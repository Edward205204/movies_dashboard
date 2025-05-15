import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { UserFormValues, userSchema } from '@/utils/zod.schema';

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  initialValues: UserFormValues;
  onSubmit: (values: UserFormValues) => void;
  isEdit?: boolean;
  loading?: boolean;
  title?: string;
}

export function UserFormModal({
  open,
  onClose,
  initialValues,
  onSubmit,
  isEdit = false,
  loading = false,
  title
}: UserFormModalProps) {
  const formik = useFormik<UserFormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: toFormikValidationSchema(userSchema),
    onSubmit: (values) => {
      onSubmit(values);
    }
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>{title || (isEdit ? 'Edit User' : 'Add User')}</DialogTitle>
        </DialogHeader>
        <form className='space-y-4' onSubmit={formik.handleSubmit}>
          <div className='space-y-1'>
            <label htmlFor='taiKhoan' className='block text-sm font-medium'>
              Account
            </label>
            <Input
              id='taiKhoan'
              name='taiKhoan'
              value={formik.values.taiKhoan}
              onChange={formik.handleChange}
              disabled={isEdit}
            />
          </div>
          <div className='space-y-1'>
            <label htmlFor='matKhau' className='block text-sm font-medium'>
              Password
            </label>
            <Input
              id='matKhau'
              name='matKhau'
              type='password'
              value={formik.values.matKhau}
              onChange={formik.handleChange}
            />
          </div>
          <div className='space-y-1'>
            <label htmlFor='email' className='block text-sm font-medium'>
              Email
            </label>
            <Input id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
          </div>
          <div className='space-y-1'>
            <label htmlFor='soDt' className='block text-sm font-medium'>
              Phone Number
            </label>
            <Input id='soDt' name='soDt' value={formik.values.soDt} onChange={formik.handleChange} />
          </div>
          <div className='space-y-1'>
            <label htmlFor='hoTen' className='block text-sm font-medium'>
              Full Name
            </label>
            <Input id='hoTen' name='hoTen' value={formik.values.hoTen} onChange={formik.handleChange} />
          </div>
          <div className='space-y-1'>
            <label htmlFor='maLoaiNguoiDung' className='block text-sm font-medium'>
              User Type
            </label>
            <select
              id='maLoaiNguoiDung'
              name='maLoaiNguoiDung'
              value={formik.values.maLoaiNguoiDung}
              onChange={formik.handleChange}
              className='w-full border rounded px-2 py-1'
            >
              <option value='QuanTri'>Admin</option>
              <option value='KhachHang'>User</option>
            </select>
          </div>
          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (isEdit ? 'Saving...' : 'Adding...') : isEdit ? 'Save' : 'Add'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
