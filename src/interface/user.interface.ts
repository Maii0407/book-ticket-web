export type User = {
  ID: string;
  createdAt: Date;
  password: string;
  updatedAt: string;
  username: string;
};

export type CreateUserParams = {
  username: string;
  password: string;
};

export type LoginUserParams = CreateUserParams;
