export const AccountTypeEnum = {
  COMPANY: 'COMPANY',
  PHYSICAL_PERSON: 'PHYSICAL_PERSON',
} as const;

export type AccountTypeEnum =
  (typeof AccountTypeEnum)[keyof typeof AccountTypeEnum];

export type User = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: { id: string } | null;
};

export type CreateUserResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: { id: string } | null;
};

export type FindOneUserResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: { id: string } | null;
};

export type UpdateUserResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: { id: string } | null;
};

export type RetrieveSelfResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: { id: string } | null;
};

export type CreateUser = {
  email: string;
  name: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
};

export type UpdateUser = {
  name?: string;
  walletAddress?: string;
};
