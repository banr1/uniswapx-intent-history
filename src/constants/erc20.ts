// constants/erc20.ts

import { BigNumber } from '@ethersproject/bignumber';

import { ChainId } from '@/types/chain-id';
import { Address } from '@/types/hash';

import { MILLION, ONE_HUNDRED_MILLION, QUINTILLION } from './power-of-10';

export const ERC20: Record<ChainId, Record<Address, { name: string; decimals: BigNumber }>> = {
  1: {
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
      name: 'ETH', // WETH
      decimals: QUINTILLION,
    },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
      name: 'USDC',
      decimals: MILLION,
    },
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': {
      name: 'USDT',
      decimals: MILLION,
    },
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
      name: 'DAI',
      decimals: QUINTILLION,
    },
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': {
      name: 'MATIC',
      decimals: QUINTILLION,
    },
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': {
      name: 'WBTC',
      decimals: ONE_HUNDRED_MILLION,
    },
    '0x514910771AF9Ca656af840dff83E8264EcF986CA': {
      name: 'LINK',
      decimals: QUINTILLION,
    },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
      name: 'UNI',
      decimals: QUINTILLION,
    },
    '0x6810e776880C02933D47DB1b9fc05908e5386b96': {
      name: 'GNO',
      decimals: QUINTILLION,
    },
    '0xD533a949740bb3306d119CC777fa900bA034cd52': {
      name: 'CRV',
      decimals: QUINTILLION,
    },
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32': {
      name: 'LDO',
      decimals: QUINTILLION,
    },
    '0x6982508145454Ce325dDbE47a25d4ec3d2311933': {
      name: 'PEPE',
      decimals: QUINTILLION,
    },
    '0xfAbA6f8e4a5E8Ab82F62fe7C39859FA577269BE3': {
      name: 'ONDO',
      decimals: QUINTILLION,
    },
  },
};
