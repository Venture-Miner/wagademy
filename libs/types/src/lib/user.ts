export type User = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
};

export type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
};

export type FindOneUserResponse = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
};

export type UpdateUserResponse = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
};

export type RetrieveSelfResponse = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
};

export type CreateUser = {
  name: string;
  email: string;
  idRefAuth: string;
};

export type UpdateUser = {
  name?: string;
};
