// components/dune-price-cell.tsx

import { DuneClient, QueryParameter } from '@duneanalytics/client-sdk';
import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';
import React, { useEffect } from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { roundToSignificantDigits } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const DunePriceCell = (props: { input: DutchInput; output: DutchOutput; executedAt: number; chainId: ChainId }) => {
  const { input, output, executedAt, chainId } = props;
  let token0, token1;
  if (input.token < output.token) {
    token0 = ERC20[chainId][input.token].name;
    token1 = ERC20[chainId][output.token].name;
  } else {
    token0 = ERC20[chainId][output.token].name;
    token1 = ERC20[chainId][input.token].name;
  }
  // format executedAt to look like '2024-10-23 9:31'
  const minute = new Date(executedAt * 1000).toISOString().slice(0, 16).replace('T', ' ');

  const [price, setPrice] = React.useState<number>(0);

  const formattedPrice = roundToSignificantDigits(price, 6);

  useEffect(() => {
    const dune = new DuneClient(process.env.NEXT_PUBLIC_DUNE_API_KEY || '');
    const query_parameters = [
      QueryParameter.text('token0', token0),
      QueryParameter.text('token1', token1),
      QueryParameter.text('minute', minute),
    ];
    const fetchData = async () => {
      const response = await dune.runQuery({
        queryId: 4184064,
        query_parameters,
      });
      console.log('dune API response', response);
      if (!response.result) {
        return;
      }
      const price = response.result.rows[0]!.price! as number;
      setPrice(price);
    };
    fetchData();
  }, [token0, token1, minute]);

  return <TableCell>{formattedPrice}</TableCell>;
};

export default DunePriceCell;
