export interface User {
  taiKhoan: string;
  matKhau: string;
  email: string;
  soDt: string;
  maNhom: string;
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
