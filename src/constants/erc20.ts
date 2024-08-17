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
    '0xB8c77482e45F1F44dE1745F52C74426C631bDD52': {
      name: 'BNB',
      decimals: 18,
    },
    '0x628F76eAB0C1298F7a24d337bBbF1ef8A1Ea6A24': {
      name: 'XRP',
      decimals: 18,
    },
    '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84': {
      name: 'stETH',
      decimals: 18,
    },
    '0x582d872A1B094FC48F5DE31D3B73F2D9bE47def1': {
      name: 'TONCOIN',
      decimals: 9,
    },
    '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0': {
      name: 'wstETH',
      decimals: 18,
    },
    '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE': {
      name: 'SHIB',
      decimals: 18,
    },
    '0xC47ef9B19c3e29317a50F5fBE594EbA361dadA4A': {
      name: 'EDLC',
      decimals: 6,
    },
    '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3': {
      name: 'LEO',
      decimals: 18,
    },
    '0x85F17Cf997934a597031b2E18a9aB6ebD4B9f6a4': {
      name: 'NEAR',
      decimals: 24,
    },
  },
  42161: {
    '0x912CE59144191C1204E64559FE8253a0e49E6548': {
      name: 'ARB',
      decimals: 18,
    },
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1': {
      name: 'WETH',
      decimals: 18,
    },
    '0xaf88d065e77c8cC2239327C5EDb3A432268e5831': {
      name: 'USDC',
      decimals: 6,
    },
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9': {
      name: 'USDT',
      decimals: 6,
    },
    '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1': {
      name: 'DAI',
      decimals: 18,
    },
    '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f': {
      name: 'WBTC',
      decimals: 18,
    },
    '0xf97f4df75117a78c1A5a0DBb814Af92458539FB4': {
      name: 'LINK',
      decimals: 18,
    },
    '0x2C650dAb03A59332e2E0C0C4A7F726913e5028C1': {
      name: 'TAP',
      decimals: 18,
    },
    '0x5979D7b546E38E414F7E9822514be443A4800529': {
      name: 'wstETH',
      decimals: 18,
    },
    '0x0c880f6761F1af8d9Aa9C466984b80DAb9a8c9e8': {
      name: 'PENDLE',
      decimals: 18,
    },
    '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a': {
      name: 'GMX',
      decimals: 18,
    },
    '0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0': {
      name: 'UNI',
      decimals: 18,
    },
    '0x25d887Ce7a35172C62FeBFD67a1856F20FaEbB00': {
      name: 'PEPE',
      decimals: 18,
    },
    '0x9623063377AD1B27544C965cCd7342f7EA7e88C7': {
      name: 'GRT',
      decimals: 18,
    },
    '0x2416092f143378750bb29b79eD961ab195CcEea5': {
      name: 'ezETH',
      decimals: 18,
    },
    '0xE4D5c6aE46ADFAF04313081e8C0052A30b6Dd724': {
      name: 'PYTH',
      decimals: 6,
    },
    '0x13Ad51ed4F1B7e9Dc168d8a00cB3f4dDD85EfA60': {
      name: 'LDO',
      decimals: 18,
    },
    '0x35751007a407ca6FEFfE80b3cB397736D2cf4dbe': {
      name: 'weETH',
      decimals: 18,
    },
    '0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F': {
      name: 'FRAX',
      decimals: 18,
    },
    '0xB0fFa8000886e57F86dd5264b9582b2Ad87b2b91': {
      name: 'W',
      decimals: 18,
    },
    '0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07': {
      name: 'TUSD',
      decimals: 18,
    },
    '0x178412e79c25968a32e89b11f63B33F733770c2A': {
      name: 'frxETH',
      decimals: 18,
    },
    '0xa0b862F60edEf4452F25B4160F177db44DeB6Cf1': {
      name: 'GNO',
      decimals: 18,
    },
    '0x1A4dA80967373fd929961e976b4b53ceeC063a15': {
      name: 'LUNC',
      decimals: 6,
    },
    '0x23ee2343B892b1BB63503a4FAbc840E0e2C6810f': {
      name: 'AXL',
      decimals: 6,
    },
    '0x95aB45875cFFdba1E5f451B950bC2E42c0053f39': {
      name: 'srfxETH',
      decimals: 18,
    },
    '0x6985884C4392D348587B19cb9eAAf157F13271cd': {
      name: 'ZRO',
      decimals: 18,
    },
    '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978': {
      name: 'CRV',
      decimals: 18,
    },
    '0x289ba1701C2F088cf0faf8B3705246331cB8A839': {
      name: 'LPT',
      decimals: 18,
    },
    '0x354A6dA3fcde098F8389cad84b0182725c6C91dE': {
      name: 'COMP',
      decimals: 18,
    },
    '0x35e050d3C0eC2d29D269a8EcEa763a183bDF9A9D': {
      name: 'USDY',
      decimals: 18,
    },
    '0x6314C31A7a1652cE482cffe247E9CB7c3f4BB9aF': {
      name: '1INCH',
      decimals: 18,
    },
  },
};
