// components/price-cell.tsx

import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import React from 'react';

import { TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import { bigNumberToDecimal, decimalToShow, orderTokenNames } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledToken } from '@/types/filled-token';
import { Side } from '@/types/side';

const PriceCell = (props: { input: FilledToken; outputs: FilledToken[]; chainId: ChainId }) => {
  const { input, outputs, chainId } = props;
  const outToken = outputs[0].token;

  const inInfo = ERC20[chainId][input.token] || undefined;
  const inName = inInfo ? inInfo.name : '???';
  const inAmount = inInfo ? bigNumberToDecimal(input.amount, inInfo.decimals) : bigNumberToDecimal(input.amount, 18);

  const outInfo = ERC20[chainId][outToken] || undefined;
  const outName = outInfo ? outInfo.name : '???';
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = outInfo
    ? bigNumberToDecimal(unformattedOutAmount, outInfo.decimals)
    : bigNumberToDecimal(unformattedOutAmount, 18);

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
  let side: Side | null = null;
  let token0Amount: Decimal | null = null;
  let token1Amount: Decimal | null = null;
  const [token0Name, token1Name] = orderTokenNames(inName, outName);
  if (token0Name === inName) {
    side = 'sell';
    token0Amount = inAmount;
    token1Amount = outAmount;
  } else {
    side = 'buy';
    token0Amount = outAmount;
    token1Amount = inAmount;
  }

  const price = token1Amount.div(token0Amount);
  const priceToShow = decimalToShow(price, 6);

  return (
    <TableCell>
      {`${priceToShow} `}
      <span className='text-xs text-gray-700'>
        {`${token0Name}/${token1Name}`}
        <span className={side === 'buy' ? 'text-teal-500' : 'text-pink-500'}>{` ${side}`}</span>
      </span>
    </TableCell>
  );
};

export default PriceCell;
