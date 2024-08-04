// types/dutch-intent-v1.ts

import { DutchInput, DutchOutput, OrderType } from '@uniswap/uniswapx-sdk';

import { ChainId } from './chain-id';
import { Address, IntentHash, TxHash } from './hash';
import { SettledAmount } from './settled-amount';

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
  settledAmounts: SettledAmount[];
  txHash: TxHash;
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
};

export type RawDutchIntentV1 = {
  encodedOrder: string;
  orderStatus: 'filled' | 'open';
  chainId: ChainId;
  settledAmounts?: SettledAmount[];
  txHash?: TxHash;
};
