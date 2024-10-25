// components/price-gap-cell.tsx

import Decimal from 'decimal.js';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { decimalToShow } from '@/lib/utils';
import { Side } from '@/types/side';

const ReasonableIndexCell = (props: { price: Decimal; side: Side; binancePrice: Decimal | null }) => {
  const { price, side, binancePrice } = props;

  if (!binancePrice) {
    return <TableCell>-</TableCell>;
  }

  const sideMultiplier = side === 'buy' ? 1 : -1;
  const priceGap = binancePrice.sub(price).mul(sideMultiplier);
  const gapRatio = priceGap.div(binancePrice);
  const isPlus = gapRatio.greaterThanOrEqualTo(0);
  const gapRatioToShow = isPlus ? `+${decimalToShow(gapRatio, 3)}%` : `${decimalToShow(gapRatio, 3)}%`;

  return <TableCell className={isPlus ? 'text-sky-500' : 'text-rose-500'}>{gapRatioToShow}</TableCell>;
};

export default ReasonableIndexCell;
