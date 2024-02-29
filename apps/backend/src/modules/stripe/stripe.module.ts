import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeWebhookService } from './stripe-webhook.service';
import { StripeConfigModule } from './stripe-config.module';

@Module({
  imports: [StripeConfigModule.registerAsync()],
  controllers: [StripeController],
  providers: [StripeWebhookService],
})
export class StripeModule {}
