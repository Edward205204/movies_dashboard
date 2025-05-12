import { ResponseAPI } from '@/@types/response';
import { MovieQueryParams, MoviesResponse } from '../@types/movies';
import http from '@/utils/http.axios';

const URL = '/QuanLyPhim/LayDanhSachPhimPhanTrang';
export class MovieApi {
  getMovies(params: MovieQueryParams) {
    return http.get<ResponseAPI<MoviesResponse>>(URL, { params });
  }
  addMovie(formData: FormData) {
    return http.post<ResponseAPI<MoviesResponse>>(URL, formData);
  }
}

const movieApi = new MovieApi();
export default movieApi;
