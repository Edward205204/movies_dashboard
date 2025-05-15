import { z } from 'zod';
export const LoginFormSchema = z.object({
  taiKhoan: z.string({ message: 'Name is required' }),
  matKhau: z.string({ message: 'Password is required' })
});

export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;

// export const AddMovieFormSchema = z.object({
//   tenPhim: z.string().min(1, 'Tên phim không được để trống'),
//   trailer: z.string().min(1, 'Trailer không được để trống'),
//   moTa: z.string().min(1, 'Mô tả không được để trống'),
//   ngayKhoiChieu: z
//     .string()
//     .min(1, 'Ngày khởi chiếu không được để trống')
//     .refine((value) => dayjs(value, 'DD/MM/YYYY', true).isValid(), {
//       message: 'Ngày khởi chiếu không hợp lệ'
//     }),
//   sapChieu: z.boolean(),
//   danChieu: z.boolean(),
//   hot: z.boolean(),
//   danhGia: z.number().refine((val) => !isNaN(val) && val >= 0 && val <= 10, {
//     message: 'Đánh giá phải từ 0 đến 10'
//   }),
//   File: z.instanceof(File, { message: 'Hình ảnh không hợp lệ' }).optional()
// });

// export type AddMovieFormSchemaType = z.infer<typeof AddMovieFormSchema>;

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

export type MovieFormValues = z.infer<typeof movieSchema>;
