import Axios, { AxiosError } from 'axios';

const instance = Axios.create({
  baseURL: 'http://localhost:3000',
});

instance.interceptors.request.use(
  function (config) {
    config.headers['Authorization'] = `Bearer someAuthtoken`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const axios = instance;
