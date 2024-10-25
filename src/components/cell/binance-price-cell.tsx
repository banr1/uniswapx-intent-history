// components/binance-price-cell.tsx

import Decimal from 'decimal.js';

import { decimalToShow } from '@/lib/utils';

import { TableCell } from '../ui/table';

const BinancePriceCell = (props: { price: Decimal | null; token0And1: [string, string] }) => {
  const { price, token0And1 } = props;

  if (!price) {
    return <TableCell>-</TableCell>;
  }

  const priceToShow = decimalToShow(price, 6);
  const pair = token0And1.join('/');

  return (
    <TableCell>
      {`${priceToShow} `}
      <span className='text-xs text-gray-700'>{pair}</span>
    </TableCell>
  );
};

export default BinancePriceCell;
