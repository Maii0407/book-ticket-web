import { axios } from './axios';
import { ConcertApi } from './concerts.api';

export const api = {
  concerts: new ConcertApi(axios),
};
