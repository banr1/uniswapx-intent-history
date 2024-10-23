// components/swap-cell.tsx

import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const SwapCell = (props: { input: FilledToken; outputs: FilledToken[]; chainId: ChainId }) => {
  const { input, outputs, chainId } = props;
  const outToken = outputs[0].token;

  const inInfo = ERC20[chainId][input.token] || undefined;
  const inName = inInfo ? inInfo.name : '???';
  const inAmount = inInfo ? formatTokenAmount(input.amount, inInfo.decimals) : formatTokenAmount(input.amount, 18);

  const outInfo = ERC20[chainId][outToken] || undefined;
  const outName = outInfo ? outInfo.name : '???';
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = outInfo
    ? formatTokenAmount(unformattedOutAmount, outInfo.decimals)
    : formatTokenAmount(unformattedOutAmount, 18);

  return <TableCell>{`${inAmount} ${inName} -> ${outAmount} ${outName}`}</TableCell>;
};

export default SwapCell;
