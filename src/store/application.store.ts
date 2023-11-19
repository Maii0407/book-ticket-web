import { User } from '@/interface/user.interface';
import { create } from 'zustand';

type ApplicationStore = {
  user: User;
  setUser: (params: User) => void;
  token: string;
  setToken: (params: string) => void;
};

export const applicationStore = create<ApplicationStore>((set) => ({
  user: {} as User,
  setUser: (params: User) => {
    return set({
      user: params,
    });
  },
  token: '',
  setToken: (params: string) => {
    return set({
      token: params,
    });
  },
}));
