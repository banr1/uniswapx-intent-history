// components/filled-intent-table.tsx

import { OrderType } from '@uniswap/uniswapx-sdk';
import { useEffect, useState } from 'react';

import HashCell from '@/components/cell/hash-cell';
import InputTokenCell from '@/components/cell/input-token-cell';
import OutputTokenCell from '@/components/cell/output-token-cell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchIntents } from '@/lib/fetch-intents';
import { formatTimestamp, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledCosignedV2DutchOrder } from '@/types/dutch-intent-v2';
import { IntentStatus } from '@/types/intent-status';

import FilledTokenCell from '../cell/filled-token-cell';

export default function FilledIntentTable(props: {
  status: IntentStatus;
  chainId: ChainId;
  interval: number;
}): JSX.Element {
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
          <TableHead className='w-auto'>Intent Hash</TableHead>
          <TableHead className='w-auto'>Tx Hash</TableHead>
          <TableHead className='w-auto'>Swapper</TableHead>
          <TableHead className='w-auto'>Cosigner</TableHead>
          <TableHead className='w-auto'>Filler</TableHead>
          <TableHead className='w-auto'>Input Token</TableHead>
          <TableHead className='w-auto'>Output Token</TableHead>
          <TableHead className='w-auto'>Actual Output Token</TableHead>
          <TableHead className='w-auto'>Auction Time</TableHead>
          <TableHead className='w-auto'>Deadline</TableHead>
          <TableHead className='w-auto'>Executed TIme</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash()}>
            <HashCell value={intent.hash()} chainId={chainId} category='none' />
            <HashCell value={intent.resultInfo.txHash} chainId={chainId} category='tx' />
            <HashCell value={intent.info.swapper} chainId={chainId} category='address' />
            <HashCell value={intent.info.cosigner} chainId={chainId} category='address' />
            <HashCell value={intent.resultInfo.filler} chainId={chainId} category='address' />
            <InputTokenCell input={intent.info.input} chainId={chainId} />
            <OutputTokenCell outputs={intent.info.outputs} chainId={chainId} />
            <FilledTokenCell token={intent.resultInfo.filledOutput} chainId={chainId} />
            <TableCell>
              {formatTimestamp(numToDate(intent.info.cosignerData.decayStartTime))} {` `}
              <span className='text-xs'>{`${intent.info.cosignerData.decayEndTime - intent.info.cosignerData.decayStartTime}s`}</span>
            </TableCell>
            <TableCell>{formatTimestamp(numToDate(intent.info.deadline))}</TableCell>
            <TableCell>{formatTimestamp(numToDate(intent.resultInfo.executedAt))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
