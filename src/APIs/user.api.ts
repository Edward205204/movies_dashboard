import { ResponseAPI } from '@/@types/response';
import { UsersResponse, User } from '../@types/users';
import http from '@/utils/http.axios';

const BASE_URL = {
  getUsers: '/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang',
  addUser: '/QuanLyNguoiDung/ThemNguoiDung',
  updateUser: '/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
  deleteUser: '/QuanLyNguoiDung/XoaNguoiDung'
};

export class UserApi {
  getUsers(params: Record<string, string>) {
    return http.get<ResponseAPI<UsersResponse>>(BASE_URL.getUsers, { params });
  }
  addUser(data: Omit<User, 'maNhom'> & { maNhom: string }) {
    return http.post(BASE_URL.addUser, data);
  }
  updateUser(data: Omit<User, 'maNhom'> & { maNhom: string }) {
    return http.post(BASE_URL.updateUser, data);
  }
  deleteUser(id: string) {
    return http.delete(BASE_URL.deleteUser, {
      params: { TaiKhoan: id }
    });
  }
}

const userApi = new UserApi();
export default userApi;
