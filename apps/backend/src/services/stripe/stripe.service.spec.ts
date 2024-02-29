import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@wagademy/prisma';
import Stripe from 'stripe';
import { StripeService } from './stripe.service';
import {
  billingSession,
  buyCredits,
  callbackUrl,
  customer,
  default_payment_method,
  price,
  session,
  subscriptionsSchedules,
  subscriptionsSchedulesEmpty,
  userSubscription,
} from './mock/stripe';
import { plan, user } from '../../shared/mocks';
import { CreditTypeEnum } from '@wagademy/types';
import { ForbiddenException } from '@nestjs/common';

describe('StripeService', () => {
  let service: StripeService;
  let stripe: Stripe;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StripeService,
        {
          provide: Stripe,
          useValue: {
            customers: { list: jest.fn().mockResolvedValue(customer) },
            subscriptions: {
              update: jest.fn(),
              retrieve: jest.fn().mockResolvedValue(userSubscription),
            },
            checkout: {
              sessions: { create: jest.fn().mockResolvedValue(session) },
            },
            subscriptionSchedules: {
              create: jest.fn(),
              list: jest.fn().mockResolvedValue(subscriptionsSchedules),
              update: jest.fn(),
            },
            billingPortal: {
              sessions: { create: jest.fn().mockResolvedValue(billingSession) },
            },
          },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();
    stripe = module.get<Stripe>(Stripe);
    service = module.get<StripeService>(StripeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create subscription', () => {
    it('should call stripe customer list with email filter and return customer', async () => {
      const spyCustomerList = jest.spyOn(stripe.customers, 'list');
      await service.createSubscription(user.id, user.email, plan.priceId, '');
      expect(spyCustomerList).toHaveBeenCalledWith({ email: user.email });
      expect(spyCustomerList.mock.results[0].value).resolves.toEqual(customer);
    });

    it('should call stripe checkout sessions create with correct parameters', async () => {
      const spySessionCreate = jest.spyOn(stripe.checkout.sessions, 'create');
      await service.createSubscription(
        user.id,
        user.email,
        plan.priceId,
        callbackUrl
      );
      expect(spySessionCreate).toHaveBeenCalledWith({
        customer: customer.data[0].id,
        metadata: {
          userId: user.id,
          type: CreditTypeEnum.PLAN_CREDIT,
        },
        mode: 'subscription',
        line_items: [
          {
            price: plan.priceId,
            quantity: 1,
          },
        ],
        subscription_data: { metadata: { userId: user.id } },
        success_url: `${callbackUrl}/?purchaseResult=success`,
        cancel_url: `${callbackUrl}/?purchaseResult=failed`,
        payment_method_collection: 'always',
      });
    });

    it('should return correct response', async () => {
      const response = await service.createSubscription(
        user.id,
        user.email,
        plan.priceId,
        callbackUrl
      );
      expect(response).toEqual({
        stripeCheckoutSessionId: session.id,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      });
    });
  });

  describe('Create checkout session ', () => {
    it('should call stripe customer list with email filter and return customer', async () => {
      const spyCustomerList = jest.spyOn(stripe.customers, 'list');
      await service.createCheckoutSession(user.id, user.email, buyCredits);
      expect(spyCustomerList).toHaveBeenCalledWith({ email: user.email });
      expect(spyCustomerList.mock.results[0].value).resolves.toEqual(customer);
    });

    it('should call stripe checkout sessions create with correct parameters', async () => {
      const spySessionCreate = jest.spyOn(stripe.checkout.sessions, 'create');
      await service.createCheckoutSession(user.id, user.email, buyCredits);
      expect(spySessionCreate).toHaveBeenCalledWith({
        customer: customer.data[0].id,
        metadata: {
          credits: buyCredits.totalCredits,
          userId: user.id,
          type: CreditTypeEnum.ON_DEMAND_CREDIT,
        },
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: { name: 'Credits On Demand' },
              unit_amount: buyCredits.price * 100,
            },
            quantity: 1,
          },
        ],
        success_url: `${callbackUrl}/?purchaseResult=success`,
        cancel_url: `${callbackUrl}/?purchaseResult=failed`,
        payment_method_collection: 'always',
      });
    });

    it('should return correct response', async () => {
      const response = await service.createCheckoutSession(
        user.id,
        user.email,
        buyCredits
      );
      expect(response).toEqual({
        stripeCheckoutSessionId: session.id,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      });
    });
  });

  describe('change free to paid', () => {
    it('should call stripe subscriptions update with correct parameters', async () => {
      const spyChangeFreeToPaid = jest.spyOn(stripe.subscriptions, 'update');
      await service.changeFreeToPaid(
        user.subscriptionId,
        price.id,
        plan.priceId,
        default_payment_method
      );
      expect(spyChangeFreeToPaid).toHaveBeenCalledWith(user.subscriptionId, {
        items: [
          { id: price.id, deleted: true, quantity: 1 },
          { price: plan.priceId, quantity: 1 },
        ],
        default_payment_method,
        off_session: true,
      });
    });
  });

  describe('change paid plan', () => {
    it('should call stripe subscription schedules list and return subscriptions schedules', async () => {
      const scheduleSpy = jest.spyOn(stripe.subscriptionSchedules, 'list');
      await service.changePaidPlan(
        user.subscriptionId,
        plan.priceId,
        price.id,
        user.id,
        default_payment_method
      );
      expect(scheduleSpy).toHaveBeenCalledWith({});
      expect(scheduleSpy.mock.results[0].value).resolves.toEqual(
        subscriptionsSchedules
      );
    });
    it('should create a subscription schedule if subscription', async () => {
      const scheduleSpy = jest
        .spyOn(stripe.subscriptionSchedules, 'create')
        .mockResolvedValueOnce(subscriptionsSchedules.data[0] as any);
      jest
        .spyOn(stripe.subscriptionSchedules, 'list')
        .mockResolvedValueOnce(subscriptionsSchedulesEmpty as any);
      await service.changePaidPlan(
        user.subscriptionId,
        plan.priceId,
        price.id,
        user.id,
        default_payment_method
      );
      expect(scheduleSpy).toHaveBeenCalledTimes(1);
      expect(scheduleSpy).toHaveBeenCalledWith({
        from_subscription: user.subscriptionId,
      });
    });
    it('should call update subscriptions schedules with correct params', async () => {
      const scheduleUpdateSpy = jest.spyOn(
        stripe.subscriptionSchedules,
        'update'
      );
      await service.changePaidPlan(
        user.subscriptionId,
        plan.priceId,
        price.id,
        user.id,
        default_payment_method
      );
      expect(scheduleUpdateSpy).toHaveBeenCalledTimes(1);
      expect(scheduleUpdateSpy).toHaveBeenCalledWith(
        subscriptionsSchedules.data[0].id,
        {
          proration_behavior: 'none',
          phases: [
            {
              start_date:
                subscriptionsSchedules.data[0].current_phase.start_date,
              end_date: 'now',
              items: [{ price: plan.priceId, quantity: 1 }],
            },
            {
              start_date: 'now',
              end_date: subscriptionsSchedules.data[0].current_phase.end_date,
              items: [
                {
                  price: plan.priceId,
                  quantity: 1,
                  metadata: { userId: user.id },
                },
              ],
            },
            {
              start_date: subscriptionsSchedules.data[0].current_phase.end_date,
              items: [{ price: price.id, quantity: 1 }],
              proration_behavior: 'none',
              collection_method: 'charge_automatically',
              default_payment_method: default_payment_method,
            },
          ],
          end_behavior: 'release',
        }
      );
    });
  });

  describe('Retrieve user subscription data', () => {
    it('should retrieve an user subscription data', async () => {
      const subscriptionRetrieveSpy = jest.spyOn(
        stripe.subscriptions,
        'retrieve'
      );
      const userSubscriptionData = await service.retrieveUserSubscriptionData(
        user.subscriptionId
      );
      expect(subscriptionRetrieveSpy).toHaveBeenCalledTimes(1);
      expect(subscriptionRetrieveSpy.mock.results[0].value).resolves.toEqual(
        userSubscription
      );
      const { name } = userSubscription.items.data[0].price
        .product as Stripe.Product;
      expect(userSubscriptionData).toEqual({
        default_payment_method,
        id: userSubscription.items.data[0].id,
        name,
        items: userSubscription.items,
        status: 'active',
      });
    });
  });

  describe('Update user subscription', () => {
    it('should retrieve an user subscription data and call change free to paid and return true', async () => {
      const spyRetrieveUserSubscription = jest.spyOn(
        service,
        'retrieveUserSubscriptionData'
      );
      const spyChangeFreeToPaid = jest.spyOn(service, 'changeFreeToPaid');
      jest.spyOn(stripe.subscriptions, 'retrieve').mockResolvedValueOnce({
        ...userSubscription,
        items: {
          ...userSubscription.items,
          data: [
            {
              ...userSubscription.items.data[0],
              price: { product: { name: 'Free' } },
            },
          ],
        },
      } as any);
      const response = await service.updateSubscription(
        user.id,
        user.subscriptionId,
        plan.priceId
      );
      expect(spyRetrieveUserSubscription).toHaveBeenCalledTimes(1);
      expect(spyChangeFreeToPaid).toHaveBeenCalledTimes(1);
      expect(spyChangeFreeToPaid).toHaveBeenCalledWith(
        user.subscriptionId,
        userSubscription.items.data[0].id,
        plan.priceId,
        default_payment_method
      );
      expect(response).toBeTruthy();
    });
    it('should retrieve an user subscription data and call change paid plan and return true', async () => {
      const spyRetrieveUserSubscription = jest.spyOn(
        service,
        'retrieveUserSubscriptionData'
      );
      const spyChangePaidPlan = jest.spyOn(service, 'changePaidPlan');
      const response = await service.updateSubscription(
        user.id,
        user.subscriptionId,
        plan.priceId
      );
      expect(spyRetrieveUserSubscription).toHaveBeenCalledTimes(1);
      expect(spyChangePaidPlan).toHaveBeenCalledTimes(1);
      expect(spyChangePaidPlan).toHaveBeenCalledWith(
        user.subscriptionId,
        userSubscription.items.data[0].price.id,
        plan.priceId,
        user.id,
        default_payment_method
      );
      expect(response).toBeTruthy();
    });
    it('should retrieve an user subscription data and return false if status is canceled', async () => {
      const spyRetrieveUserSubscription = jest.spyOn(
        service,
        'retrieveUserSubscriptionData'
      );
      jest.spyOn(stripe.subscriptions, 'retrieve').mockResolvedValueOnce({
        ...userSubscription,
        status: 'canceled',
      } as any);
      const response = await service.updateSubscription(
        user.id,
        user.subscriptionId,
        plan.priceId
      );
      expect(spyRetrieveUserSubscription).toHaveBeenCalledTimes(1);
      expect(response).toBeFalsy();
    });
  });

  describe('Check user subscription', () => {
    it('should retrieve an user subscription data and if status is not active thrown an error', async () => {
      jest.spyOn(stripe.subscriptions, 'retrieve').mockResolvedValueOnce({
        ...userSubscription,
        status: 'canceled',
      } as any);
      await expect(
        service.checkUserSubscription(user.subscriptionId)
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('Get stripe customer portal', () => {
    it('should get customer and create an billing portal session', async () => {
      const spyCustomerList = jest.spyOn(stripe.customers, 'list');
      await service.getStripeCustomerPortal(user.email, callbackUrl);
      expect(spyCustomerList).toHaveBeenCalledWith({ email: user.email });
      expect(spyCustomerList.mock.results[0].value).resolves.toEqual(customer);
    });

    it('should return correct response', async () => {
      const response = await service.getStripeCustomerPortal(
        user.email,
        callbackUrl
      );
      expect(response).toEqual({
        stripeBillingSessionId: billingSession.url,
        stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
      });
    });
  });
});
