import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ACCOUNT_TYPE_KEY } from '../../../shared/decorators/account-type.decorator';
import { AccountTypeEnum } from '@wagademy/types';

@Injectable()
export class AccountTypeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredAccountType = this.reflector.getAllAndOverride<
      AccountTypeEnum[]
    >(ACCOUNT_TYPE_KEY, [context.getHandler(), context.getClass()]);
    if (!requiredAccountType) {
      return true;
    }
    const {
      user: { dbUser },
    } = context.switchToHttp().getRequest();
    const hasAccess = requiredAccountType.some((accountType) =>
      dbUser.accountType?.includes(accountType)
    );
    if (!hasAccess) {
      throw new ForbiddenException(
        'Your account type is not allowed to access this'
      );
    }
    return true;
  }
}
