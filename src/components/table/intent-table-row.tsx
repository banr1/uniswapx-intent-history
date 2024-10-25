// components/intent-table-row.tsx

import axios from 'axios';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';

import HashCell from '@/components/cell/hash-cell';
import { TableRow, TableCell } from '@/components/ui/table';
import { ERC20 } from '@/constants/erc20';
import {
  bigNumberToDecimal,
  formatTimestamp,
  numToDate,
  orderTokenNames,
  orderTokenNamesAndAmounts,
} from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledCosignedV2DutchOrder } from '@/types/dutch-intent-v2';

import BidTimingCell from '../cell/bid-timing-cell';
import BinancePriceCell from '../cell/binance-price-cell';
import FeeCell from '../cell/fee-cell';
import PriceCell from '../cell/price-cell';
import ReasonableIndexCell from '../cell/reasonable-index-cell';
import SwapCell from '../cell/swap-cell';

interface IntentTableRowProps {
  intent: FilledCosignedV2DutchOrder;
  chainId: ChainId;
}

const IntentTableRow: React.FC<IntentTableRowProps> = ({ intent, chainId }) => {
  const { info, resultInfo } = intent;
  const { swapper, cosigner, input: auctionInput, outputs: auctionOutputs, cosignerData } = info;
  const { txHash, filler, input, outputToSwapper, outputToPayee, executedAt, liquiditySources } = resultInfo;
  const outputs = outputToPayee ? [outputToSwapper, outputToPayee] : [outputToSwapper];

  const [binancePrice, setBinancePrice] = useState<Decimal | null>(null);

  const inInfo = ERC20[chainId][input.token];
  const outInfo = ERC20[chainId][outputToSwapper.token];
  const inName = inInfo ? inInfo.name : '???';
  const outName = outInfo ? outInfo.name : '???';
  const inAmount = inInfo ? bigNumberToDecimal(input.amount, inInfo.decimals) : bigNumberToDecimal(input.amount, 18);
  const unformattedOutAmount = outputs.reduce((acc, output) => acc.add(output.amount), BigNumber.from(0));
  const outAmount = outInfo
    ? bigNumberToDecimal(unformattedOutAmount, outInfo.decimals)
    : bigNumberToDecimal(unformattedOutAmount, 18);
  const [token0Name, token1Name, token0Amount, token1Amount, side] = orderTokenNamesAndAmounts(
    inName,
    outName,
    inAmount,
    outAmount,
  );
  const price = token1Amount.div(token0Amount);
  const inNameOfBinance = inName === 'WETH' ? 'ETH' : inName === 'WBTC' ? 'BTC' : inName;
  const outNameOfBinance = outName === 'WETH' ? 'ETH' : outName === 'WBTC' ? 'BTC' : outName;
  const token0And1OfBinance = orderTokenNames(inNameOfBinance, outNameOfBinance);

  useEffect(() => {
    const pairOfBinance = token0And1OfBinance.join('');
    const executedTime = executedAt * 1000;
    const fetchData = async () => {
      const response = await axios.get(
        `https://api.binance.com/api/v3/klines?symbol=${pairOfBinance}&limit=5&interval=1s&startTime=${executedTime}&endTime=${executedTime}`,
      );
      if (!response.data) {
        return;
      }
      const openPrice = new Decimal(response.data[0][1]);
      const closePrice = new Decimal(response.data[0][4]);
      const price = openPrice !== new Decimal(0) ? openPrice.add(closePrice).div(2) : null;
      setBinancePrice(price);
    };
    fetchData();
  }, [token0And1OfBinance, executedAt]);

  return (
    <TableRow key={intent.hash()}>
      <HashCell value={txHash} chainId={chainId} category='tx' />
      <HashCell value={swapper} chainId={chainId} category='wallet' />
      <HashCell value={cosigner} chainId={chainId} category='wallet' />
      <HashCell value={filler} chainId={chainId} category='wallet' />
      <SwapCell input={input} outputs={outputs} chainId={chainId} />
      <PriceCell price={price} token0And1={[token0Name, token1Name]} side={side} />
      <BinancePriceCell price={binancePrice} token0And1={token0And1OfBinance} />
      {/* <PriceGapCell price={price} side={side} binancePrice={binancePrice} /> */}
      <ReasonableIndexCell
        price={price}
        side={side}
        binancePrice={binancePrice}
        binanceToken0and1={token0And1OfBinance}
      />
      <BidTimingCell
        input={input}
        auctionInput={auctionInput}
        auctionInputOverride={cosignerData.inputOverride}
        outputs={outputs}
        auctionOutputs={auctionOutputs}
        auctionOutputOverrides={cosignerData.outputOverrides}
        chainId={chainId}
      />
      <FeeCell auctionOutputs={auctionOutputs} chainId={chainId} />
      <TableCell>{liquiditySources.join(', ')}</TableCell>
      <TableCell className='text-xs'>{formatTimestamp(numToDate(intent.resultInfo.executedAt))}</TableCell>
    </TableRow>
  );
};

export default IntentTableRow;
