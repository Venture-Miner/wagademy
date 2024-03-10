import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CognitoUserGuard, CognitoUserStrategy, FileModule } from '../infra';
import { PrismaModule } from '@wagademy/prisma';
import { UserModule } from '../modules/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), FileModule, PrismaModule, UserModule],
  controllers: [AppController],
  providers: [AppService, CognitoUserStrategy, CognitoUserGuard],
})
export class AppModule {}
