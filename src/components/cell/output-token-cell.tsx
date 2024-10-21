// components/OutputTokenCell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { DivideAsStrings, formatTokenAmount, roundToSignificantDigits, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const OutputTokenCell = (props: { outputs: DutchOutput[]; chainId: ChainId }) => {
  const { outputs, chainId } = props;
  const firstOutput = outputs[0];
  const totalStartAmount = outputs.reduce((acc, output) => acc.add(output.startAmount), BigNumber.from(0));
  const totalEndAmount = outputs.reduce((acc, output) => acc.add(output.endAmount), BigNumber.from(0));
  if (ERC20[chainId][firstOutput.token] === undefined) {
    return <TableCell>{shortenHash(firstOutput.token)}</TableCell>;
  }
  const uniswapFeeAmount = outputs.find((output) => output.recipient == '0x89F30783108E2F9191Db4A44aE2A516327C99575');
  const fee =
    uniswapFeeAmount !== undefined
      ? DivideAsStrings(uniswapFeeAmount.startAmount.toString(), totalStartAmount.toString())
      : 0;

  const tokenInfo = ERC20[chainId][firstOutput.token];
  const name = tokenInfo.name;
  const startAmount = formatTokenAmount(totalStartAmount, tokenInfo.decimals);
  const endAmount = formatTokenAmount(totalEndAmount, tokenInfo.decimals);

  return (
    <TableCell>
      {`${startAmount} -> ${endAmount} ${name}`}
      <span className='text-xs'>{` (fee: ${roundToSignificantDigits(fee, 2) * 100}%)`}</span>
    </TableCell>
  );
};

export default OutputTokenCell;
