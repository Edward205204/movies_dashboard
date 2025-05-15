import axios, { AxiosError, AxiosInstance } from 'axios';
import HttpStatusCode from '@/constants/http_status.enum';
import { getAccessTokenFromLS, removeAccessTokenAndProfile } from '@/utils/auth';
import { config } from '@/constants/config';

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    });

    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${this.accessToken}`;
        return config;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          if (error.response?.status === HttpStatusCode.Unauthorized) {
            removeAccessTokenAndProfile();
          }
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
