// type/settled-amount.ts

import { Address } from './hash';

export type SettledAmount = {
  tokenOut: Address;
  amountOut: number;
  amountIn: number;
  tokenIn: Address;
};
