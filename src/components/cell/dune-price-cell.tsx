// components/dune-price-cell.tsx

import { DuneClient, QueryParameter } from '@duneanalytics/client-sdk';
import Decimal from 'decimal.js';
import React, { useEffect } from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const DunePriceCell = (props: { token0: string; token1: string; executedAt: number; chainId: ChainId }) => {
  const { token0, token1, executedAt, chainId } = props;
  // format executedAt to look like '2024-10-23 9:31'
  const minute = numToDate(executedAt).toISOString().slice(0, 16).replace('T', ' ');

  const [price, setPrice] = React.useState<Decimal>(new Decimal(0));

  const priceToShow = decimalToShow(price, 6);

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
      if (!response.result) {
        return;
      }
      const price = new Decimal(response.result.rows[0]!.price! as number);
      setPrice(price);
    };
    fetchData();
  }, [token0, token1, minute]);

  return <TableCell>{priceToShow}</TableCell>;
};

export default DunePriceCell;
