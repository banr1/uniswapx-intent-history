// components/open-intent-table.tsx

import { DutchOrder, OrderType } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ignoreIntentHashes } from '@/constants/ignore-intent-hashes';
import { formatTimestamp, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { IntentStatus } from '@/types/intent-status';
import { RawIntent } from '@/types/raw-intent';

import AddressCell from './address-cell';
import InputTokenCell from './input-token-cell';
import OutputTokenCell from './output-token-cell';

// The source code below is from the UniswapX service repository.
// https://github.com/Uniswap/uniswapx-service/blob/5397efa66378e879e8b48d38c422d55942b0a949/lib/handlers/shared/get.ts#L59-L99
type FetchOrdersParams = {
  chainId: 1;
  limit?: number;
  orderStatus?: IntentStatus;
  sortKey?: 'createdAt';
  desc?: boolean;
  sort?: string;
  orderHash?: string;
  orderHashes?: string[];
  swapper?: string;
  filler?: string;
  cursor?: string;
  includeV2?: boolean;
  orderType?: OrderType;
};

async function fetchIntents(params: FetchOrdersParams): Promise<DutchOrder[]> {
  const response = await axios.get<{ orders: RawIntent[] }>(API_ENDPOINT, { params });
  return response.data.orders
    .map((order) => DutchOrder.parse(order.encodedOrder, order.chainId))
    .filter((order) => !ignoreIntentHashes.includes(order.hash()));
}

export default function OpenIntentTable(props: { status: IntentStatus; interval: number }): JSX.Element {
  const [intents, setIntents] = useState<DutchOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chainId: ChainId = 1;

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const decodedIntents = await fetchIntents({
          chainId,
          limit: 100,
          orderStatus: props.status,
          sortKey: 'createdAt',
          desc: true,
          sort: 'lt(9000000000)',
          orderType: OrderType.Dutch,
          includeV2: false,
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
      <TableHeader className='bg-gray-100'>
        <TableRow>
          <TableHead className='w-[100px]'>Intent Hash</TableHead>
          <TableHead className='w-[100px]'>Swapper</TableHead>
          <TableHead className='w-[100px]'>Filler</TableHead>
          <TableHead className='w-[100px]'>Reactor</TableHead>
          <TableHead className='w-[100px]'>Input Token</TableHead>
          <TableHead className='w-[150px]'>Output Token</TableHead>
          <TableHead className='w-[150px]'>Settled Amount</TableHead>
          <TableHead className='w-[150px]'>Auction Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash()}>
            <AddressCell address={intent.hash()} category='none' />
            <AddressCell address={intent.info.swapper} category='address' />
            <AddressCell address={intent.info.exclusiveFiller} category='address' />
            <AddressCell address={intent.info.reactor} category='address' />
            <InputTokenCell input={intent.info.input} />
            <OutputTokenCell output={intent.info.outputs[0]} />
            <TableCell>
              {formatTimestamp(numToDate(intent.info.decayStartTime))} {` `}
              <span className='text-xs'>{`${intent.info.decayEndTime - intent.info.decayStartTime}s`}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
