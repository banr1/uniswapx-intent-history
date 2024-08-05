// type/settlement.ts

import { Address } from './hash';

export type Settlement = {
  tokenOut: Address;
  amountOut: number;
  amountIn: number;
  tokenIn: Address;
};
