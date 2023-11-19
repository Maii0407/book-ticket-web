import Axios, { AxiosError } from 'axios';
import { authStorage } from '@/utils/auth.util';

const instance = Axios.create({
  baseURL: 'http://localhost:3000',
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

export const axios = instance;
