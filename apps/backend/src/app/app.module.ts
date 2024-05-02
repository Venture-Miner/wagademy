import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StripeConfigModule } from '../modules/stripe/stripe-config.module';
import { StripeModule } from '../modules/stripe/stripe.module';
import { PaymentModule } from '../modules/payment/payment.module';
import { CognitoUserGuard, CognitoUserStrategy, FileModule } from '../infra';
import { PrismaModule } from '@wagademy/prisma';
import { UserModule } from '../modules/user/user.module';
import { JobModule } from '../modules/job/job.module';
import { ChatBotModule } from '../modules/chat-bot/chat-bot.module';
import { ChatModule } from '../modules/chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ChatBotModule,
    ChatModule,
    ConfigModule.forRoot(),
    FileModule,
    JobModule,
    PaymentModule,
    PrismaModule,
    StripeConfigModule.registerAsync(),
    StripeModule,
    ScheduleModule.forRoot(),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, CognitoUserStrategy, CognitoUserGuard],
})
export class AppModule {}
