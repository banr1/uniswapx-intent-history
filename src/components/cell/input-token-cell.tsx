// components/input-token-cell.tsx

import { DutchInput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';

const InputTokenCell = (props: { input: DutchInput }) => {
  const { input } = props;
  if (ERC20[1][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  }

  const tokenInfo = ERC20[1][input.token];
  const name = tokenInfo.name;
  const amount = formatTokenAmount(input.startAmount, tokenInfo.decimals);

  return <TableCell>{`${amount} ${name}`}</TableCell>;
};

export default InputTokenCell;
