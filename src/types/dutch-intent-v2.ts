// types/dutch-intent-v2.ts

import { CosignerData, DutchInput, DutchOutput, OrderType } from '@uniswap/uniswapx-sdk';

import { ChainId } from './chain-id';
import { Address, IntentHash, TxHash } from './hash';
import { Settlement } from './settlement';

export type DutchIntentV2 = FilledDutchIntentV2 | OpenDutchIntentV2;

export type FilledDutchIntentV2 = {
  hash: IntentHash;
  input: DutchInput;
  outputs: DutchOutput[];
  settlements: Settlement[];
  decayStartTime: number;
  decayEndTime: number;
  swapper: Address;
  filler: Address;
  reactor: Address;
  chainId: ChainId;
  txHash: TxHash;
  orderStatus: 'filled';
  type: OrderType.Dutch_V2;
  version: 2;
  createdAt: number;
};

export type OpenDutchIntentV2 = {
  hash: IntentHash;
  input: DutchInput;
  outputs: DutchOutput[];
  settlements: null;
  decayStartTime: number;
  decayEndTime: number;
  swapper: Address;
  filler: Address;
  reactor: Address;
  chainId: ChainId;
  txHash: null;
  orderStatus: 'open';
  type: OrderType.Dutch_V2;
  version: 2;
  createdAt: number;
};

// There's a example of a raw Dutch intent in the reference directory:
// reference/raw-dutch-intent-v2.json
export type RawDutchIntentV2 = {
  type: OrderType.Dutch_V2;
  orderStatus: 'filled' | 'open';
  signature: string;
  encodedOrder: string;
  chainId: ChainId;
  nonce: number;
  txHash?: TxHash;
  orderHash: IntentHash;
  swapper: Address;
  input: DutchInput;
  outputs: DutchOutput[];
  cosignerData: CosignerData;
  cosignature: string;
  quoteId: string;
  requestId: string;
  createdAt: number;
};
