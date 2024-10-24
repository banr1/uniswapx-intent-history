// components/another-price-cell.tsx

import { DutchInput, DutchOutput } from '@uniswap/uniswapx-sdk';

import { ERC20 } from '@/constants/erc20';
import { orderTokenNames } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

import BinancePriceCell from './binance-price-cell';
import DunePriceCell from './dune-price-cell';

const BINANCE_TRANSFORM_MAP: Record<string, string> = {
  WETH: 'ETH',
  WBTC: 'BTC',
  'USDC.e': 'USDC',
};

const BINANCE_SUPPORTED_PAIRS = [
  'ETHUSDC',
  'ETHUSDT',
  'BTCUSDC',
  'BTCUSDT',
  'ARBUSDC',
  'ARBUSDT',
  'USDCUSDT',
  'USDTDAI',
];

const DUNE_TRANSFORM_MAP: Record<string, string> = {
  'USDC.e': 'USDC',
};

const AnotherPriceCell = (props: { input: DutchInput; output: DutchOutput; executedAt: number; chainId: ChainId }) => {
  const { input, output, executedAt, chainId } = props;
  const inName = ERC20[chainId][input.token].name;
  const outName = ERC20[chainId][output.token].name;

  const inNameBinance = BINANCE_TRANSFORM_MAP[inName] || inName;
  const outNameBinance = BINANCE_TRANSFORM_MAP[outName] || outName;
  const pairBinance = orderTokenNames(inNameBinance, outNameBinance).join('');

  if (BINANCE_SUPPORTED_PAIRS.includes(pairBinance)) {
    return <BinancePriceCell pair={pairBinance} executedAt={executedAt} chainId={chainId} />;
  }

  const inName0Dune = DUNE_TRANSFORM_MAP[inName] || inName;
  const outNameDune = DUNE_TRANSFORM_MAP[outName] || outName;
  const [token0Dune, token1Dune] = orderTokenNames(inName0Dune, outNameDune);

  {
    return <DunePriceCell token0={token0Dune} token1={token1Dune} executedAt={executedAt} chainId={chainId} />;
  }
};

export default AnotherPriceCell;
