// components/IntentTable.tsx

import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { API_ENDPOINT } from '@/constants/api-endpoint';
import { ERC20 } from '@/constants/erc20';
import { formatTimestamp, numToDate, shortenAddress } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { IntentStatus } from '@/types/intent-status';
import { RawIntent } from '@/types/raw-intent';

import { EtherscanLink } from './etherscan-link';

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
};

async function fetchIntents(params: FetchOrdersParams): Promise<DutchIntent[]> {
  const response = await axios.get<{ orders: RawIntent[] }>(API_ENDPOINT, { params });
  return response.data.orders.map((order) => DutchIntent.parse(order.encodedOrder, order.chainId));
}

export default function IntentTable(props: { status: IntentStatus; interval: number }): JSX.Element {
  const [intents, setIntents] = useState<DutchIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const chainId: ChainId = 1;

  useEffect(() => {
    const fetchIntents_ = async () => {
      try {
        const decodedIntents = await fetchIntents({
          chainId,
          // limit: 100,
          orderStatus: props.status,
          sortKey: 'createdAt',
          desc: true,
          sort: 'lt(9000000000)',
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
          <TableHead className='w-[100px]'>Input Token</TableHead>
          <TableHead className='w-[150px]'>Output Token</TableHead>
          <TableHead className='w-[100px]'>Decay Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {intents.map((intent) => (
          <TableRow key={intent.hash()}>
            <TableCell>{shortenAddress(intent.hash())}</TableCell>
            <TableCell>
              {`${intent.info.input.startAmount.div(ERC20[chainId][intent.info.input.token].decimals)} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.input.token].name || shortenAddress(intent.info.input.token)}
                address={intent.info.input.token}
                category='address'
              />
            </TableCell>
            <TableCell>
              {`${intent.info.outputs[0].startAmount.div(ERC20[chainId][intent.info.outputs[0].token].decimals)} -> ${intent.info.outputs[0].endAmount.div(ERC20[chainId][intent.info.outputs[0].token].decimals)} `}
              <EtherscanLink
                name={ERC20[chainId][intent.info.outputs[0].token].name || shortenAddress(intent.info.outputs[0].token)}
                address={intent.info.outputs[0].token}
                category='address'
              />
            </TableCell>
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
