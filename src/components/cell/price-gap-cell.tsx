// components/price-gap-cell.tsx

import Decimal from 'decimal.js';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow } from '@/lib/utils';
import { Side } from '@/types/side';

export default function PriceGapCell(props: { price: Decimal; side: Side; binancePrice: Decimal | null }): JSX.Element {
  const { price, side, binancePrice } = props;

  if (!binancePrice) {
    return <TableCell className='text-xs text-gray-600'>-</TableCell>;
  }

  const sideMultiplier = side === 'buy' ? 1 : -1;
  const priceGap = binancePrice.sub(price).mul(sideMultiplier);
  const isPlus = priceGap.greaterThanOrEqualTo(0);
  const priceGapToShow = isPlus ? `+${decimalToShow(priceGap)}` : decimalToShow(priceGap);

  return <TableCell className={isPlus ? 'text-sky-500' : 'text-rose-500'}>{priceGapToShow}</TableCell>;
}
