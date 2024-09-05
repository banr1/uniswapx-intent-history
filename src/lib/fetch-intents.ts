// lib/fetch-orders.ts

import { CosignedV2DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { BigNumber } from 'ethers';

import { UNISWAPX_API_ENDPOINT } from '@/constants/api-endpoint';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { FilledDutchIntentV2, RawDutchIntentV2 } from '@/types/dutch-intent-v2';
import { FetchOrdersParams } from '@/types/fetch-orders-params';
import { FilledToken } from '@/types/filled-token';

import fetchBlockTimestamp from './fetch-block-timestamp';
import fetchFillEvent from './fetch-fill-event';
import fetchTransferEvent from './fetch-transfer-event';
import fetchTxReceipt from './fetch-tx-receipt';

export async function fetchIntents(params: FetchOrdersParams): Promise<FilledDutchIntentV2[]> {
  const res = await axios.get<{ orders: RawDutchIntentV2[] }>(UNISWAPX_API_ENDPOINT, { params });
  const rawIntents = res.data.orders;

  const intents: FilledDutchIntentV2[] = await Promise.all(
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
        const swapper = rawIntent.swapper;
        const inputTokenAddress = rawIntent.input.token;
        const outputTokenAddress = rawIntent.outputs[0].token;
        const txReceipt = await fetchTxReceipt(rawIntent.txHash!, chainId);
        const executedTime = await fetchBlockTimestamp(txReceipt, chainId);
        const parsedIntent = CosignedV2DutchOrder.parse(rawIntent.encodedOrder, chainId, reactorAddress);

        const fillEvent = await fetchFillEvent(txReceipt, chainId);
        if (!fillEvent) {
          throw new Error('Fill event not found');
        }
        const filler = fillEvent.args.filler;

        const inputTokenTransfer = await fetchTransferEvent(txReceipt, inputTokenAddress, swapper, filler, chainId);
        const outputTokenTransfer = await fetchTransferEvent(txReceipt, outputTokenAddress, filler, swapper, chainId);

        if (!inputTokenTransfer || !outputTokenTransfer) {
          throw new Error('Transfer events not found');
        }

        const filledInput: FilledToken = {
          token: inputTokenAddress,
          amount: inputTokenTransfer?.args.value || BigNumber.from(0),
        };
        const filledOutput: FilledToken = {
          token: outputTokenAddress,
          amount: outputTokenTransfer?.args.value || BigNumber.from(0),
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
          executedTime,
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
