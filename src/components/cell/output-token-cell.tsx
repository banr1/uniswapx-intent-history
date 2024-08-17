// components/OutputTokenCell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const OutputTokenCell = (props: { output: DutchOutput; chainId: ChainId }) => {
  const { output, chainId } = props;
  if (ERC20[chainId][output.token] === undefined) {
    return <TableCell>{shortenHash(output.token)}</TableCell>;
  }

  const tokenInfo = ERC20[chainId][output.token];
  const name = tokenInfo.name;
  const startAmount = formatTokenAmount(output.startAmount, tokenInfo.decimals);
  const endAmount = formatTokenAmount(output.endAmount, tokenInfo.decimals);

  return <TableCell>{`${startAmount} -> ${endAmount} ${name}`}</TableCell>;
};

export default OutputTokenCell;
