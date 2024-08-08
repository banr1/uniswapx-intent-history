// types/dutch-intent-v1.ts

import { DutchInput, DutchOutput, OrderType } from '@uniswap/uniswapx-sdk';

import { ChainId } from './chain-id';
import { Address, IntentHash, TxHash } from './hash';
import { Settlement } from './settlement';

export type DutchIntentV1 = FilledDutchIntentV1 | OpenDutchIntentV1;

export type FilledDutchIntentV1 = {
  hash: IntentHash;
  input: DutchInput;
  outputs: DutchOutput[];
  decayStartTime: number;
  decayEndTime: number;
  swapper: Address;
  filler: Address;
  reactor: Address;
  chainId: ChainId;
  orderStatus: 'filled';
  type: OrderType.Dutch;
  version: 1;
  settlements: Settlement[];
  txHash: TxHash;
  createdAt: number;
};

export type OpenDutchIntentV1 = {
  hash: IntentHash;
  input: DutchInput;
  outputs: DutchOutput[];
  decayStartTime: number;
  decayEndTime: number;
  swapper: Address;
  filler: Address;
  reactor: Address;
  chainId: ChainId;
  orderStatus: 'open';
  type: OrderType.Dutch;
  version: 1;
  settlements: null;
  txHash: null;
  createdAt: number;
};

// There's a example of a raw Dutch intent in the reference directory:
// reference/raw-dutch-intent-v1.json
export type RawDutchIntentV1 = {
  encodedOrder: string;
  orderStatus: 'filled' | 'open';
  chainId: ChainId;
  settledAmounts?: Settlement[];
  txHash?: TxHash;
  createdAt: number;
};
