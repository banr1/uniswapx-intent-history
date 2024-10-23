// constants/uniswap-fee-addresses.ts

import { ChainId } from '@/types/chain-id';
import { Address } from '@/types/hash';

export const UNISWAP_FEE_PAYEE_ADDRESSES: Record<ChainId, Address[]> = {
  1: [],
  42161: ['0x89F30783108E2F9191Db4A44aE2A516327C99575', '0x7FFC3DBF3B2b50Ff3A1D5523bc24Bb5043837B14'],
};
