// components/binance-price-cell.tsx

import Decimal from 'decimal.js';

import { BINANCE_SUPPORTED_PAIRS } from '@/constants/binance-supported-pairs';
import { decimalToShow } from '@/lib/utils';

import { TableCell } from '../ui/table';

const BinancePriceCell = (props: { price: Decimal; token0And1: [string, string] }) => {
  const { price, token0And1 } = props;
  const priceToShow = decimalToShow(price, 6);
  const pair = token0And1.join('/');

  if (!BINANCE_SUPPORTED_PAIRS.includes(pair)) {
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
