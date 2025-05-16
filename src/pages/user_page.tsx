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
import { useQueryClient } from '@tanstack/react-query';
import { UserFormValues } from '@/utils/zod.schema';
import { toast } from 'react-toastify';
import { UserFormModal } from '@/components/customs/user_form_modal';
import { User } from '@/@types/users';

export default function UserPage() {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editInitialValues, setEditInitialValues] = useState<UserFormValues | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const { data } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => userApi.getUsers(queryConfig),
    placeholderData: (previousData) => previousData
  });

  const useAddUserMutation = useMutation({
    mutationFn: (data: UserFormValues) => userApi.addUser(data),
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.content);
    }
  });

  const useEditUserMutation = useMutation({
    mutationFn: (data: UserFormValues) => userApi.updateUser(data),
    onSuccess: (data) => {
      toast.success(data.data.message);
      setEditOpen(false);
      setEditInitialValues(null);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.content);
    },
    onSettled: () => setEditLoading(false)
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

  const handleEdit = (user: User) => {
    setEditInitialValues({
      taiKhoan: user.taiKhoan,
      matKhau: user.matKhau,
      email: user.email,
      soDt: user.soDt,
      maNhom: 'GP01',
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      hoTen: user.hoTen
    });
    setEditOpen(true);
  };
  const useDeleteUserMutation = useMutation({
    mutationFn: (taiKhoan: string) => userApi.deleteUser(taiKhoan),
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error?.response?.data?.content);
    }
  });

  const handleDelete = (taiKhoan: string) => {
    useDeleteUserMutation.mutate(taiKhoan);
  };

  const handleEditSubmit = async (values: UserFormValues) => {
    setEditLoading(true);
    const dataToSend = { ...editInitialValues, ...values };
    await useEditUserMutation.mutateAsync(dataToSend as UserFormValues);
  };

  const handleAddUser = async (values: UserFormValues) => {
    await useAddUserMutation.mutateAsync(values);
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ['users'] });
  };

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
          <UserTable users={content?.items || []} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <PaginationWrapper
          currentPage={content?.currentPage || 1}
          totalPages={content?.totalPages || 1}
          goToPage={goToPage}
          className='mt-8'
        />
      </div>
      <UserFormModal
        open={open}
        onClose={() => setOpen(false)}
        initialValues={{
          taiKhoan: '',
          matKhau: '',
          email: '',
          soDt: '',
          maNhom: 'GP01',
          maLoaiNguoiDung: 'QuanTri',
          hoTen: ''
        }}
        onSubmit={handleAddUser}
        isEdit={false}
        loading={useAddUserMutation.isPending}
        title='Add User'
      />
      <UserFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={
          editInitialValues || {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            maNhom: 'GP01',
            maLoaiNguoiDung: 'QuanTri',
            hoTen: ''
          }
        }
        onSubmit={handleEditSubmit}
        isEdit={true}
        loading={editLoading}
        title='Edit User'
      />
    </div>
  );
}
