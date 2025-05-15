import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User } from '@/@types/users';

interface Props {
  users: User[];
}

export function UserTable({ users }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className='grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_2fr] items-center gap-4'>
          <TableHead>Tài khoản</TableHead>
          <TableHead>Họ tên</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Số ĐT</TableHead>
          <TableHead>Loại</TableHead>
          <TableHead>Mật khẩu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.taiKhoan} className='grid grid-cols-[1.5fr_2fr_2fr_1.5fr_1.5fr_2fr] items-center gap-4'>
            <TableCell>{user.taiKhoan}</TableCell>
            <TableCell>{user.hoTen}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.soDt || '-'}</TableCell>
            <TableCell>{user.maLoaiNguoiDung}</TableCell>
            <TableCell>{user.matKhau}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
