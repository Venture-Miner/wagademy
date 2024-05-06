import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@wagademy/prisma';
import {
  BuyCredits,
  CreateCheckoutResponse,
  CreateSubscription,
  CreditTypeEnum,
  GetStripeCustomerPortalResponse,
  FindManyPlansResponse,
  GetUserCurrentCreditsResponse,
  UpdateSubscription,
  PlanTypeEnum,
} from '@wagademy/types';
import { StripeService } from '../../services/stripe/stripe.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PaymentService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly stripeService: StripeService
  ) {}

  async createSubscription(
    userId: string,
    { callbackUrl, planId }: CreateSubscription
  ): Promise<CreateCheckoutResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (user?.hasChangedPlan) {
      const updateResponse = await this.updateSubscription(userId, { planId });
      if (!updateResponse) return { message: 'Plan successfully updated.' };
    }
    const plan = await this.prismaService.plan.findUnique({
      where: { id: planId },
    });
    if (!plan) throw new NotFoundException('Plan not found.');
    return this.stripeService.createSubscription(
      user?.id as string,
      user?.email as string,
      plan?.priceId as string,
      callbackUrl
    );
  }

  async buyCredits(
    userId: string,
    buyCredits: BuyCredits
  ): Promise<CreateCheckoutResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return this.stripeService.createCheckoutSession(
      user?.id as string,
      user?.email as string,
      buyCredits
    );
  }

  async updateSubscription(
    userId: string,
    { planId }: UpdateSubscription
  ): Promise<boolean> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    const plan = await this.prismaService.plan.findUnique({
      where: { id: planId },
    });
    if (!plan) throw new NotFoundException('Plan not found.');
    return this.stripeService.updateSubscription(
      user?.id as string,
      user?.subscriptionId as string,
      plan?.priceId as string
    );
  }

  async getStripeCustomerPortal(
    userId: string,
    callBackUrl: string
  ): Promise<GetStripeCustomerPortalResponse> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return this.stripeService.getStripeCustomerPortal(
      user?.email as string,
      callBackUrl
    );
  }

  async getUserCurrentCredits(
    userId: string
  ): Promise<GetUserCurrentCreditsResponse> {
    const [userPlanCredits, userOnDemandCredits] = await Promise.all([
      this.prismaService.credit.findMany({
        where: {
          AND: [
            { userId },
            {
              expireOn: { gte: new Date().toISOString(), isSet: true },
            },
            {
              creditType: CreditTypeEnum.PLAN_CREDIT,
            },
          ],
        },
      }),
      this.prismaService.credit.findMany({
        where: {
          AND: [
            { userId },
            {
              creditType: CreditTypeEnum.ON_DEMAND_CREDIT,
            },
          ],
        },
      }),
    ]);
    const { total, totalUsed } = userOnDemandCredits.reduce(
      (accumulator, { total, totalUsed }) => {
        accumulator.total += total;
        accumulator.totalUsed += totalUsed;
        return accumulator;
      },
      { total: 0, totalUsed: 0 }
    );
    return { userPlanCredits, userOnDemandCredits: { total, totalUsed } };
  }

  async findManyPlans(planType: PlanTypeEnum): Promise<FindManyPlansResponse> {
    const where: Prisma.PlanWhereInput = {
      AND: [
        { name: { not: { contains: 'Free' }, mode: 'insensitive' } },
        { planType },
      ],
    };
    const [count, plans] = await Promise.all([
      this.prismaService.plan.count({
        where,
      }),
      this.prismaService.plan.findMany({
        where,
        orderBy: { price: 'asc' },
      }),
    ]);
    return { count, plans };
  }
}
