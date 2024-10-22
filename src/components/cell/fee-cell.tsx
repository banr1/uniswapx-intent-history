// components/fee-cell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { DivideAsStrings, roundToSignificantDigits, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const FeeCell = (props: { auctionOutputs: DutchOutput[]; chainId: ChainId }) => {
  const { auctionOutputs, chainId } = props;
  const firstOutput = auctionOutputs[0];
  if (ERC20[chainId][firstOutput.token] === undefined) {
    return <TableCell>{shortenHash(firstOutput.token)}</TableCell>;
  }

  const totalStartAmount = auctionOutputs.reduce((acc, output) => acc.add(output.startAmount), BigNumber.from(0));
  const uniswapFeeAmount = auctionOutputs.find(
    (output) => output.recipient == '0x89F30783108E2F9191Db4A44aE2A516327C99575',
  );
  const fee =
    uniswapFeeAmount !== undefined
      ? roundToSignificantDigits(
          DivideAsStrings(uniswapFeeAmount.startAmount.toString(), totalStartAmount.toString()),
          2,
        )
      : 0;

  return <TableCell>{`${fee * 100}%`}</TableCell>;
};

export default FeeCell;
