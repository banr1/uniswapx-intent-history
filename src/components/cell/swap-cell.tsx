// components/swap-cell.tsx

import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const SwapCell = (props: {
  input: DutchInput;
  output: FilledToken;
  auctionOutputs: DutchOutput[];
  chainId: ChainId;
}) => {
  const { input, output, auctionOutputs, chainId } = props;
  if (ERC20[chainId][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  } else if (ERC20[chainId][output.token] === undefined) {
    return <TableCell>{shortenHash(output.token)}</TableCell>;
  }

  const inInfo = ERC20[chainId][input.token];
  const inName = inInfo.name;
  const inAmount = formatTokenAmount(input.startAmount, inInfo.decimals);

  const outInfo = ERC20[chainId][output.token];
  const outName = outInfo.name;
  const outAmount = formatTokenAmount(output.amount, outInfo.decimals);

  return <TableCell>{`${inAmount} ${inName} -> ${outAmount} ${outName}`}</TableCell>;
};

export default SwapCell;
