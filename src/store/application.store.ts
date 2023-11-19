import { User } from '@/interface/user.interface';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ApplicationStore = {
  user: User;
  setUser: (params: User) => void;
  token: string;
  setToken: (params: string) => void;
};

export const applicationStore = create<ApplicationStore>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: 'application',
    }
  )
);
