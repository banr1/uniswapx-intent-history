// lib/fetch-orders.ts

import { DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';

import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ignoreIntentHashes } from '@/constants/ignore-intent-hashes';
import { DutchIntentV1, RawDutchIntentV1 } from '@/types/dutch-intent-v1';
import { FetchOrdersParams } from '@/types/fetch-orders-params';

export async function fetchIntents(params: FetchOrdersParams): Promise<DutchIntentV1[]> {
  const response = await axios.get<{ orders: RawDutchIntentV1[] }>(API_ENDPOINT, { params });
  return response.data.orders
    .map((order) => {
      const decodedOrder = DutchOrder.parse(order.encodedOrder, params.chainId);
      if (ignoreIntentHashes.includes(decodedOrder.hash())) return null;

      if (order.orderStatus === 'filled') {
        return {
          hash: decodedOrder.hash(),
          input: decodedOrder.info.input,
          outputs: decodedOrder.info.outputs,
          decayStartTime: decodedOrder.info.decayStartTime,
          decayEndTime: decodedOrder.info.decayEndTime,
          swapper: decodedOrder.info.swapper,
          filler: decodedOrder.info.exclusiveFiller,
          reactor: decodedOrder.info.reactor,
          chainId: order.chainId,
          orderStatus: 'filled',
          type: OrderType.Dutch,
          settledAmounts: order.settledAmounts!,
          txHash: order.txHash!,
        };
      } else if (order.orderStatus === 'open') {
        return {
          hash: decodedOrder.hash(),
          input: decodedOrder.info.input,
          outputs: decodedOrder.info.outputs,
          decayStartTime: decodedOrder.info.decayStartTime,
          decayEndTime: decodedOrder.info.decayEndTime,
          swapper: decodedOrder.info.swapper,
          filler: decodedOrder.info.exclusiveFiller,
          reactor: decodedOrder.info.reactor,
          chainId: order.chainId,
          orderStatus: 'open',
          type: OrderType.Dutch,
        };
      } else {
        throw new Error('Invalid order status');
      }
    })
    .filter((order): order is DutchIntentV1 => order !== null);
}
