import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/@types/users';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface Props {
  users: User[];
  onEdit?: (user: User) => void;
  onDelete?: (taiKhoan: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className='grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_1fr] items-center gap-4'>
          <TableHead>Account</TableHead>
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>User Type</TableHead>
          <TableHead>Mật khẩu</TableHead>
          <TableHead className='text-center'>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow
            key={user.taiKhoan}
            className='grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_2fr_1fr] items-center gap-4'
          >
            <TableCell>{user.taiKhoan}</TableCell>
            <TableCell>{user.hoTen}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.soDt || '-'}</TableCell>
            <TableCell>{user.maLoaiNguoiDung}</TableCell>
            <TableCell>{user.matKhau}</TableCell>
            <TableCell>
              <div className='flex justify-center gap-2'>
                <Button variant='outline' size='icon' className='h-8 w-8' onClick={() => onEdit && onEdit(user)}>
                  <Pencil className='h-4 w-4' />
                </Button>
                <Button
                  variant='destructive'
                  size='icon'
                  className='h-8 w-8'
                  onClick={() => onDelete && onDelete(user.taiKhoan)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
