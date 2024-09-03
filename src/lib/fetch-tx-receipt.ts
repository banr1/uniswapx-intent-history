// lib/fetch-tx-receipt.ts

import { ethers } from 'ethers';

import { ChainId } from '@/types/chain-id';
import { TxHash } from '@/types/hash';

import getProvider from './get-provider';

export default async function fetchTxReceipt(
  txHash: TxHash,
  chainId: ChainId,
): Promise<ethers.providers.TransactionReceipt> {
  const provider = getProvider(chainId);
  const txReceipt = await provider.getTransactionReceipt(txHash);

  if (!txReceipt) {
    throw new Error(`Transaction receipt not found: ${txHash}`);
  }

  return txReceipt;
}
