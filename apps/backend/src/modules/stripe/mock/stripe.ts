import { user } from '../../../shared/mocks';
import { CreditTypeEnum, DeepPartial } from '@wagademy/types';
import { faker } from '@faker-js/faker';
import Stripe from 'stripe';

export const signature = faker.string.alphanumeric();

export const credits = faker.number.int().toString();

export const subscriptionsRetrieve = {
  current_period_end: faker.date.future().getTime() / 1000,
  metadata: {
    userId: user.id,
  },
};

export const productsRetrieve = {
  metadata: {
    credits,
  },
};

export const checkoutSessionCompletedEventOnDemand: DeepPartial<Stripe.CheckoutSessionCompletedEvent> =
  {
    data: {
      object: {
        metadata: {
          type: CreditTypeEnum.ON_DEMAND_CREDIT,
          userId: user.id,
          credits,
        },
      },
    },
    type: 'checkout.session.completed',
  };

export const checkoutSessionCompletedEventPlanCredit: DeepPartial<Stripe.CheckoutSessionCompletedEvent> =
  {
    data: {
      object: {
        metadata: {
          type: CreditTypeEnum.PLAN_CREDIT,
          userId: user.id,
        },
        subscription: faker.string.uuid(),
      },
    },
    type: 'checkout.session.completed',
  };

export const costumerSubscriptionUpdatedEvent: DeepPartial<Stripe.CustomerSubscriptionUpdatedEvent> =
  {
    data: {
      object: {
        id: faker.string.uuid(),
      },
    },
    type: 'customer.subscription.updated',
  };

export const invoicePaymentSucceededEvent: DeepPartial<Stripe.InvoicePaymentSucceededEvent> =
  {
    data: {
      object: {
        id: faker.string.uuid(),
        billing_reason: 'subscription_create',
        lines: {
          data: [
            {
              price: {
                type: 'recurring',
              },
            },
          ],
        },
      },
    },
    type: 'invoice.payment_succeeded',
  };
