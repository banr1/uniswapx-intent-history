// lib/fetch-orders.ts

import { CosignedV2DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';

import { UNISWAPX_API_ENDPOINT } from '@/constants/api-endpoint';
import { UNISWAP_FEE_PAYEE_ADDRESSES } from '@/constants/uniswap-fee-payee-addresses';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { ChainId } from '@/types/chain-id';
import { CosignedV2DutchOrderResultInfo, FilledCosignedV2DutchOrder, RawDutchIntentV2 } from '@/types/dutch-intent-v2';
import { FetchOrdersParams } from '@/types/fetch-orders-params';
import { FilledToken } from '@/types/filled-token';
import { Address } from '@/types/hash';
import { IntentStatus } from '@/types/intent-status';
import { LiquiditySource } from '@/types/liquidity-source';

import fetchBlockTimestamp from './fetch-block-timestamp';
import fetchFillEvent from './fetch-fill-event';
import fetchTransferEvents from './fetch-transfer-event';
import fetchTxReceipt from './fetch-tx-receipt';

export async function fetchIntents(params: {
  chainId: ChainId;
  limit: number;
  orderStatus: IntentStatus;
  orderType: OrderType;
}): Promise<FilledCosignedV2DutchOrder[]> {
  const totalParams: FetchOrdersParams = {
    sortKey: 'createdAt',
    desc: true,
    sort: 'lt(9000000000)',
    includeV2: params.orderType === OrderType.Dutch_V2,
    ...params,
  };

  const res = await axios.get<{ orders: RawDutchIntentV2[] }>(UNISWAPX_API_ENDPOINT, { params: totalParams });
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
        const filler: Address = fillEvent.args.filler;
        const swapper: Address = fillEvent.args.swapper;
        if (intent.info.outputs[0].recipient !== swapper) {
          throw new Error('Swapper address does not match');
        }
        let payee: Address | null = null;
        let recipientsOtherThanFillerAndPayee: Address[] = [];
        if (intent.info.outputs.length >= 2) {
          payee = UNISWAP_FEE_PAYEE_ADDRESSES[chainId].includes(intent.info.outputs[1].recipient)
            ? intent.info.outputs[1].recipient
            : null;
          recipientsOtherThanFillerAndPayee = intent.info.outputs
            .slice(1)
            .map((output) => output.recipient)
            .filter((recipient) => !UNISWAP_FEE_PAYEE_ADDRESSES[chainId].includes(recipient));
        }
        if (recipientsOtherThanFillerAndPayee.length > 0) {
          console.warn(`Recipients other than filler and payee found: ${recipientsOtherThanFillerAndPayee.join(', ')}`);
        }

        const inputTokenAddress = intent.info.input.token;
        const outputTokenAddress = intent.info.outputs[0].token;
        const tokenTransfers = await fetchTransferEvents(txReceipt, chainId);
        let inputFromSwapperToFiller: FilledToken | null = null;
        let outputFromFillerToSwapper: FilledToken | null = null;
        let outputFromFillerToPayee: FilledToken | null = null;
        let liquiditySources: LiquiditySource[] = [];
        for (const transfer of tokenTransfers) {
          if (transfer.args.from === swapper && transfer.args.to === filler) {
            // swapper -> filler
            inputFromSwapperToFiller = {
              token: inputTokenAddress,
              amount: transfer.args.value,
            };
          } else if (transfer.args.from === filler && transfer.args.to === swapper) {
            // filler -> swapper
            outputFromFillerToSwapper = {
              token: outputTokenAddress,
              amount: transfer.args.value,
            };
          } else if (payee && transfer.args.from === filler && transfer.args.to === payee) {
            // filler -> payee
            outputFromFillerToPayee = {
              token: outputTokenAddress,
              amount: transfer.args.value,
            };
          } else if (transfer.args.from === filler || transfer.args.to === filler) {
            // filler <-> others
            liquiditySources.push('public');
          }
        }
        if (inputFromSwapperToFiller === null) {
          throw new Error('Input transfer event from swapper to filler not found');
        } else if (outputFromFillerToSwapper === null) {
          throw new Error('Output transfer event from filler to swapper not found');
        }

        if (liquiditySources.length === 0) {
          liquiditySources.push('private');
        } else {
          liquiditySources = Array.from(new Set(liquiditySources));
        }

        const resultInfo: CosignedV2DutchOrderResultInfo = {
          input: inputFromSwapperToFiller,
          outputToSwapper: outputFromFillerToSwapper,
          outputToPayee: outputFromFillerToPayee,
          txHash: rawIntent.txHash,
          liquiditySources,
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
