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

  const outInfo = ERC20[chainId][auctionOutputs[0].token];
  const outDecimals = outInfo ? outInfo.decimals : 18;
  const totalStartAmount = bigNumberToDecimal(
    auctionOutputs.map((output) => output.startAmount).reduce((a, b) => a.add(b), BigNumber.from(0)),
    outDecimals,
  );
  const payeeStartAmount = bigNumberToDecimal(payeeToken.startAmount, outDecimals);

  const fee = payeeStartAmount.div(totalStartAmount).mul(100);
  const feeToShow = decimalToShow(fee, 3);

  return <TableCell>{`${feeToShow}%`}</TableCell>;
};

export default FeeCell;
