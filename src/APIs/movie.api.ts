import { ResponseAPI } from '@/@types/response';
import { MovieItem, MovieQueryParams, MoviesResponse } from '../@types/movies';
import http from '@/utils/http.axios';

const BASE_URL = {
  getMovies: '/QuanLyPhim/LayDanhSachPhimPhanTrang',
  addMovie: '/QuanLyPhim/ThemPhimUploadHinh',
  deleteMovie: '/QuanLyPhim/XoaPhim',
  getMovieDetail: '/QuanLyPhim/LayThongTinPhim',
  updateMovie: '/QuanLyPhim/CapNhatPhimUpload'
};
export class MovieApi {
  getMovies(params: MovieQueryParams) {
    return http.get<ResponseAPI<MoviesResponse>>(BASE_URL.getMovies, { params });
  }
  addMovie(formData: FormData) {
    return http.post(BASE_URL.addMovie, formData);
  }

  deleteMovie(id: string) {
    return http.delete(BASE_URL.deleteMovie, {
      params: { MaPhim: id }
    });
  }

  getMovieDetail(id: string) {
    return http.get<ResponseAPI<MovieItem>>(BASE_URL.getMovieDetail, {
      params: { MaPhim: id }
    });
  }

  updateMovie(formData: FormData) {
    return http.post(BASE_URL.updateMovie, formData);
  }
}

const movieApi = new MovieApi();
export default movieApi;
