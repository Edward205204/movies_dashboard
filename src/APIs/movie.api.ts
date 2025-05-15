import { ResponseAPI } from '@/@types/response';
import { MovieQueryParams, MoviesResponse } from '../@types/movies';
import http from '@/utils/http.axios';

const BASE_URL = {
  getMovies: '/QuanLyPhim/LayDanhSachPhimPhanTrang',
  addMovie: '/QuanLyPhim/ThemPhimUploadHinh'
};
export class MovieApi {
  getMovies(params: MovieQueryParams) {
    return http.get<ResponseAPI<MoviesResponse>>(BASE_URL.getMovies, { params });
  }
  addMovie(formData: FormData) {
    return http.post<ResponseAPI<MoviesResponse>>(BASE_URL.addMovie, formData);
  }
}

const movieApi = new MovieApi();
export default movieApi;
