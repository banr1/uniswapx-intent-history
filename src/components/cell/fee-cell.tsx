// components/fee-cell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { UNISWAP_FEE_ADDRESSES } from '@/constants/uniswap-fee-addresses';
import { DivideAsStrings, roundToSignificantDigits } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const FeeCell = (props: { auctionOutputs: DutchOutput[]; chainId: ChainId }) => {
  const { auctionOutputs, chainId } = props;
  const feeAddresses = UNISWAP_FEE_ADDRESSES[chainId];

  const totalStartAmount = auctionOutputs.reduce((acc, output) => acc.add(output.startAmount), BigNumber.from(0));
  const uniswapFeeAmount = auctionOutputs.find((output) => feeAddresses.includes(output.recipient));
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
