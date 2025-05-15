import { ResponseAPI } from '@/@types/response';
import { UsersResponse } from '../@types/users';
import http from '@/utils/http.axios';

const BASE_URL = {
  getUsers: '/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang'
};

export class UserApi {
  getUsers(params: Record<string, string>) {
    return http.get<ResponseAPI<UsersResponse>>(BASE_URL.getUsers, { params });
  }
}

const userApi = new UserApi();
export default userApi;
