/* eslint-disable react-hooks/rules-of-hooks */
import { api } from '@/api/index.api';
import { CreateUserParams, LoginUserParams } from '@/interface/user.interface';
import { useMutation } from '@tanstack/react-query';

export const users = {
  create: () => {
    return useMutation({
      mutationFn: (params: CreateUserParams) => {
        return api.users.create(params);
      },
    });
  },

  login: () => {
    return useMutation({
      mutationFn: (params: LoginUserParams) => {
        return api.users.login(params);
      },
    });
  },
};
