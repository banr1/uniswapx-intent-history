// components/relative-bidding-time-cell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { roundToSignificantDigits, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const RelativeBiddingTimeCell = (props: { output: FilledToken; auctionOutputs: DutchOutput[]; chainId: ChainId }) => {
  const { output, auctionOutputs, chainId } = props;
  if (ERC20[chainId][output.token] === undefined) {
    return <TableCell>{shortenHash(output.token)}</TableCell>;
  }

  const outStartAmount = new Decimal(
    auctionOutputs.reduce((acc, output) => acc.add(output.startAmount), BigNumber.from(0)).toString(),
  );
  const outEndAmount = new Decimal(
    auctionOutputs.reduce((acc, output) => acc.add(output.endAmount), BigNumber.from(0)).toString(),
  );
  const outExecutionAmount = new Decimal(output.amount.toString());
  const executionPercentage = roundToSignificantDigits(
    outStartAmount.sub(outExecutionAmount).div(outStartAmount.sub(outEndAmount)).mul(100).toNumber(),
    2,
  );

  return <TableCell>{`${executionPercentage}%`}</TableCell>;
};

export default RelativeBiddingTimeCell;
