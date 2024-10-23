// components/swap-cell.tsx

import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const SwapCell = (props: { input: FilledToken; outputs: FilledToken[]; chainId: ChainId }) => {
  const { input, outputs, chainId } = props;
  const outToken = outputs[0].token;
  if (ERC20[chainId][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  } else if (ERC20[chainId][outToken] === undefined) {
    return <TableCell>{shortenHash(outToken)}</TableCell>;
  }

  const inInfo = ERC20[chainId][input.token];
  const inName = inInfo.name;
  const inAmount = formatTokenAmount(input.amount, inInfo.decimals);

  const outInfo = ERC20[chainId][outToken];
  const outName = outInfo.name;
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = formatTokenAmount(unformattedOutAmount, outInfo.decimals);

  return <TableCell>{`${inAmount} ${inName} -> ${outAmount} ${outName}`}</TableCell>;
};

export default SwapCell;
