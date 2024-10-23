// components/relative-bidding-time-cell.tsx

import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { roundToSignificantDigits, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

// Calculate the percentage of the auction that has been executed
// We don't need to use all of the output tokens to calculate this percentage
const RelativeBiddingTimeCell = (props: {
  input: FilledToken;
  auctionInput: DutchInput;
  auctionInputOverride: BigNumber;
  output: FilledToken;
  auctionOutput: DutchOutput;
  auctionOutputOverride: BigNumber;
  chainId: ChainId;
}) => {
  const { input, auctionInput, auctionInputOverride, output, auctionOutput, auctionOutputOverride, chainId } = props;
  if (ERC20[chainId][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  } else if (ERC20[chainId][output.token] === undefined) {
    return <TableCell>{shortenHash(output.token)}</TableCell>;
  }

  const inStartAmount = new Decimal(auctionInput.startAmount.toString());
  const inEndAmount = new Decimal(auctionInput.endAmount.toString());
  const outStartAmount = new Decimal(auctionOutput.startAmount.toString());
  const outEndAmount = new Decimal(auctionOutput.endAmount.toString());

  let executionPercentage: number | undefined = undefined;

  if (inStartAmount.eq(inEndAmount)) {
    if (outStartAmount.lt(outEndAmount)) {
      throw new Error('Invalid auction: output amount is increasing');
    }
    const outOverriddenStartAmount = new Decimal(auctionOutputOverride.toString());
    if (outOverriddenStartAmount.lt(outStartAmount)) {
      throw new Error('Invalid auction: output override amount is less than start amount');
    }

    const outExecutionAmount = new Decimal(output.amount.toString());
    // calculate: (start - execution) / (start - end)
    executionPercentage = roundToSignificantDigits(
      outOverriddenStartAmount
        .sub(outExecutionAmount)
        .div(outOverriddenStartAmount.sub(outEndAmount))
        .mul(100)
        .toNumber(),
      3,
    );
  } else if (outStartAmount.eq(outEndAmount)) {
    if (inStartAmount.gt(inEndAmount)) {
      throw new Error('Invalid auction: input amount is decreasing');
    }
    const inOverriddenStartAmount = new Decimal(auctionInputOverride.toString());
    if (inOverriddenStartAmount.lt(inStartAmount)) {
      throw new Error('Invalid auction: input override amount is less than start amount');
    }

    const inExecutionAmount = new Decimal(input.amount.toString());
    // calculate: (execution - start) / (end - start)
    executionPercentage = roundToSignificantDigits(
      inExecutionAmount.sub(inOverriddenStartAmount).div(inEndAmount.sub(inOverriddenStartAmount)).mul(100).toNumber(),
      3,
    );
  } else {
    throw new Error('Invalid auction: both input and output amounts are changing');
  }

  return <TableCell>{`${executionPercentage}%`}</TableCell>;
};

export default RelativeBiddingTimeCell;
