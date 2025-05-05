export interface MovieItem {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}

export interface MoviesResponse {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items: MovieItem[];
}

export interface MovieQueryParams {
  maNhom: string;
  tenPhim?: string;
  soTrang: string;
  soPhanTuTrenTrang: string;
  // tuNgay?: string;
  // denNgay?: string;
}
