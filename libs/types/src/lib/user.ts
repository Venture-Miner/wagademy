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
};

export type FindOneUserResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
};
