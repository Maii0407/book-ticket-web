/* eslint-disable react-hooks/rules-of-hooks */
import { api } from '@/api/index.api';
import { useQuery } from '@tanstack/react-query';

export const concerts = {
  listAll: () => {
    return useQuery({
      queryKey: ['concerts'],
      queryFn: () => {
        return api.concerts.listAll();
      },
      enabled: true,
    });
  },
};
