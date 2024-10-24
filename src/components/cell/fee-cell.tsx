// components/fee-cell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { UNISWAP_FEE_PAYEE_ADDRESSES } from '@/constants/uniswap-fee-payee-addresses';
import { bigNumberToDecimal, decimalToShow } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const FeeCell = (props: { auctionOutputs: DutchOutput[]; chainId: ChainId }) => {
  const { auctionOutputs, chainId } = props;
  const feePayeeAddresses = UNISWAP_FEE_PAYEE_ADDRESSES[chainId];

  const payeeToken = auctionOutputs.find((output) => feePayeeAddresses.includes(output.recipient));
  if (!payeeToken) {
    return <TableCell>0%</TableCell>;
  }

  const outDecimal = ERC20[chainId][auctionOutputs[0].token].decimals;
  const totalStartAmount = bigNumberToDecimal(
    auctionOutputs.reduce((acc, output) => acc.add(output.startAmount), BigNumber.from(0)),
    outDecimal,
  );
  const payeeStartAmount = bigNumberToDecimal(payeeToken.startAmount, outDecimal);

  const fee = payeeStartAmount.div(totalStartAmount).mul(100);
  const feeToShow = decimalToShow(fee, 3);

  return <TableCell>{`${feeToShow}%`}</TableCell>;
};

export default FeeCell;
