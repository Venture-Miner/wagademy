import { RawBodyRequest } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { StripeWebhookService } from './stripe-webhook.service';
import { StripeController } from './stripe.controller';
import { faker } from '@faker-js/faker';

describe('StripeController', () => {
  let controller: StripeController;
  let service: StripeWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeController],
      providers: [
        {
          provide: StripeWebhookService,
          useValue: { stripeWebhooks: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<StripeController>(StripeController);
    service = module.get<StripeWebhookService>(StripeWebhookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('stripeWebhook', () => {
    it('should successfully process the Stripe webhook event when the payment is valid', async () => {
      const request: RawBodyRequest<Request> = {
        rawBody: {},
      } as RawBodyRequest<Request>;
      const stripeWebhooksSpy = jest
        .spyOn(service, 'stripeWebhooks')
        .mockResolvedValue();
      await controller.stripeWebhook(request, faker.string.alphanumeric());
      expect(stripeWebhooksSpy).toHaveBeenCalled();
    });
  });
});
