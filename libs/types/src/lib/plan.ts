export const PlanTypeEnum = {
  COMPANY: 'COMPANY',
  PHYSICAL_PERSON: 'PHYSICAL_PERSON',
} as const;

export type PlanTypeEnum = (typeof PlanTypeEnum)[keyof typeof PlanTypeEnum];

export type CreatePlan = {
  name: string;
  currency: string;
  price: number;
  metadata: string[];
  credits: number;
  planType: PlanTypeEnum;
};

export type Plan = {
  id: string;
  name: string;
  currency: string;
  price: number;
  metadata: string[];
  credits: number;
  priceId: string | null;
  planType: PlanTypeEnum;
};

export type FindManyPlansResponse = {
  count: number;
  plans: Plan[];
};
