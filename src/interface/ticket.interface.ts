import { Concert } from './concert.interface';
import { User } from './user.interface';

export type Ticket = {
  ID: string;
  concertID: string;
  customerID: string;
  purchaseDate: Date;
  createAt: Date;
  updateAt: Date;
  concert: Concert;
  customer: User;
};

export type CreateTicketParams = {
  concertID: string;
};
