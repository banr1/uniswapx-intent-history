// lib/fetch-orders.ts

import { CosignedV2DutchOrder } from '@uniswap/uniswapx-sdk';
import axios from 'axios';

import { UNISWAPX_API_ENDPOINT } from '@/constants/api-endpoint';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { CosignedV2DutchOrderResultInfo, FilledCosignedV2DutchOrder, RawDutchIntentV2 } from '@/types/dutch-intent-v2';
import { FetchOrdersParams } from '@/types/fetch-orders-params';
import { FilledToken } from '@/types/filled-token';

import fetchBlockTimestamp from './fetch-block-timestamp';
import fetchFillEvent from './fetch-fill-event';
import fetchTransferEvent from './fetch-transfer-event';
import fetchTxReceipt from './fetch-tx-receipt';

export async function fetchIntents(params: FetchOrdersParams): Promise<FilledCosignedV2DutchOrder[]> {
  const res = await axios.get<{ orders: RawDutchIntentV2[] }>(UNISWAPX_API_ENDPOINT, { params });
  const rawIntents = res.data.orders;

  const intents: FilledCosignedV2DutchOrder[] = await Promise.all(
    rawIntents
      .filter(
        (rawIntent) =>
          // Filter out intents that are not filled
          rawIntent.outputs[0].token !== '0x0000000000000000000000000000000000000000' &&
          rawIntent.input.token !== '0x0000000000000000000000000000000000000000',
      )
      .map(async (rawIntent) => {
        const chainId = params.chainId;
        const reactorAddress = UNISWAP_REACTOR_ADDRESSES[chainId];
        const intent = CosignedV2DutchOrder.parse(rawIntent.encodedOrder, chainId, reactorAddress);
        const txReceipt = await fetchTxReceipt(rawIntent.txHash, chainId);
        const executedAt = await fetchBlockTimestamp(txReceipt, chainId);
        const fillEvent = await fetchFillEvent(txReceipt, chainId);
        if (!fillEvent) {
          throw new Error('Fill event not found');
        }
        const filler = fillEvent.args.filler;
        const outputTokenAddress = intent.info.outputs[0]!.token;
        const outputTokenTransfer = await fetchTransferEvent(
          txReceipt,
          outputTokenAddress,
          filler,
          intent.info.swapper,
          chainId,
        );
        if (!outputTokenTransfer) {
          throw new Error('Transfer events not found');
        }
        const filledOutput: FilledToken = {
          token: outputTokenAddress,
          amount: outputTokenTransfer.args.value,
        };

        const resultInfo: CosignedV2DutchOrderResultInfo = {
          filledOutput,
          txHash: rawIntent.txHash,
          filler,
          createdAt: rawIntent.createdAt,
          executedAt,
        };

        const extendedIntent = FilledCosignedV2DutchOrder.fromCosignedV2DutchOrder(intent, resultInfo);

        return extendedIntent;
      }),
  );

  return intents;
}
