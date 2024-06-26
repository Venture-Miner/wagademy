import { UserProfile } from './user-profile';

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
  subscriptionId: string | null;
  hasChangedPlan: boolean;
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
  subscriptionId: string | null;
  hasChangedPlan: boolean;
};

export type FindOneUserResponse = {
  id: string;
  walletAddress: string | null;
  name: string;
  email: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
  companyProfile: { id: string } | null;
  userProfile: UserProfile | null;
  subscriptionId: string | null;
  hasChangedPlan: boolean;
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
  subscriptionId: string | null;
  hasChangedPlan: boolean;
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
  subscriptionId: string | null;
  hasChangedPlan: boolean;
};

export type CreateUser = {
  email: string;
  name: string;
  idRefAuth: string;
  accountType: AccountTypeEnum;
};

export type CreateUserFrontendDto = {
  name: string;
  accountType: AccountTypeEnum;
};

export type UpdateUser = {
  name?: string;
  walletAddress?: string;
};

export type ImageType = 'backgroundPhoto' | 'companyPhoto';

export type UserProfileOnHandlingImage =
  | {
      [K in ImageType]?: {
        key: string;
      };
    }
  | null;
