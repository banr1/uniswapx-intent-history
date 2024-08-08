// constants/erc20.ts

import { ChainId } from '@/types/chain-id';
import { Address } from '@/types/hash';

export const ERC20: Record<ChainId, Record<Address, { name: string; decimals: number }>> = {
  1: {
    // The zero address is used to represent ETH
    '0x0000000000000000000000000000000000000000': {
      name: 'ETH',
      decimals: 18,
    },
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2': {
      name: 'WETH',
      decimals: 18,
    },
    '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': {
      name: 'USDC',
      decimals: 6,
    },
    '0xdAC17F958D2ee523a2206206994597C13D831ec7': {
      name: 'USDT',
      decimals: 6,
    },
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': {
      name: 'DAI',
      decimals: 18,
    },
    '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0': {
      name: 'MATIC',
      decimals: 18,
    },
    '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599': {
      name: 'WBTC',
      decimals: 8,
    },
    '0x514910771AF9Ca656af840dff83E8264EcF986CA': {
      name: 'LINK',
      decimals: 18,
    },
    '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': {
      name: 'UNI',
      decimals: 18,
    },
    '0x6810e776880C02933D47DB1b9fc05908e5386b96': {
      name: 'GNO',
      decimals: 18,
    },
    '0xD533a949740bb3306d119CC777fa900bA034cd52': {
      name: 'CRV',
      decimals: 18,
    },
    '0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32': {
      name: 'LDO',
      decimals: 18,
    },
    '0x6982508145454Ce325dDbE47a25d4ec3d2311933': {
      name: 'PEPE',
      decimals: 18,
    },
    '0xfAbA6f8e4a5E8Ab82F62fe7C39859FA577269BE3': {
      name: 'ONDO',
      decimals: 18,
    },
    '0x6De037ef9aD2725EB40118Bb1702EBb27e4Aeb24': {
      name: 'RNDR',
      decimals: 18,
    },
    '0x4d224452801ACEd8B2F0aebE155379bb5D594381': {
      name: 'APE',
      decimals: 18,
    },
    '0x92D6C1e31e14520e676a687F0a93788B716BEff5': {
      name: 'DYDX',
      decimals: 18,
    },
    '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': {
      name: 'MKR',
      decimals: 18,
    },
    '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942': {
      name: 'MANA',
      decimals: 18,
    },
    '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9': {
      name: 'AAVE',
      decimals: 18,
    },
    '0xd1d2Eb1B1e90B638588728b4130137D262C87cae': {
      name: 'GALA',
      decimals: 8,
    },
    '0xD31a59c85aE9D8edEFeC411D448f90841571b89c': {
      name: 'SOL',
      decimals: 9,
    },
    '0xaea46A60368A7bD060eec7DF8CBa43b7EF41Ad85': {
      name: 'FET',
      decimals: 18,
    },
    '0xc221b7E65FfC80DE234bbB6667aBDd46593D34F0': {
      name: 'CFG',
      decimals: 18,
    },
    '0x64Bc2cA1Be492bE7185FAA2c8835d9b824c8a194': {
      name: 'BIGTIME',
      decimals: 18,
    },
    '0x9E32b13ce7f2E80A01932B42553652E053D6ed8e': {
      name: 'Metis',
      decimals: 18,
    },
    '0x6E2a43be0B1d33b726f0CA3b8de60b3482b8b050': {
      name: 'ARKM',
      decimals: 18,
    },
    '0x767FE9EDC9E0dF98E07454847909b5E959D7ca0E': {
      name: 'ILV',
      decimals: 18,
    },
    '0x0b38210ea11411557c13457D4dA7dC6ea731B88a': {
      name: 'API3',
      decimals: 18,
    },
    '0x5283D291DBCF85356A21bA090E6db59121208b44': {
      name: 'BLUR',
      decimals: 18,
    },
    '0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F': {
      name: 'GTC',
      decimals: 18,
    },
    '0xE41d2489571d322189246DaFA5ebDe1F4699F498': {
      name: 'ZRX',
      decimals: 18,
    },
  },
};
