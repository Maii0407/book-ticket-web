import { AxiosInstance, AxiosResponse } from 'axios';

export class ConcertApi {
  private readonly axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  listAll(): Promise<AxiosResponse> {
    return this.axios.get('/concerts');
  }
}
