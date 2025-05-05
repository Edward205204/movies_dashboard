import { AuthResponse } from '@/@types/auth';
import { ResponseAPI } from '@/@types/response';
import http from '@/utils/http.axios';
import { LoginFormSchemaType } from '@/utils/zod.schema';

const BASE_URL = {
  login: '/QuanLyNguoiDung/DangNhap'
};

const loginRequest = (body: LoginFormSchemaType) => {
  return http.post<ResponseAPI<AuthResponse>>(BASE_URL.login, body);
};

export default loginRequest;
