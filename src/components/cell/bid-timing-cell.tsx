// components/cell/bid-timing-cell.tsx

import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { bigNumberToDecimal, decimalToShow } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

// Calculate the percentage of the auction that has been executed
// We don't need to use all of the output tokens to calculate this percentage
const BidTimingCell = (props: {
  input: FilledToken;
  auctionInput: DutchInput;
  auctionInputOverride: BigNumber;
  outputs: FilledToken[];
  auctionOutputs: DutchOutput[];
  auctionOutputOverrides: BigNumber[];
  chainId: ChainId;
}) => {
  const { input, auctionInput, auctionInputOverride, outputs, auctionOutputs, auctionOutputOverrides, chainId } = props;

  const inInfo = ERC20[chainId][input.token];
  const inDecimals = inInfo ? inInfo.decimals : 18;
  const inStartAmount = bigNumberToDecimal(auctionInput.startAmount, inDecimals);
  const inEndAmount = bigNumberToDecimal(auctionInput.endAmount, inDecimals);
  const inExecutionAmount = bigNumberToDecimal(input.amount, inDecimals);

  const outInfo = ERC20[chainId][outputs[0].token];
  const outDecimals = outInfo ? outInfo.decimals : 18;
  const outStartAmount = bigNumberToDecimal(
    auctionOutputs.map((output) => output.startAmount).reduce((a, b) => a.add(b), BigNumber.from(0)),
    outDecimals,
  );
  const outExecutionAmount = bigNumberToDecimal(
    outputs.map((output) => output.amount).reduce((a, b) => a.add(b), BigNumber.from(0)),
    outDecimals,
  );
  const outEndAmount = bigNumberToDecimal(
    auctionOutputs.map((output) => output.endAmount).reduce((a, b) => a.add(b), BigNumber.from(0)),
    outDecimals,
  );

  let executionPercentage: Decimal | null = null;

  if (inStartAmount.eq(inEndAmount)) {
    if (!outStartAmount.gt(outEndAmount)) {
      throw new Error('Invalid auction: output amount is increasing');
    } else if (!inExecutionAmount.eq(inStartAmount)) {
      throw new Error('Invalid auction: input execution amount is not equal to start(end) amount');
    }
    // else if (outOverriddenStartAmount.lt(outStartAmount)) {
    //   throw new Error('Invalid auction: output overridden amount is less than start amount');
    // }
    // calculate: (start - execution) / (start - end)
    executionPercentage = outStartAmount.sub(outExecutionAmount).div(outStartAmount.sub(outEndAmount)).mul(100);
  } else if (outStartAmount.eq(outEndAmount)) {
    if (inStartAmount.gt(inEndAmount)) {
      throw new Error('Invalid auction: input amount is decreasing');
    } else if (!outExecutionAmount.eq(outStartAmount)) {
      throw new Error('Invalid auction: output execution amount is not equal to start(end) amount');
    }
    // else if (inOverriddenStartAmount.lt(inStartAmount)) {
    //   throw new Error('Invalid auction: input overridden amount is less than start amount');
    // }
    // calculate: (execution - start) / (end - start)
    executionPercentage = inExecutionAmount.sub(inStartAmount).div(inEndAmount.sub(inStartAmount)).mul(100);
  } else {
    throw new Error('Invalid auction: both input and output amounts are changing');
  }
  const executionPercentageToShow = decimalToShow(executionPercentage, 4);

  return <TableCell>{`${executionPercentageToShow}%`}</TableCell>;
};

export default BidTimingCell;
