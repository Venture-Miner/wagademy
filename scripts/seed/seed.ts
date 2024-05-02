import { Plan, PrismaClient } from '@prisma/client';
import { plans } from './seeds/plan';
import { Stripe } from 'stripe';
const prisma = new PrismaClient();

async function main() {
  try {
    const createdPlan: Plan[] = [];
    for (const plan of plans) {
      createdPlan.push(await prisma.plan.create({ data: plan }));
    }
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('Environment variable STRIPE_SECRET_KEY is not set.');
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    createdPlan.map(async ({ id, name, currency, price, credits }) => {
      const product = await stripe.products.create({
        name: name,
        default_price_data: {
          currency: currency,
          recurring: { interval: 'month' },
          unit_amount_decimal: String(price * 100),
        },
        metadata: { credits },
      });
      await prisma.plan.update({
        where: { id: id },
        data: { priceId: product.default_price?.toString() },
      });
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
