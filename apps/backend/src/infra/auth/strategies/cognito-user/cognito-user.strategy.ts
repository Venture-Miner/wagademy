import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { passportJwtSecret } from 'jwks-rsa';
import { CognitoUserAttributes } from '@wagademy/types';
import { PrismaService } from '@wagademy/prisma';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CognitoUserStrategy extends PassportStrategy(
  Strategy,
  'cognito-user'
) {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService
  ) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get(
          'END_USER_POOL_AUTHORITY'
        )}/.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: configService.get('END_USER_POOL_CLIENT'),
      issuer: configService.get('END_USER_POOL_AUTHORITY'),
      algorithms: ['RS256'],
    });
  }

  async validate(payload: CognitoUserAttributes) {
    const dbUser = await this.prismaService.user.findUnique({
      where: { idRefAuth: payload.sub },
    });
    return { cognitoUser: payload, dbUser };
  }
}
