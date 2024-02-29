export type CreatePlan = {
  name: string;
  currency: string;
  price: number;
  metadata: string[];
  credits: number;
  quantityOfMailboxes: number;
};

export type Plan = {
  id: string;
  name: string;
  currency: string;
  price: number;
  metadata: string[];
  credits: number;
  quantityOfMailboxes: number;
  priceId: string | null;
};

export type FindManyPlansResponse = {
  count: number;
  plans: Plan[];
};
