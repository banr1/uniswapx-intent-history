// components/price-gap-cell.tsx

import Decimal from 'decimal.js';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { BINANCE_SYMBOL_INFO } from '@/constants/binance-supported-pairs';
import { decimalToShow } from '@/lib/utils';
import { Side } from '@/types/side';

const ReasonableIndexCell = (props: {
  price: Decimal;
  side: Side;
  binancePrice: Decimal | null;
  binanceToken0and1: [string, string];
}) => {
  const { price, side, binancePrice, binanceToken0and1 } = props;

  if (!binancePrice) {
    return <TableCell className='text-xs text-gray-600'>-</TableCell>;
  }

  const sideMultiplier = side === 'buy' ? 1 : -1;
  const priceGap = binancePrice.sub(price).mul(sideMultiplier);
  const symbolInfo = BINANCE_SYMBOL_INFO[binanceToken0and1.join('/')];
  if (!symbolInfo) {
    return <TableCell className='text-xs text-gray-600'>-</TableCell>;
  }

  const halfSpread = symbolInfo.spread.div(2);
  const reasonableIdx = priceGap.div(halfSpread);
  const isPlus = reasonableIdx.greaterThanOrEqualTo(0);
  const reasonableIdxToShow = isPlus ? `+${decimalToShow(reasonableIdx, 4)}` : decimalToShow(reasonableIdx, 4);

  return (
    <TableCell className={isPlus ? 'text-sky-500' : 'text-rose-500'}>
      {reasonableIdxToShow}
      <span className='text-xs'>x</span>
    </TableCell>
  );
};

export default ReasonableIndexCell;
