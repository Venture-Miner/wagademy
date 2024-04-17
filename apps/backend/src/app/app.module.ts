import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CognitoUserGuard, CognitoUserStrategy, FileModule } from '../infra';
import { PrismaModule } from '@wagademy/prisma';
import { UserModule } from '../modules/user/user.module';
import { JobModule } from '../modules/job/job.module';
import { ChatBotModule } from '../modules/chat-bot/chat-bot.module';
import { ChatModule } from '../modules/chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ChatModule,
    FileModule,
    JobModule,
    PrismaModule,
    UserModule,
    ChatBotModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CognitoUserStrategy, CognitoUserGuard],
})
export class AppModule {}
