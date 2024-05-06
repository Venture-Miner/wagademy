import { Test, TestingModule } from '@nestjs/testing';
import { PaymentService } from './payment.service';
import { PrismaService } from '@wagademy/prisma';
import Stripe from 'stripe';
import { StripeService } from '../../services/stripe/stripe.service';

describe('PaymentService', () => {
  let service: PaymentService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        {
          provide: PrismaService,
          useValue: {},
        },
        {
          provide: Stripe,
          useValue: {},
        },
        StripeService,
      ],
    }).compile();

    service = module.get<PaymentService>(PaymentService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
