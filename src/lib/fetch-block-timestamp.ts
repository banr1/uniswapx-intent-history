// lib/fetch-block-timestamp.ts

import { ethers } from 'ethers';

import { ChainId } from '@/types/chain-id';

import getProvider from './get-provider';

export default async function fetchBlockTimestamp(
  txReceipt: ethers.providers.TransactionReceipt,
  chainId: ChainId,
): Promise<number> {
  const provider = getProvider(chainId);

  const block = await provider.getBlock(txReceipt.blockNumber);
  return block.timestamp;
}
