import { SetMetadata } from '@nestjs/common';
import { AccountTypeEnum } from '@wagademy/types';

export const ACCOUNT_TYPE_KEY = 'accountType';
export const AccountType = (...roles: AccountTypeEnum[]) =>
  SetMetadata(ACCOUNT_TYPE_KEY, roles);
