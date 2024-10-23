// components/price-cell.tsx

import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { DivideAsStrings, formatTokenAmount, roundToSignificantDigits, shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';

const PriceCell = (props: { input: FilledToken; outputs: FilledToken[]; chainId: ChainId }) => {
  const { input, outputs, chainId } = props;
  const outToken = outputs[0].token;
  if (ERC20[chainId][input.token] === undefined) {
    return <TableCell>{shortenHash(input.token)}</TableCell>;
  } else if (ERC20[chainId][outToken] === undefined) {
    return <TableCell>{shortenHash(outToken)}</TableCell>;
  }

  const inInfo = ERC20[chainId][input.token];
  const inName = inInfo.name;
  const inAmount = formatUnits(input.amount, inInfo.decimals);

  const outInfo = ERC20[chainId][outToken];
  const outName = outInfo.name;
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = formatTokenAmount(unformattedOutAmount, outInfo.decimals);

  // ex) in Arbitrum
  // - input token:
  //     - WETH (0x82...)
  //     - amount: 0.20
  // - output token:
  //     - USDT (0xFD...)
  //     - amount: 400
  // then
  // - token0: WETH
  // - token1: USDT
  // - pair: WETH/USDT
  // - price: 400 / 0.20 = 2000
  // - order type: Sell (token0 -> token1)
  // - order: Sell 2000 WETH/USDT
  let orderType, token0Name, token0Amount, token1Name, token1Amount;
  if (input.token < outToken) {
    orderType = 'Sell';
    token0Name = inName;
    token1Name = outName;
    token0Amount = inAmount;
    token1Amount = outAmount;
  } else {
    orderType = 'Buy';
    token0Name = outName;
    token1Name = inName;
    token0Amount = outAmount;
    token1Amount = inAmount;
  }

  const price = DivideAsStrings(token1Amount, token0Amount);

  return <TableCell>{`${orderType} ${roundToSignificantDigits(price, 6)} ${token0Name}/${token1Name}`}</TableCell>;
};

export default PriceCell;
