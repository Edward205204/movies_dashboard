import { ResponseAPI } from '@/@types/response';
import { MovieQueryParams, MoviesResponse } from '../@types/movies';
import http from '@/utils/http.axios';

const BASE_URL = {
  getMovies: '/QuanLyPhim/LayDanhSachPhimPhanTrang',
  addMovie: '/QuanLyPhim/ThemPhimUploadHinh',
  deleteMovie: '/QuanLyPhim/XoaPhim'
};
export class MovieApi {
  getMovies(params: MovieQueryParams) {
    return http.get<ResponseAPI<MoviesResponse>>(BASE_URL.getMovies, { params });
  }
  addMovie(formData: FormData) {
    formData.forEach((value, key) => {
      console.log(key, value);
    });
    return http.post(BASE_URL.addMovie, formData);
  }

  deleteMovie(id: string) {
    return http.delete(BASE_URL.deleteMovie, { data: { maPhim: id } });
  }
}

const movieApi = new MovieApi();
export default movieApi;
