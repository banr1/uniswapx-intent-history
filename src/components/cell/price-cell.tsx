// components/price-cell.tsx

import Decimal from 'decimal.js';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow } from '@/lib/utils';
import { Side } from '@/types/side';

const PriceCell = (props: { price: Decimal; token0And1: [string, string]; side: Side }) => {
  const { price, token0And1, side } = props;
  const pair = token0And1.join('/');

  const priceToShow = decimalToShow(price, 6);

  return (
    <TableCell>
      {`${priceToShow} `}
      <span className='text-xs text-gray-700'>
        {pair}
        <span className={side === 'buy' ? 'text-teal-500' : 'text-pink-500'}>{` ${side}`}</span>
      </span>
    </TableCell>
  );
};

export default PriceCell;
