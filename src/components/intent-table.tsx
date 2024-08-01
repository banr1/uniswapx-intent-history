// components/IntentTable.tsx

import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ERC20 } from '@/constants/erc20';
import { formatTimestamp, numToDate, shortenAddress } from '@/lib/utils';
import { IntentStatus } from '@/types/intent-status';
import { RawIntent } from '@/types/raw-intent';

import { EtherscanLink } from './etherscan-link';

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Intent Hash</TableHead>
          <TableHead>Input Token</TableHead>
          <TableHead>Output Token</TableHead>
          <TableHead>Decay Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash()}>
            <TableCell>{shortenAddress(intent.hash())}</TableCell>
            <TableCell>
              {`${intent.info.input.startAmount.toString()} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.input.token].name || shortenAddress(intent.info.input.token)}
                address={intent.info.input.token}
                category='address'
              />
            </TableCell>
            <TableCell>
              {`${intent.info.outputs[0].startAmount.toString()} -> ${intent.info.outputs[0].endAmount.toString()} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.outputs[0].token].name || shortenAddress(intent.info.outputs[0].token)}
                address={intent.info.outputs[0].token}
                category='address'
              />
            </TableCell>
            <TableCell>{formatTimestamp(numToDate(intent.info.decayStartTime))}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
