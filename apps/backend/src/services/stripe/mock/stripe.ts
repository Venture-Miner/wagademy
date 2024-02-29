import { faker } from '@faker-js/faker';
import Stripe from 'stripe';
import { user } from '../../../shared/mocks';
import { BuyCredits, DeepPartial } from '@wagademy/types';

export const customer: Stripe.ApiList<Stripe.Customer> = {
  data: [
    {
      id: faker.string.uuid(),
      object: 'customer',
      balance: faker.number.int({ max: 500 }),
      created: Math.floor(faker.date.past().getTime() / 1000),
      default_source: null,
      description: null,
      email: user.email,
      livemode: true,
      name: user.name,
      shipping: null,
      invoice_settings: {
        footer: null,
        custom_fields: null,
        default_payment_method: null,
        rendering_options: null,
      },
      metadata: { id: faker.database.mongodbObjectId() },
    },
  ],
  object: 'list',
  has_more: false,
  url: faker.internet.url(),
};

export const session: DeepPartial<Stripe.Checkout.Session> = {
  id: faker.string.uuid(),
};

export const callbackUrl = faker.lorem.word();

export const buyCredits: BuyCredits = {
  price: faker.number.int(),
  totalCredits: faker.number.int(),
  callbackUrl: callbackUrl,
};

export const default_payment_method = faker.string.uuid();
export const price = { id: faker.string.uuid() };

export const subscriptionsSchedules: DeepPartial<
  Stripe.ApiList<Stripe.SubscriptionSchedule>
> = {
  object: 'list',
  data: [
    {
      id: faker.string.uuid(),
      current_phase: {
        start_date: Math.floor(faker.date.future().getTime() / 1000),
        end_date: Math.floor(faker.date.future().getTime() / 1000),
      },
      status: 'active',
      subscription: user.subscriptionId,
    },
  ],
  has_more: false,
  url: faker.internet.url(),
};

export const subscriptionsSchedulesEmpty: Stripe.ApiList<
  DeepPartial<Stripe.SubscriptionSchedule>
> = {
  object: 'list',
  data: [],
  has_more: false,
  url: '',
};

export const userSubscription: DeepPartial<
  Stripe.Response<Stripe.Subscription>
> = {
  default_payment_method,
  items: {
    object: 'list',
    data: [
      {
        id: faker.string.uuid(),
        price: {
          id: faker.string.uuid(),
          product: { name: 'Mid' },
        },
      },
    ],
    has_more: false,
    url: faker.internet.url(),
  },
  status: 'active',
};

export const billingSession: DeepPartial<
  Stripe.Response<Stripe.BillingPortal.Session>
> = { url: faker.internet.url() };
