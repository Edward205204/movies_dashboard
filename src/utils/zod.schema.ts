import { z } from 'zod';
export const LoginFormSchema = z.object({
  taiKhoan: z.string({ message: 'Name is required' }),
  matKhau: z.string({ message: 'Password is required' })
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const movieSchema = z.object({
  tenPhim: z.string().min(1, 'Tên phim không được để trống'),
  trailer: z.string().min(1, 'Trailer không được để trống'),
  moTa: z.string().min(1, 'Mô tả không được để trống'),
  ngayKhoiChieu: z.string().min(1, 'Ngày khởi chiếu không được để trống'),
  sapChieu: z.boolean(),
  dangChieu: z.boolean(),
  hot: z.boolean(),
  danhGia: z.number().min(0).max(10),
  hinhAnh: z.instanceof(File).optional(),
  maPhim: z.number().optional()
});

export const userSchema = z.object({
  taiKhoan: z.string().min(1, 'Tài khoản không được để trống'),
  matKhau: z.string().min(1, 'Mật khẩu không được để trống'),
  email: z.string().email('Email không hợp lệ'),
  soDt: z.string().min(1, 'Số điện thoại không được để trống'),
  hoTen: z.string().min(1, 'Họ tên không được để trống'),
  maLoaiNguoiDung: z
    .string()
    .min(1, 'Loại người dùng không được để trống')
    .refine((val) => ['QuanTri', 'KhachHang'].includes(val), {
      message: 'Loại người dùng không hợp lệ'
    }),
  maNhom: z.string().min(1, 'Mã nhóm không được để trống')
});

export type UserFormValues = z.infer<typeof userSchema>;

export type MovieFormValues = z.infer<typeof movieSchema>;
