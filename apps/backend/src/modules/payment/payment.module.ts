import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeConfigModule } from '../stripe/stripe-config.module';
import { StripeService } from '../../services/stripe/stripe.service';

@Module({
  imports: [StripeConfigModule.registerAsync()],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService],
})
export class PaymentModule {}
