// components/IntentTable.tsx

import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { API_ENDPOINT } from '@/constants/apiEndpoint';
import { ERC20 } from '@/constants/erc20';
import { IntentStatus } from '@/types/IntentStatus';
import { RawIntent } from '@/types/RawIntent';
import { formatTimestamp, numToDate, shortenAddress } from '@/utils';

import { EtherscanLink } from './EtherscanLink';

type FetchOrdersParams = {
  orderStatus: IntentStatus;
  chainId: 1;
  limit?: number;
  sortKey?: 'createdAt';
  desc?: boolean;
  sort?: string;
  orderHash?: string;
  orderHashes?: string[];
  swapper?: string;
  filler?: string;
  cursor?: string;
};

async function fetchIntents(params: FetchOrdersParams): Promise<DutchIntent[]> {
  const response = await axios.get<{ orders: RawIntent[] }>(API_ENDPOINT, { params });
  return response.data.orders.map((order) => DutchIntent.parse(order.encodedOrder, order.chainId));
}

export default function IntentTable(props: { status: IntentStatus; interval: number }): JSX.Element {
  const [intents, setIntents] = useState<DutchIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chainId = 1;

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const decodedIntents = await fetchIntents({
          orderStatus: props.status,
          chainId,
          limit: 5,
          sortKey: 'createdAt',
          desc: true,
          sort: 'sort=lt(9000000000)',
          // cursor:
          //   'eyJjaGFpbklkIjoxLCJjcmVhdGVkQXQiOjE3MjIzODI3NDUsIm9yZGVySGFzaCI6IjB4ZTRlYTVlODhlNzA1MmE5ZWJhNmQxZGY1MDczMWYwNTNkY2U0YWU0NTlmZmRiMjkzMGYzN2Y5YTZlYmM1MjBjZiJ9',
        });
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
    <table className='w-full border-collapse mb-8 text-gray-800'>
      <thead>
        <tr className='bg-purple-300'>
          <th className='border p-2 text-left'>Intent Hash</th>
          <th className='border p-2 text-left'>Input Token</th>
          <th className='border p-2 text-left'>Output Token</th>
          <th className='border p-2 text-left'>Exclusive Filler</th>
          <th className='border p-2 text-left'>Decay Time</th>
        </tr>
      </thead>
      <tbody>
        {intents.map((intent) => (
          <tr key={intent.hash()} className='bg-purple-50 hover:bg-purple-100'>
            <td className='border p-2'>{shortenAddress(intent.hash())}</td>
            <td className='border p-2'>
              {`${intent.info.input.startAmount.toString()} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.input.token].name || shortenAddress(intent.info.input.token)}
                address={intent.info.input.token}
                category='address'
              />
            </td>
            <td className='border p-2'>
              {`${intent.info.outputs[0].startAmount.toString()} -> ${intent.info.outputs[0].endAmount.toString()} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.outputs[0].token].name || shortenAddress(intent.info.outputs[0].token)}
                address={intent.info.outputs[0].token}
                category='address'
              />
            </td>
            <td className='border p-2'>
              <EtherscanLink
                name={shortenAddress(intent.info.exclusiveFiller)}
                address={intent.info.exclusiveFiller}
                category='address'
              />
            </td>
            <td className='border p-2'>
              {formatTimestamp(numToDate(intent.info.decayStartTime)) +
                // ' - ' +
                // formatTimestamp(numToDate(intent.info.decayEndTime)) +
                ` (${intent.info.decayEndTime - intent.info.decayStartTime}s)`}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
