export type FindOneUserResponse = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
  subscriptionId: string;
  planId: string;
  hasChangedPlan: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  idRefAuth: string;
  subscriptionId: string;
  planId: string;
  hasChangedPlan: boolean;
};
