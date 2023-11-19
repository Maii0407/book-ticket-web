/* eslint-disable react-hooks/rules-of-hooks */
import { api } from '@/api/index.api';
import { CreateTicketParams } from '@/interface/ticket.interface';
import { useMutation, useQuery } from '@tanstack/react-query';

export const tickets = {
  create: () => {
    return useMutation({
      mutationFn: (params: CreateTicketParams) => {
        return api.tickets.create(params);
      },
    });
  },

  listAll: () => {
    return useQuery({
      queryKey: ['tickets'],
      queryFn: () => {
        return api.tickets.listAll();
      },
      enabled: true,
    });
  },
};
