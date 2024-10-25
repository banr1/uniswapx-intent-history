// components/swap-cell.tsx

import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { bigNumberToDecimal, decimalToShow } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const SwapCell = (props: { input: FilledToken; outputs: FilledToken[]; chainId: ChainId }) => {
  const { input, outputs, chainId } = props;
  const outToken = outputs[0].token;

  const inInfo = ERC20[chainId][input.token] || undefined;
  const inName = inInfo ? inInfo.name : '???';
  const inAmount = inInfo ? bigNumberToDecimal(input.amount, inInfo.decimals) : bigNumberToDecimal(input.amount, 18);

  const outInfo = ERC20[chainId][outToken] || undefined;
  const outName = outInfo ? outInfo.name : '???';
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = outInfo
    ? bigNumberToDecimal(unformattedOutAmount, outInfo.decimals)
    : bigNumberToDecimal(unformattedOutAmount, 18);

  const inAmountToShow = decimalToShow(inAmount, 6);
  const outAmountToShow = decimalToShow(outAmount, 6);

  return (
    <TableCell>
      {`${inAmountToShow} `}
      <span className='text-xs text-gray-700'>{inName}</span>
      {` -> ${outAmountToShow} `}
      <span className='text-xs text-gray-700'>{outName}</span>
    </TableCell>
  );
};

export default SwapCell;
