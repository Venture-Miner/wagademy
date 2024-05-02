import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import Stripe from 'stripe';

@Module({})
export class StripeConfigModule {
  static registerAsync(): DynamicModule {
    const StripeProvider: Provider = {
      provide: Stripe,
      useFactory: async (configService: ConfigService) => {
        const apiKey = configService.get<string>('STRIPE_SECRET_KEY') as string;
        return new Stripe(apiKey, { apiVersion: '2024-04-10' });
      },
      inject: [ConfigService],
    };
    return {
      module: StripeConfigModule,
      imports: [ConfigModule],
      providers: [StripeProvider],
      exports: [StripeProvider],
    };
  }
}
