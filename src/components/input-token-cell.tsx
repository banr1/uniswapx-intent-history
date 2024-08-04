// components/InputTokenCell.tsx

import { DutchInput } from '@uniswap/uniswapx-sdk';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { shortenAddress } from '@/lib/utils';

const InputTokenCell = (props: { input: DutchInput }) => {
  if (ERC20[1][props.input.token] === undefined) {
    return <TableCell>{shortenAddress(props.input.token)}</TableCell>;
  }

  const decimals = ERC20[1][props.input.token].decimals;
  const amount = props.input.startAmount.div(decimals).toNumber();
  const name = ERC20[1][props.input.token].name;

  return <TableCell>{`${amount} ${name}`}</TableCell>;
};

export default InputTokenCell;
