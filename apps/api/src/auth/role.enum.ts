export const Role = {
  CUSTOMER: 'CUSTOMER',
  DEALER: 'DEALER',
  ADMIN: 'ADMIN',
} as const;

export type Role = (typeof Role)[keyof typeof Role];
