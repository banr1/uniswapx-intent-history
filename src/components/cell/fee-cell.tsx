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
    return (
      <TableCell className='text-gray-700'>
        0<span className='text-xs text-gray-600'>%</span>
      </TableCell>
    );
  }

  const outDecimals = ERC20[chainId][auctionOutputs[0].token]?.decimals || 18;
  const totalStartAmount = bigNumberToDecimal(
    auctionOutputs.map((output) => output.startAmount).reduce((a, b) => a.add(b), BigNumber.from(0)),
    outDecimals,
  );
  const payeeStartAmount = bigNumberToDecimal(payeeToken.startAmount, outDecimals);

  const fee = payeeStartAmount.div(totalStartAmount).mul(100);
  const feeToShow = decimalToShow(fee, 3);

  return (
    <TableCell>
      {feeToShow}
      <span className='text-xs text-gray-600'>%</span>
    </TableCell>
  );
};

export default FeeCell;
