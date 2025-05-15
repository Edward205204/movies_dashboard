import { z } from 'zod';

export const LoginFormSchema = z.object({
  taiKhoan: z.string({ message: 'Name is required' }),
  matKhau: z.string({ message: 'Password is required' })
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

export const AddMovieFormSchema = z.object({
  tenPhim: z.string().min(1, 'Tên phim không được để trống'),
  trailer: z.string().min(1, 'Trailer không được để trống'),
  moTa: z.string().min(1, 'Mô tả không được để trống'),
  ngayKhoiChieu: z.string().min(1, 'Ngày khởi chiếu không được để trống'),
  sapChieu: z.boolean(),
  dangChieu: z.boolean(),
  hot: z.boolean(),
  danhGia: z.number().min(0).max(10),
  hinhAnh: z.instanceof(File).optional()
});

export type AddMovieFormSchemaType = z.infer<typeof AddMovieFormSchema>;
