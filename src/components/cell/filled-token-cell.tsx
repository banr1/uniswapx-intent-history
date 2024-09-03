// components/input-token-cell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { formatTokenAmount, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const InputTokenCell = (props: { token: FilledToken; chainId: ChainId }) => {
  const { token, chainId } = props;
  if (ERC20[chainId][token.token] === undefined) {
    return <TableCell>{shortenHash(token.token)}</TableCell>;
  }

  const tokenInfo = ERC20[chainId][token.token];
  const name = tokenInfo.name;
  const amount = formatTokenAmount(token.amount, tokenInfo.decimals);

  return <TableCell>{`${amount} ${name}`}</TableCell>;
};

export default InputTokenCell;
