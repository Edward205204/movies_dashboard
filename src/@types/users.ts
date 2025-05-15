export interface User {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: null;
  maLoaiNguoiDung: string;
  hoTen: string;
}

export interface UsersResponse {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: User[];
}
