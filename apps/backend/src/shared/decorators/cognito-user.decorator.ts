import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CognitoUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const payload: Record<string, unknown> = request.user.cognitoUser;
    for (const key in payload) {
      if (key.includes('cognito:')) {
        const keyWithoutPrefix = key.replace('cognito:', '');
        payload[keyWithoutPrefix] = payload[key];
        delete payload[key];
      }
    }
    return payload;
  }
);
