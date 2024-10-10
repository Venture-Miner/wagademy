import { AccountTypeEnum } from "./user";

export type CognitoUserAttributes = {
  email: string;
  sub: string;
  nickname: string;
  profile: AccountTypeEnum;
};
