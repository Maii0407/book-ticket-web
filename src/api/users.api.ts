import { CreateUserParams, LoginUserParams } from '@/interface/user.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export class UserApi {
  private readonly axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  create(params: CreateUserParams): Promise<AxiosResponse> {
    const { username, password } = params;

    return this.axios.post('/users', {
      username,
      password,
    });
  }

  login(params: LoginUserParams): Promise<AxiosResponse> {
    const { username, password } = params;

    return this.axios.post('/auth/login', {
      username,
      password,
    });
  }
}
