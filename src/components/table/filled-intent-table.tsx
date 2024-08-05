// components/filled-intent-table.tsx

import { OrderType } from '@uniswap/uniswapx-sdk';
import { useEffect, useState } from 'react';

import HashCell from '@/components/cell/hash-cell';
import InputTokenCell from '@/components/cell/input-token-cell';
import OutputTokenCell from '@/components/cell/output-token-cell';
import SettledOutputTokenCell from '@/components/cell/settled-output-token-cell';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchIntents } from '@/lib/fetch-orders';
import { formatTimestamp, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledDutchIntentV1 } from '@/types/dutch-intent-v1';
import { IntentStatus } from '@/types/intent-status';

export default function FilledIntentTable(props: { status: IntentStatus; interval: number }): JSX.Element {
  const [intents, setIntents] = useState<FilledDutchIntentV1[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chainId: ChainId = 1;

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const intents = await fetchIntents({
          chainId,
          limit: 100,
          orderStatus: props.status,
          sortKey: 'createdAt',
          desc: true,
          sort: 'lt(9000000000)',
          orderType: OrderType.Dutch,
          includeV2: false,
        });
        setIntents(intents as FilledDutchIntentV1[]);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchIntents_();
    const interval = setInterval(fetchIntents_, props.interval);

    return () => clearInterval(interval);
  }, [props.status, props.interval]);

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>{error}</div>;

  return (
    <Table>
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead>Tx Hash</TableHead>
          <TableHead>Swapper</TableHead>
          <TableHead>Filler</TableHead>
          <TableHead>Reactor</TableHead>
          <TableHead>Input Token</TableHead>
          <TableHead>Output Token</TableHead>
          <TableHead>Settled Amount</TableHead>
          <TableHead>Auction Time</TableHead>
          <TableHead>Ver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash}>
            <HashCell value={intent.txHash} category='tx' />
            <HashCell value={intent.swapper} category='address' />
            <HashCell value={intent.filler} category='address' />
            <HashCell value={intent.reactor} category='address' />
            <InputTokenCell input={intent.input} />
            <OutputTokenCell output={intent.outputs[0]} />
            <SettledOutputTokenCell settlement={intent.settlements[0]} />
            <TableCell>
              {formatTimestamp(numToDate(intent.decayStartTime))} {` `}
              <span className='text-xs'>{`${intent.decayEndTime - intent.decayStartTime}s`}</span>
            </TableCell>
            <TableCell>{intent.version}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
