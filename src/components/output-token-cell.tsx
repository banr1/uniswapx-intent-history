// components/OutputTokenCell.tsx

import { DutchOutput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { shortenHash } from '@/lib/utils';

const OutputTokenCell = (props: { output: DutchOutput }) => {
  if (ERC20[1][props.output.token] === undefined) {
    return <TableCell>{shortenHash(props.output.token)}</TableCell>;
  }

  const decimals = ERC20[1][props.output.token].decimals;
  const startAmount = props.output.startAmount.div(decimals).toNumber();
  const endAmount = props.output.endAmount.div(decimals).toNumber();
  const name = ERC20[1][props.output.token].name;

  return <TableCell>{`${startAmount} -> ${endAmount} ${name}`}</TableCell>;
};

export default OutputTokenCell;
