export type Toast = {
  message: string;
  primaryBtnMessage?: string;
  secondaryBtnMessage?: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  duration?: number;
};
