import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CognitoUserGuard, CognitoUserStrategy, FileModule } from '../infra';
import { PrismaModule } from '@wagademy/prisma';

@Module({
  imports: [ConfigModule.forRoot(), FileModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, CognitoUserStrategy, CognitoUserGuard],
})
export class AppModule {}
