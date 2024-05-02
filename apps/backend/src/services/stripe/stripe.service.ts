import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Stripe from 'stripe';
import {
  BuyCredits,
  CreateCheckoutResponse,
  CreditTypeEnum,
  GetStripeCustomerPortalResponse,
  User,
} from '@wagademy/types';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { PrismaService } from '@wagademy/prisma';

@Injectable()
export class StripeService {
  constructor(
    private readonly Stripe: Stripe,
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @OnEvent('userCreated')
  async assignFreePlanToNewUser(newUser: User) {
    const plan = await this.prismaService.plan.findFirst({
      where: { name: 'Free', planType: newUser.accountType },
    });
    const customer = await this.Stripe.customers.create({
      email: newUser.email,
      name: newUser.name,
    });
    const { id } = await this.Stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan?.priceId as string }],
      metadata: { userId: newUser.id },
    });
    this.eventEmitter.emit('subscriptionCreated', {
      userId: newUser.id,
      subscriptionId: id,
    });
  }

  async createSubscription(
    userId: string,
    email: string,
    priceId: string,
    callbackUrl: string
  ): Promise<CreateCheckoutResponse> {
    const customer = await this.Stripe.customers.list({
      email,
    });
    const session = await this.Stripe.checkout.sessions.create({
      customer: customer.data[0].id,
      metadata: {
        userId,
        type: CreditTypeEnum.PLAN_CREDIT,
      },
      mode: 'subscription',
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: { metadata: { userId } },
      success_url: `${callbackUrl}/?purchaseResult=success`,
      cancel_url: `${callbackUrl}/?purchaseResult=failed`,
      payment_method_collection: 'always',
    });
    return {
      stripeCheckoutSessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    };
  }

  async createCheckoutSession(
    userId: string,
    email: string,
    { totalCredits, price, callbackUrl }: BuyCredits
  ) {
    const customer = await this.Stripe.customers.list({
      email,
    });
    const session = await this.Stripe.checkout.sessions.create({
      customer: customer.data[0].id,
      metadata: {
        credits: totalCredits,
        userId,
        type: CreditTypeEnum.ON_DEMAND_CREDIT,
      },
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: { name: 'Credits On Demand' },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${callbackUrl}/?purchaseResult=success`,
      cancel_url: `${callbackUrl}/?purchaseResult=failed`,
    });
    return {
      stripeCheckoutSessionId: session.id,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY,
    };
  }

  async changeFreeToPaid(
    subscriptionId: string,
    id: string,
    priceId: string,
    defaultPaymentMethod: string
  ) {
    await this.Stripe.subscriptions.update(subscriptionId, {
      items: [
        { id, deleted: true, quantity: 1 },
        { price: priceId, quantity: 1 },
      ],
      default_payment_method: defaultPaymentMethod,
      off_session: true,
    });
  }

  async changePaidPlan(
    subscriptionId: string,
    currentPrice: string,
    priceId: string,
    userId: string,
    defaultPaymentMethod: string
  ) {
    let subscriptionSchedule: Stripe.SubscriptionSchedule;
    const currentSubscriptionSchedules =
      await this.Stripe.subscriptionSchedules.list({});
    // Filter the subscription schedules by the given subscription ID
    const subscriptionScheduleFiltered =
      currentSubscriptionSchedules.data.filter(
        (schedule) =>
          schedule.subscription === subscriptionId &&
          schedule.status === 'active'
      );
    if (subscriptionScheduleFiltered.length > 0) {
      subscriptionSchedule = subscriptionScheduleFiltered[0];
    } else {
      subscriptionSchedule = await this.Stripe.subscriptionSchedules.create({
        from_subscription: subscriptionId,
      });
    }
    const newPrice = priceId;
    const quantity = 1;
    await this.Stripe.subscriptionSchedules.update(subscriptionSchedule.id, {
      proration_behavior: 'none',
      phases: [
        {
          start_date: subscriptionSchedule?.current_phase?.start_date,
          end_date: 'now',
          items: [{ price: currentPrice, quantity }],
        },
        {
          start_date: 'now',
          end_date: subscriptionSchedule?.current_phase?.end_date,
          items: [{ price: currentPrice, quantity, metadata: { userId } }],
        },
        {
          start_date: subscriptionSchedule?.current_phase?.end_date,
          items: [{ price: newPrice, quantity }],
          proration_behavior: 'none',
          collection_method: 'charge_automatically',
          default_payment_method: defaultPaymentMethod,
        },
      ],
      end_behavior: 'release',
    });
  }

  async retrieveUserSubscriptionData(subscriptionId: string) {
    const { default_payment_method, items, status } =
      await this.Stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['items.data.price.product'],
      });
    const {
      price: { product },
      id,
    } = items.data[0];
    const { name } = product as Stripe.Product;
    return { default_payment_method, id, name, items, status };
  }

  async updateSubscription(
    userId: string,
    subscriptionId: string,
    priceId: string
  ): Promise<boolean> {
    const { default_payment_method, items, name, id, status } =
      await this.retrieveUserSubscriptionData(subscriptionId);
    if (status === 'canceled') return false;
    if (name.includes('Free')) {
      await this.changeFreeToPaid(
        subscriptionId,
        id,
        priceId,
        default_payment_method as string
      );
    } else {
      const currentPrice = items.data[0].price.id;
      await this.changePaidPlan(
        subscriptionId,
        currentPrice,
        priceId,
        userId,
        default_payment_method as string
      );
    }
    return true;
  }

  async checkUserSubscription(subscriptionId: string) {
    const subscription = await this.retrieveUserSubscriptionData(
      subscriptionId
    );
    if (!subscription) throw new NotFoundException('Subscription not found.');
    if (subscription.status !== 'active')
      throw new ForbiddenException('Subscription is not active.');
  }

  async getStripeCustomerPortal(
    email: string,
    callBackUrl: string
  ): Promise<GetStripeCustomerPortalResponse> {
    const customer = await this.Stripe.customers.list({
      email,
    });
    const session = await this.Stripe.billingPortal.sessions.create({
      customer: customer.data[0].id,
      return_url: `${callBackUrl}/plans`,
    });
    return {
      stripeBillingSessionId: session.url,
      stripePublicKey: process.env.STRIPE_PUBLIC_KEY as string,
    };
  }
}
