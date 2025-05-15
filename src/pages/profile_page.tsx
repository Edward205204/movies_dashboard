import userApi from '@/APIs/user.api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { UserFormModal } from '@/components/customs/user_form_modal';
import { UserFormValues } from '@/utils/zod.schema';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const { data, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: () => userApi.getUser()
  });
  const user = data?.data.content;
  const [editOpen, setEditOpen] = useState(false);
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: (values: UserFormValues) => userApi.updateUserByAdmin(values),
    onSuccess: (data) => {
      toast.success(data.data.message || 'Cập nhật thành công');
      setEditOpen(false);
      refetch();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.content || 'Cập nhật thất bại');
    }
  });

  if (!user) return <div className='text-center py-10 text-lg'>Đang tải thông tin...</div>;

  return (
    <div className='w-full px-0 md:px-8 py-8'>
      <div className='flex justify-between items-center mb-6 w-full'>
        <h2 className='text-3xl font-bold'>Thông tin cá nhân</h2>
        <Button variant='outline' onClick={() => setEditOpen(true)}>
          Edit
        </Button>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-lg border border-gray-200 bg-white'>
          <tbody>
            <tr className='border-b'>
              <td className='font-semibold px-6 py-4 w-1/4 bg-gray-50'>Tài khoản</td>
              <td className='px-6 py-4'>{user.taiKhoan}</td>
            </tr>
            <tr className='border-b'>
              <td className='font-semibold px-6 py-4 bg-gray-50'>Họ tên</td>
              <td className='px-6 py-4'>{user.hoTen}</td>
            </tr>
            <tr className='border-b'>
              <td className='font-semibold px-6 py-4 bg-gray-50'>Email</td>
              <td className='px-6 py-4'>{user.email}</td>
            </tr>
            <tr className='border-b'>
              <td className='font-semibold px-6 py-4 bg-gray-50'>Số điện thoại</td>
              <td className='px-6 py-4'>{user.soDt}</td>
            </tr>
            <tr>
              <td className='font-semibold px-6 py-4 bg-gray-50'>Loại người dùng</td>
              <td className='px-6 py-4'>{user.maLoaiNguoiDung === 'QuanTri' ? 'Admin' : 'User'}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <UserFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={{
          taiKhoan: user.taiKhoan,
          matKhau: user.matKhau,
          email: user.email,
          soDt: user.soDt,
          maNhom: user.maNhom || 'GP01',
          maLoaiNguoiDung: user.maLoaiNguoiDung,
          hoTen: user.hoTen
        }}
        onSubmit={editMutation.mutateAsync}
        isEdit={true}
        loading={editMutation.isPending}
        title='Edit Profile'
      />
    </div>
  );
}
