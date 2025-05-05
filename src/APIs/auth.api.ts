import http from '@/utils/http.axios';
import { LoginFormSchemaType } from '@/utils/zod.schema';

const BASE_URL = {
  login: '/QuanLyNguoiDung/DangNhap'
};
class AuthApi {
  LoginRequest = (body: LoginFormSchemaType) => {
    return http.post(BASE_URL.login, body);
  };
}

const authApi = new AuthApi();
export default authApi;
