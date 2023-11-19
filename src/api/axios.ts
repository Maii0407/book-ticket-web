import Axios, { AxiosError } from 'axios';
import { authStorage } from '@/utils/auth.util';

const instance = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BOOK_TICKET_API_URL,
});

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer ${authStorage.token.get()}`;
    return config;
  },
  function (error: AxiosError<any>) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<any>) {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const axios = instance;
