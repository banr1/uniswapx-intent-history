// lib/fetch-orders.ts

import { CosignedV2DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';

import { UNISWAPX_API_ENDPOINT } from '@/constants/api-endpoint';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { FilledDutchIntentV2, RawDutchIntentV2 } from '@/types/dutch-intent-v2';
import { FetchOrdersParams } from '@/types/fetch-orders-params';
import { FilledToken } from '@/types/filled-token';

import fetchFillEvent from './fetch-fill-event';
import fetchTransferEvent from './fetch-transfer-event';
import fetchTxReceipt from './fetch-tx-receipt';

export async function fetchIntents(params: FetchOrdersParams): Promise<FilledDutchIntentV2[]> {
  const res = await axios.get<{ orders: RawDutchIntentV2[] }>(UNISWAPX_API_ENDPOINT, { params });
  const rawIntents = res.data.orders;

  const intents: FilledDutchIntentV2[] = await Promise.all(
    rawIntents.map(async (rawIntent) => {
      const chainId = params.chainId;
      const reactorAddress = UNISWAP_REACTOR_ADDRESSES[chainId];
      const swapper = rawIntent.swapper;
      const txReceipt = await fetchTxReceipt(rawIntent.txHash!, chainId);
      const parsedIntent = CosignedV2DutchOrder.parse(rawIntent.encodedOrder, chainId, reactorAddress);

      const fillEvent = await fetchFillEvent(txReceipt, chainId);
      if (!fillEvent) {
        throw new Error('Fill event not found');
      }
      const filler = fillEvent.args.filler;

      const inputTokenTransfer = await fetchTransferEvent(txReceipt, rawIntent.input.token, swapper, filler, chainId);
      const outputTokenTransfer = await fetchTransferEvent(
        txReceipt,
        rawIntent.outputs[0].token,
        filler,
        swapper,
        chainId,
      );

      if (!inputTokenTransfer || !outputTokenTransfer) {
        throw new Error('Transfer events not found');
      }

      console.log('inputTokenTransfer: ', inputTokenTransfer);

      const filledInput: FilledToken = {
        token: rawIntent.input.token,
        amount: inputTokenTransfer.args.value,
      };
      const filledOutput: FilledToken = {
        token: rawIntent.outputs[0].token,
        amount: outputTokenTransfer.args.value,
      };

      return {
        hash: rawIntent.orderHash,
        input: rawIntent.input,
        outputs: rawIntent.outputs,
        filledInput,
        filledOutput,
        decayStartTime: rawIntent.cosignerData.decayStartTime,
        decayEndTime: rawIntent.cosignerData.decayEndTime,
        deadline: parsedIntent.info.deadline,
        swapper,
        filler,
        reactor: reactorAddress,
        chainId,
        txHash: rawIntent.txHash!,
        orderStatus: 'filled',
        type: OrderType.Dutch_V2,
        version: 2,
        createdAt: rawIntent.createdAt,
      };
    }),
  );

  return intents;
}
