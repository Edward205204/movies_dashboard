import { useMutation, useQuery } from '@tanstack/react-query';
import { useQueryConfig } from '@/hooks/query_config';
import userApi from '@/APIs/user.api';
import { UserTable } from '@/components/customs/user_table';
import PaginationWrapper from '@/components/customs/pagination_wrapper';
import { createSearchParams, useNavigate } from 'react-router';
import path from '@/constants/path';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useFormik } from 'formik';
import { useQueryClient } from '@tanstack/react-query';
import { UserFormValues } from '@/utils/zod.schema';
import { toast } from 'react-toastify';

export default function UserPage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getUsers(queryConfig),
    placeholderData: (previousData) => previousData
  });

  const useAddUserMutation = useMutation({
    mutationFn: (data: UserFormValues) => userApi.addUser(data),
    onSuccess: (data) => {
      console.log(data.data.message);
      toast.success(data.data.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.content);
    }
  });

  const content = data?.data.content;

  const goToPage = (page: number) => {
    navigate({
      pathname: path.users,
      search: createSearchParams({
        ...queryConfig,
        soTrang: page.toString()
      }).toString()
    });
  };

  const formik = useFormik<UserFormValues>({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: 'GP01',
      maLoaiNguoiDung: 'QuanTri',
      hoTen: ''
    },
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        await useAddUserMutation.mutateAsync(values);
        setOpen(false);
        resetForm();
        queryClient.invalidateQueries({ queryKey: ['users'] });
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div className='flex flex-col h-full'>
      <div className='p-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-2xl font-semibold'>User Management</h1>
          <Button className='flex gap-2' variant='default' onClick={() => setOpen(true)}>
            <Plus className='w-4 h-4' />
            Add User
          </Button>
        </div>
        <div className='bg-background rounded-lg shadow p-4'>
          <UserTable users={content?.items || []} />
        </div>
        <PaginationWrapper
          currentPage={content?.currentPage || 1}
          totalPages={content?.totalPages || 1}
          goToPage={goToPage}
          className='mt-8'
        />
      </div>
      {/* Modal thêm user */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-[500px]'>
          <DialogHeader>
            <DialogTitle>Thêm User</DialogTitle>
          </DialogHeader>
          <form className='space-y-4' onSubmit={formik.handleSubmit}>
            <div className='space-y-1'>
              <label htmlFor='taiKhoan' className='block text-sm font-medium'>
                Account
              </label>
              <Input id='taiKhoan' name='taiKhoan' value={formik.values.taiKhoan} onChange={formik.handleChange} />
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
            <Button type='submit' className='w-full'>
              Add
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
