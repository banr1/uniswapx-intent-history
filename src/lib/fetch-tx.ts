import { ethers } from 'ethers';

import { ChainId } from '@/types/chain-id';

import getProvider from './get-alchemy-url';

export default async function fetchTx(txHash: string, chainId: ChainId): Promise<ethers.providers.TransactionResponse> {
  const provider = getProvider(chainId);

  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      throw new Error('Transaction not found');
    }

    return tx;
  } catch (error) {
    console.error('Error fetching transaction:', error);
    throw error;
  }
}
