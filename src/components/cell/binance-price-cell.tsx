// components/binance-price-cell.tsx

import axios from 'axios';
import Decimal from 'decimal.js';
import React, { useEffect } from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const BinancePriceCell = (props: { pair: string; executedAt: number; chainId: ChainId }) => {
  const { pair, executedAt, chainId } = props;
  const executedTime = executedAt * 1000;

  const [price, setPrice] = React.useState<Decimal>(new Decimal(0));

  const priceToShow = decimalToShow(price, 6);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${pair}&limit=5&interval=1s&startTime=${executedTime}&endTime=${executedTime}`,
      );
      if (!response.data) {
        return;
      }
      const openPrice = new Decimal(response.data[0][1]);
      const closePrice = new Decimal(response.data[0][4]);
      const price = openPrice.add(closePrice).div(2);
      setPrice(price);
    };
    fetchData();
  }, [pair, executedTime]);

  return <TableCell>{priceToShow}</TableCell>;
};

export default BinancePriceCell;
