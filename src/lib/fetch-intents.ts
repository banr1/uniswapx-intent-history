// lib/fetch-orders.ts

import { CosignedV2DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';

import { UNISWAPX_API_ENDPOINT } from '@/constants/api-endpoint';
import { PERMIT2ADDRESSES } from '@/constants/permit2addresses';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { ChainId } from '@/types/chain-id';
import { FilledDutchIntentV2, RawDutchIntentV2 } from '@/types/dutch-intent-v2';
import { FetchOrdersParams } from '@/types/fetch-orders-params';
import { FilledToken } from '@/types/filled-token';

import fetchFillEvent from './fetch-fill-event';
import fetchTransferEvent from './fetch-transfer-event';
import fetchTxReceipt from './fetch-tx-receipt';

export async function fetchIntents(params: FetchOrdersParams): Promise<FilledDutchIntentV2[]> {
  let intents;

  const res = await axios.get<{ orders: RawDutchIntentV2[] }>(UNISWAPX_API_ENDPOINT, { params });
  intents = res.data.orders
    .map((order) => decodeOrderV2(order, params.chainId))
    .filter((order): order is FilledDutchIntentV2 => order !== null && order.orderStatus === 'filled');

  intents = await Promise.all(
    intents.map(async (intent) => {
      const txReceipt = await fetchTxReceipt(intent.txHash!, params.chainId);

      const fillEvent = await fetchFillEvent(txReceipt, params.chainId);
      if (!fillEvent) {
        throw new Error('Fill event not found');
      }
      const filler = fillEvent.args.filler;

      const inputTokenTransfer = await fetchTransferEvent(
        txReceipt,
        intent.input.token,
        intent.swapper,
        filler,
        params.chainId,
      );
      const outputTokenTransfer = await fetchTransferEvent(
        txReceipt,
        intent.outputs[0].token,
        filler,
        intent.swapper,
        params.chainId,
      );

      if (!inputTokenTransfer || !outputTokenTransfer) {
        throw new Error('Transfer events not found');
      }

      console.log('inputTokenTransfer: ', inputTokenTransfer);

      const filledInput: FilledToken = {
        token: intent.input.token,
        amount: inputTokenTransfer.args.value,
      };
      const filledOutput: FilledToken = {
        token: intent.outputs[0].token,
        amount: outputTokenTransfer.args.value,
      };

      return {
        ...intent,
        filler,
        filledInput,
        filledOutput,
      } as FilledDutchIntentV2;
    }),
  );

  return intents;
}

const decodeOrderV2 = (order: RawDutchIntentV2, chainId: ChainId): FilledDutchIntentV2 => {
  if (!['filled'].includes(order.orderStatus)) {
    throw new Error('Invalid order status');
  }

  const parsedOrder = CosignedV2DutchOrder.parse(order.encodedOrder, chainId, PERMIT2ADDRESSES[chainId]);

  const decodedOrder: FilledDutchIntentV2 = {
    hash: order.orderHash,
    input: order.input,
    outputs: order.outputs,
    filledInput: null,
    filledOutput: null,
    decayStartTime: order.cosignerData.decayStartTime,
    decayEndTime: order.cosignerData.decayEndTime,
    deadline: parsedOrder.info.deadline,
    swapper: order.swapper,
    filler: order.cosignerData.exclusiveFiller,
    reactor: UNISWAP_REACTOR_ADDRESSES[chainId],
    chainId: order.chainId,
    txHash: order.txHash!,
    orderStatus: 'filled',
    type: OrderType.Dutch_V2,
    version: 2,
    createdAt: order.createdAt,
  };
  return decodedOrder;
};
