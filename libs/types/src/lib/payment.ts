export type CreateSubscription = {
  callbackUrl: string;
  planId: string;
};

export type GetStripeCustomerPortal = {
  callbackUrl: string;
};

export type GetStripeCustomerPortalResponse = {
  stripeBillingSessionId: string;
  stripePublicKey: string;
};

export type UpdateSubscription = {
  planId: string;
};

export type CreateCheckoutResponse = {
  stripeCheckoutSessionId?: string;
  stripePublicKey?: string;
  message?: string;
};

export type UpdateSubscriptionResponse = {
  stripeCheckoutSessionId: string;
  stripePublicKey: string;
};
