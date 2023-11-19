import { axios } from './axios';
import { ConcertApi } from './concerts.api';
import { UserApi } from './users.api';

export const api = {
  concerts: new ConcertApi(axios),
  users: new UserApi(axios),
};
