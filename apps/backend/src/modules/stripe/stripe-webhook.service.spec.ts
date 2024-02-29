import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@wagademy/prisma';
import Stripe from 'stripe';
import { StripeWebhookService } from './stripe-webhook.service';
import {
  checkoutSessionCompletedEventOnDemand,
  checkoutSessionCompletedEventPlanCredit,
  costumerSubscriptionUpdatedEvent,
  credits,
  invoicePaymentSucceededEvent,
  productsRetrieve,
  signature,
  subscriptionsRetrieve,
} from './mock/stripe';
import { user } from '../../shared/mocks';
import { CreditTypeEnum } from '@wagademy/types';

describe('StripeWebhookService', () => {
  let service: StripeWebhookService;
  let stripe: Stripe;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeWebhookService,
        {
          provide: Stripe,
          useValue: {
            webhooks: {
              constructEvent: jest
                .fn()
                .mockReturnValue(checkoutSessionCompletedEventOnDemand),
            },
            subscriptions: {
              cancel: jest
                .fn()
                .mockReturnValue({} as Stripe.Response<Stripe.Subscription>),
              retrieve: jest.fn().mockResolvedValue(subscriptionsRetrieve),
            },
            products: {
              retrieve: jest.fn().mockResolvedValue(productsRetrieve),
            },
          },
        },
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn().mockResolvedValue(user),
              findUnique: jest.fn().mockResolvedValue(user),
            },
            credit: {
              create: jest.fn(),
            },
            $transaction: jest.fn(),
          },
        },
      ],
    }).compile();
    stripe = module.get<Stripe>(Stripe);
    prisma = module.get<PrismaService>(PrismaService);
    service = module.get<StripeWebhookService>(StripeWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('stripeWebhooks', () => {
    it('should call constructEvent with correct params', async () => {
      const buffer = Buffer.from(
        JSON.stringify(checkoutSessionCompletedEventOnDemand, null, 2)
      );

      await service.stripeWebhooks(buffer, signature);

      expect(stripe.webhooks.constructEvent).toHaveBeenCalledWith(
        buffer,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    });

    describe('handleSubscriptionUpdate', () => {
      const buffer = Buffer.from(
        JSON.stringify(costumerSubscriptionUpdatedEvent, null, 2)
      );
      const invoiceEvent = costumerSubscriptionUpdatedEvent.data.object.id;

      beforeEach(() => {
        jest
          .spyOn(stripe.webhooks, 'constructEvent')
          .mockReturnValueOnce(
            costumerSubscriptionUpdatedEvent as Stripe.CustomerSubscriptionUpdatedEvent
          );
      });

      it('should call handlePayment and delete invoice event when invoice event exists', async () => {
        jest
          .spyOn(service['invoiceEvents'], 'get')
          .mockReturnValueOnce(
            invoicePaymentSucceededEvent as Stripe.InvoicePaymentSucceededEvent
          );
        const handlePaymentSpy = jest.spyOn(service as any, 'handlePayment');
        const deleteSpy = jest.spyOn(service['invoiceEvents'], 'delete');

        await service.stripeWebhooks(buffer, signature);

        expect(handlePaymentSpy).toHaveBeenCalledTimes(1);
        expect(handlePaymentSpy).toHaveBeenCalledWith(
          invoicePaymentSucceededEvent
        );
        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith(invoiceEvent);
      });

      it('should set subscription update event when invoice event does not exist', async () => {
        const setSpy = jest.spyOn(service['subscriptionUpdateEvents'], 'set');

        await service.stripeWebhooks(buffer, signature);

        expect(setSpy).toHaveBeenCalledTimes(1);
        expect(setSpy).toHaveBeenCalledWith(invoiceEvent, true);
      });
    });

    describe('handleInvoice', () => {
      const subscription =
        invoicePaymentSucceededEvent.data.object.subscription;
      const buffer = Buffer.from(
        JSON.stringify(invoicePaymentSucceededEvent, null, 2)
      );

      beforeEach(() => {
        jest
          .spyOn(stripe.webhooks, 'constructEvent')
          .mockReturnValueOnce(
            invoicePaymentSucceededEvent as Stripe.InvoicePaymentSucceededEvent
          );
      });

      it('should handle invoice payment when subscription update event exists', async () => {
        jest
          .spyOn(service['subscriptionUpdateEvents'], 'get')
          .mockReturnValueOnce(true);
        const handlePaymentSpy = jest.spyOn(service as any, 'handlePayment');
        const deleteSpy = jest.spyOn(
          service['subscriptionUpdateEvents'],
          'delete'
        );

        await service.stripeWebhooks(buffer, signature);

        expect(handlePaymentSpy).toHaveBeenCalledTimes(1);
        expect(handlePaymentSpy).toHaveBeenCalledWith(
          invoicePaymentSucceededEvent
        );
        expect(deleteSpy).toHaveBeenCalledTimes(1);
        expect(deleteSpy).toHaveBeenCalledWith(subscription);
      });

      it('should set invoice event when subscription update event does not exist', async () => {
        jest
          .spyOn(service['subscriptionUpdateEvents'], 'get')
          .mockReturnValueOnce(false);
        const setSpy = jest.spyOn(service['invoiceEvents'], 'set');

        await service.stripeWebhooks(buffer, signature);

        expect(setSpy).toHaveBeenCalledTimes(1);
        expect(setSpy).toHaveBeenCalledWith(
          subscription,
          invoicePaymentSucceededEvent
        );
      });
    });

    describe('handlePayment', () => {
      it('should handle payment for recurring subscription', async () => {
        await (service as any).handlePayment(invoicePaymentSucceededEvent);
        const currentPeriodEnd = subscriptionsRetrieve.current_period_end;

        expect(prisma.credit.create).toHaveBeenCalledTimes(1);
        expect(prisma.credit.create).toHaveBeenCalledWith({
          data: {
            creditType: CreditTypeEnum.PLAN_CREDIT,
            expireOn: new Date(currentPeriodEnd * 1000).toISOString(),
            total: Number(credits),
            user: { connect: { id: user.id } },
          },
        });
      });
    });

    describe('checkoutPayment', () => {
      it('should handle checkout payment for on-demand credit', async () => {
        const buffer = Buffer.from(
          JSON.stringify(checkoutSessionCompletedEventOnDemand, null, 2)
        );

        await service.stripeWebhooks(buffer, signature);

        expect(prisma.credit.create).toHaveBeenCalledTimes(1);
        expect(prisma.credit.create).toHaveBeenCalledWith({
          data: {
            creditType: CreditTypeEnum.ON_DEMAND_CREDIT,
            total: Number(credits),
            user: { connect: { id: user.id } },
          },
        });
      });

      it('should handle checkout payment for plan credit', async () => {
        jest
          .spyOn(stripe.webhooks, 'constructEvent')
          .mockReturnValueOnce(
            checkoutSessionCompletedEventPlanCredit as Stripe.CheckoutSessionCompletedEvent
          );
        const buffer = Buffer.from(
          JSON.stringify(checkoutSessionCompletedEventPlanCredit, null, 2)
        );
        const subscription =
          checkoutSessionCompletedEventPlanCredit.data.object.subscription;

        await service.stripeWebhooks(buffer, signature);

        expect(prisma.user.update).toHaveBeenCalledTimes(1);
        expect(prisma.user.update).toHaveBeenCalledWith({
          where: { id: user.id },
          data: {
            subscriptionId: subscription,
            hasChangedPlan: true,
          },
        });
      });
    });
  });
});
