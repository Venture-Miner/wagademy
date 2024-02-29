import { User } from '@wagademy/types';
import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const DBUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User | null => {
    const {
      user: { dbUser },
    } = ctx.switchToHttp().getRequest();
    if (!dbUser)
      throw new UnauthorizedException(
        'The authenticated user does not exist in the database.'
      );
    return dbUser;
  }
);
