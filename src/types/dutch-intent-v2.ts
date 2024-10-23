// types/dutch-intent-v2.ts

import {
  CosignedV2DutchOrder,
  CosignedV2DutchOrderInfo,
  CosignerData,
  DutchInput,
  DutchOutput,
  OrderType,
} from '@uniswap/uniswapx-sdk';

import { ChainId } from './chain-id';
import { FilledToken } from './filled-token';
import { Address, IntentHash, TxHash } from './hash';
import { LiquiditySource } from './liquidity-source';

export type CosignedV2DutchOrderResultInfo = {
  input: FilledToken;
  outputToSwapper: FilledToken;
  outputToPayee: FilledToken | null;
  txHash: TxHash;
  filler: Address;
  liquiditySources: LiquiditySource[];
  createdAt: number;
  executedAt: number;
};

export class FilledCosignedV2DutchOrder extends CosignedV2DutchOrder {
  public readonly resultInfo: CosignedV2DutchOrderResultInfo;

  constructor(
    info: CosignedV2DutchOrderInfo,
    chainId: number,
    permit2Address: string,
    resultInfo: CosignedV2DutchOrderResultInfo,
  ) {
    super(info, chainId, permit2Address);
    this.resultInfo = resultInfo;
  }

  static fromCosignedV2DutchOrder(
    cosignedV2DutchOrder: CosignedV2DutchOrder,
    resultInfo: CosignedV2DutchOrderResultInfo,
  ) {
    return new FilledCosignedV2DutchOrder(
      cosignedV2DutchOrder.info,
      cosignedV2DutchOrder.chainId,
      cosignedV2DutchOrder.permit2Address,
      resultInfo,
    );
  }
}

// There's a example of a raw Dutch intent in the reference directory:
// reference/raw-dutch-intent-v2.json
export type RawDutchIntentV2 = {
  type: OrderType.Dutch_V2;
  orderStatus: 'filled';
  signature: string;
  encodedOrder: string;
  chainId: ChainId;
  nonce: number;
  txHash: TxHash;
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
