// components/input-token-cell.tsx

import { DutchInput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

const InputTokenCell = (props: { input: DutchInput; chainId: ChainId }) => {
  const { input, chainId } = props;
  if (ERC20[chainId][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  }

  const tokenInfo = ERC20[chainId][input.token];
  const name = tokenInfo.name;
  const amount = formatTokenAmount(input.startAmount, tokenInfo.decimals);

  return <TableCell>{`${amount} ${name}`}</TableCell>;
};

export default InputTokenCell;
