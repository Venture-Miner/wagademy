import { Injectable } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import Stripe from 'stripe';
import { CreditTypeEnum } from '@wagademy/types';

@Injectable()
export class StripeWebhookService {
  private invoiceEvents = new Map<
    string,
    Stripe.InvoicePaymentSucceededEvent
  >();
  private subscriptionUpdateEvents = new Map<string, boolean>();

  constructor(
    private readonly prismaService: PrismaService,
    private readonly Stripe: Stripe
  ) {}

  async stripeWebhooks(raw: Buffer, signature: string): Promise<void> {
    const event = this.Stripe.webhooks.constructEvent(
      raw,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
    switch (event.type) {
      case 'checkout.session.completed':
        await this.checkoutPayment(event);
        break;
      case 'invoice.payment_succeeded':
        await this.handleInvoice(event);
        break;
      case 'customer.subscription.updated':
        await this.handleSubscriptionUpdate(event);
        break;
    }
  }

  private async handleSubscriptionUpdate(
    event: Stripe.CustomerSubscriptionUpdatedEvent
  ) {
    const invoiceEvent = this.invoiceEvents.get(event.data.object.id);
    if (invoiceEvent) {
      await this.handlePayment(invoiceEvent);
      this.invoiceEvents.delete(event.data.object.id);
    } else this.subscriptionUpdateEvents.set(event.data.object.id, true);
  }

  private async handleInvoice(event: Stripe.InvoicePaymentSucceededEvent) {
    if (!event.data.object.billing_reason?.includes('subscription')) return;
    const subscription = this.subscriptionUpdateEvents.get(
      event.data.object.subscription as string
    );
    if (subscription) {
      await this.handlePayment(event);
      this.subscriptionUpdateEvents.delete(
        event.data.object.subscription as string
      );
    } else
      this.invoiceEvents.set(event.data.object.subscription as string, event);
  }

  private async handlePayment(event: Stripe.InvoicePaymentSucceededEvent) {
    if (event.data.object.lines.data[0].price?.type === 'recurring') {
      const subscription = await this.Stripe.subscriptions.retrieve(
        event.data.object.subscription as string
      );
      const product = await this.Stripe.products.retrieve(
        event.data.object.lines.data[0].price.product as string
      );
      await this.prismaService.credit.create({
        data: {
          creditType: CreditTypeEnum.PLAN_CREDIT,
          expireOn: new Date(
            subscription.current_period_end * 1000
          ).toISOString(),
          total: Number(product.metadata.credits),
          user: { connect: { id: subscription.metadata.userId } },
        },
      });
    }
  }

  private async checkoutPayment(event: Stripe.CheckoutSessionCompletedEvent) {
    const session = event.data.object;
    const { metadata, subscription } = session;
    if (metadata?.type === CreditTypeEnum.ON_DEMAND_CREDIT) {
      await this.prismaService.credit.create({
        data: {
          creditType: CreditTypeEnum.ON_DEMAND_CREDIT,
          total: Number(metadata.credits),
          user: { connect: { id: metadata.userId } },
        },
      });
    } else if (metadata?.type === CreditTypeEnum.PLAN_CREDIT) {
      const user = await this.prismaService.user.findUnique({
        where: { id: metadata.userId },
      });
      if (typeof subscription !== 'string') return;
      if (user?.subscriptionId === subscription) return;
      await this.prismaService.user.update({
        where: { id: metadata.userId },
        data: { subscriptionId: subscription, hasChangedPlan: true },
      });
      if (user?.subscriptionId)
        await this.Stripe.subscriptions.cancel(user.subscriptionId);
    }
  }
}
