// components/filled-table.tsx

import { OrderType } from '@uniswap/uniswapx-sdk';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { fetchIntents } from '@/lib/fetch-intents';
import { ChainId } from '@/types/chain-id';
import { FilledCosignedV2DutchOrder } from '@/types/dutch-intent-v2';

import FilledTableHead from './filled-table-head';
import FilledTableRow from './filled-table-row';

export default function FilledTable(props: { intentType: OrderType; chainId: ChainId; interval: number }): JSX.Element {
  const { intentType, chainId, interval } = props;

  const [intents, setIntents] = useState<FilledCosignedV2DutchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const intents = await fetchIntents({
          chainId,
          limit: 50,
          orderStatus: 'filled',
          orderType: intentType,
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
  }, [intentType, chainId, interval]);

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>{error}</div>;

  return (
    <Table>
      <TableHeader className='bg-gray-100'>
        <FilledTableHead />
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <FilledTableRow key={intent.hash()} intent={intent} chainId={chainId} />
        ))}
      </TableBody>
    </Table>
  );
}
