// components/price-gap-cell.tsx

import Decimal from 'decimal.js';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow } from '@/lib/utils';
import { Side } from '@/types/side';

const PriceGapCell = (props: { price: Decimal; side: Side; binancePrice: Decimal | null }) => {
  const { price, side, binancePrice } = props;

  if (!binancePrice) {
    return <TableCell>-</TableCell>;
  }

  const sideMultiplier = side === 'buy' ? 1 : -1;
  const priceGap = binancePrice.sub(price).mul(sideMultiplier);
  const isPlus = priceGap.greaterThanOrEqualTo(0);
  const priceGapToShow = isPlus ? `+${decimalToShow(priceGap)}` : decimalToShow(priceGap);

  return <TableCell className={isPlus ? 'text-sky-500' : 'text-rose-500'}>{priceGapToShow}</TableCell>;
};

export default PriceGapCell;
