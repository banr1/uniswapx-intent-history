import { BigNumber } from 'ethers';

import { Address } from './hash';

export type FilledToken = {
  readonly token: Address;
  readonly amount: BigNumber;
};
