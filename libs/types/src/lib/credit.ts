export type Credit = {
  id: string;
  total: number;
  totalUsed: number;
  expireOn: Date | null;
  creditType: CreditTypeEnum;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type BuyCredits = {
  totalCredits: number;
  price: number;
  callbackUrl: string;
};

export const CreditTypeEnum = {
  PLAN_CREDIT: 'PLAN_CREDIT',
  ON_DEMAND_CREDIT: 'ON_DEMAND_CREDIT',
} as const;

export type CreditTypeEnum =
  (typeof CreditTypeEnum)[keyof typeof CreditTypeEnum];

export type GetUserCurrentCreditsResponse = {
  userPlanCredits: Credit[];
  userOnDemandCredits: { total: number; totalUsed: number };
};
