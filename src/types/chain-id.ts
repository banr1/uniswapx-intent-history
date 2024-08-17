// types/chain-id.ts

export type ChainId = 1 | 42161;

export const CHAIN_NAME: { [key in ChainId]: string } = {
  1: 'Ethereum',
  42161: 'Arbitrum',
};
