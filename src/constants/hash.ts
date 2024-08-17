// constants/hash.ts

import { ChainId } from '@/types/chain-id';
import { Address } from '@/types/hash';

export const HASH: Record<ChainId, Record<Address, { name: string }>> = {
  1: {
    '0x6000da47483062A0D734Ba3dc7576Ce6A0B645C4': {
      name: 'Exclusive Dutch Order Reactor', // V1
    },
    '0x00000011F84B9aa48e5f8aA8B9897600006289Be': {
      name: 'Dutch Order Reactor', // V2
    },
  },
  42161: {},
};
