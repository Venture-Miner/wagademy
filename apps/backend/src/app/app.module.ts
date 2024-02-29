import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { StripeConfigModule } from '../modules/stripe/stripe-config.module';
import { StripeModule } from '../modules/stripe/stripe.module';
import { CognitoUserGuard, CognitoUserStrategy } from '../infra';
import { PrismaModule } from '@wagademy/prisma';
import { PaymentModule } from '../modules/payment/payment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PaymentModule,
    PrismaModule,
    StripeConfigModule.registerAsync(),
    StripeModule,
  ],
  controllers: [AppController],
  providers: [AppService, CognitoUserStrategy, CognitoUserGuard],
})
export class AppModule {}
