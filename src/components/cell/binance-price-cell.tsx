// components/binance-price-cell.tsx

import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';
import axios from 'axios';
import Decimal from 'decimal.js';
import { useEffect, useState } from 'react';

import { BINANCE_SUPPORTED_PAIRS } from '@/constants/binance-supported-pairs';
import { ERC20 } from '@/constants/erc20';
import { decimalToShow, orderTokenNames } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

import { TableCell } from '../ui/table';

const BinancePriceCell = (props: { input: DutchInput; output: DutchOutput; executedAt: number; chainId: ChainId }) => {
  const { input, output, executedAt, chainId } = props;
  const [price, setPrice] = useState<Decimal>(new Decimal(0));
  const priceToShow = decimalToShow(price, 6);

  const inName = ERC20[chainId][input.token].name;
  const outName = ERC20[chainId][output.token].name;
  const executedTime = executedAt * 1000;

  const inNameOfBinance = inName === 'WETH' ? 'ETH' : inName === 'WBTC' ? 'BTC' : inName;
  const outNameOfBinance = outName === 'WETH' ? 'ETH' : outName === 'WBTC' ? 'BTC' : outName;
  const token0And1OfBinance = orderTokenNames(inNameOfBinance, outNameOfBinance);
  const pairOfBinance = token0And1OfBinance.join('');
  const pair = token0And1OfBinance.join('/');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${pairOfBinance}&limit=5&interval=1s&startTime=${executedTime}&endTime=${executedTime}`,
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
  }, [pairOfBinance, executedTime]);

  if (!BINANCE_SUPPORTED_PAIRS.includes(pairOfBinance)) {
    return <TableCell className='text-gray-500'>-</TableCell>;
  }

  return (
    <TableCell>
      {`${priceToShow} `}
      <span className='text-xs text-gray-700'>{pair}</span>
    </TableCell>
  );
};

export default BinancePriceCell;
