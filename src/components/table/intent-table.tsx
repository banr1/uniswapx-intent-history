// components/intent-table.tsx

import { OrderType } from '@uniswap/uniswapx-sdk';
import { useEffect, useState } from 'react';

import HashCell from '@/components/cell/hash-cell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchIntents } from '@/lib/fetch-intents';
import { formatTimestamp, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledCosignedV2DutchOrder } from '@/types/dutch-intent-v2';
import { IntentStatus } from '@/types/intent-status';

import BidTimingCell from '../cell/bid-timing-cell';
import FeeCell from '../cell/fee-cell';
import PriceCell from '../cell/price-cell';
import SwapCell from '../cell/swap-cell';

export default function IntentTable(props: { status: IntentStatus; chainId: ChainId; interval: number }): JSX.Element {
  const { status, chainId, interval } = props;

  const [intents, setIntents] = useState<FilledCosignedV2DutchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const intents = await fetchIntents({
          chainId,
          limit: 50,
          orderStatus: status,
          sortKey: 'createdAt',
          desc: true,
          sort: 'lt(9000000000)',
          orderType: OrderType.Dutch_V2,
          includeV2: true,
        });
        setIntents(intents.sort((a, b) => b.info.cosignerData.decayStartTime - a.info.cosignerData.decayStartTime));
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        console.error(err);
        setLoading(false);
      }
    };

    fetchIntents_();
    const interval_ = setInterval(fetchIntents_, interval);

    return () => clearInterval(interval_);
  }, [status, chainId, interval]);

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>{error}</div>;

  return (
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead className='w-auto'>Tx Hash</TableHead>
          <TableHead className='w-auto'>Swapper</TableHead>
          <TableHead className='w-auto'>Cosigner</TableHead>
          <TableHead className='w-auto'>Filler</TableHead>
          <TableHead className='w-auto'>Swap</TableHead>
          <TableHead className='w-auto'>Price</TableHead>
          {/* <TableHead className='w-auto'>Price (Dune)</TableHead> */}
          <TableHead className='w-auto'>Bid Timing</TableHead>
          <TableHead className='w-auto'>Fee</TableHead>
          <TableHead className='w-auto'>Liquidity Source</TableHead>
          <TableHead className='w-auto'>Executed Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash()}>
            <HashCell value={intent.resultInfo.txHash} chainId={chainId} category='tx' />
            <HashCell value={intent.info.swapper} chainId={chainId} category='wallet' />
            <HashCell value={intent.info.cosigner} chainId={chainId} category='wallet' />
            <HashCell value={intent.resultInfo.filler} chainId={chainId} category='wallet' />
            <SwapCell
              input={intent.resultInfo.input}
              outputs={
                intent.resultInfo.outputToPayee
                  ? [intent.resultInfo.outputToSwapper, intent.resultInfo.outputToPayee]
                  : [intent.resultInfo.outputToSwapper]
              }
              chainId={chainId}
            />
            <PriceCell
              input={intent.resultInfo.input}
              outputs={
                intent.resultInfo.outputToPayee
                  ? [intent.resultInfo.outputToSwapper, intent.resultInfo.outputToPayee]
                  : [intent.resultInfo.outputToSwapper]
              }
              chainId={chainId}
            />
            {/* <DunePriceCell
              input={intent.info.input}
              output={intent.info.outputs[0]}
              executedAt={intent.resultInfo.executedAt}
              chainId={chainId}
            /> */}
            <BidTimingCell
              input={intent.resultInfo.input}
              auctionInput={intent.info.input}
              auctionInputOverride={intent.info.cosignerData.inputOverride}
              outputs={
                intent.resultInfo.outputToPayee
                  ? [intent.resultInfo.outputToSwapper, intent.resultInfo.outputToPayee]
                  : [intent.resultInfo.outputToSwapper]
              }
              auctionOutputs={intent.info.outputs}
              auctionOutputOverrides={intent.info.cosignerData.outputOverrides}
              chainId={chainId}
            />
            <FeeCell auctionOutputs={intent.info.outputs} chainId={chainId} />
            <TableCell>{intent.resultInfo.liquiditySources.join(', ')}</TableCell>
            <TableCell>{formatTimestamp(numToDate(intent.resultInfo.executedAt))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
