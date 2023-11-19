import { CreateTicketParams } from '@/interface/ticket.interface';
import { AxiosInstance, AxiosResponse } from 'axios';

export class TicketApi {
  private readonly axios: AxiosInstance;

  constructor(params: AxiosInstance) {
    this.axios = params;
  }

  create(params: CreateTicketParams): Promise<AxiosResponse> {
    const { concertID } = params;

    return this.axios.post('/tickets', {
      concertID,
    });
  }
}
