// components/IntentTable.tsx

import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { IntentStatus } from '@/types/IntentStatus';
import { RawIntent } from '@/types/RawIntent';
import { formatTimestamp, numToDate } from '@/utils';

type FetchOrdersParams = {
  orderStatus: IntentStatus;
  chainId: 1;
  limit?: number;
  orderHash?: string;
  orderHashes?: string[];
  swapper?: string;
  filler?: string;
};

async function fetchIntents(params: FetchOrdersParams): Promise<DutchIntent[]> {
  const response = await axios.get<{ orders: RawIntent[] }>('https://api.uniswap.org/v2/orders', { params });
  return response.data.orders.map((order) => DutchIntent.parse(order.encodedOrder, order.chainId));
}

export default function IntentTable(props: { status: IntentStatus; interval: number }): JSX.Element {
  const [intents, setIntents] = useState<DutchIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const decodedIntents = await fetchIntents({ orderStatus: props.status, chainId: 1, limit: 50 });
        setIntents(decodedIntents);
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
    <table className='w-full border-collapse mb-8'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='border p-2 text-left'>Order Hash</th>
          <th className='border p-2 text-left'>Decay Start Time</th>
          <th className='border p-2 text-left'>Decay End Time</th>
        </tr>
      </thead>
      <tbody>
        {intents.map((intent) => (
          <tr key={intent.hash()} className='bg-gray-100 hover:bg-gray-200'>
            <td className='border p-2'>{intent.hash()}</td>
            <td className='border p-2'>{formatTimestamp(numToDate(intent.info.decayStartTime))}</td>
            <td className='border p-2'>{formatTimestamp(numToDate(intent.info.decayEndTime))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
