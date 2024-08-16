import { ethers } from 'ethers';

export default async function fetchTxTime(txHash: string): Promise<number | undefined> {
  const alchemyApiKey = process.env.ALCHEMY_API_KEY;
  const alchemyUrl = `https://eth-mainnet.g.alchemy.com/v2/${alchemyApiKey}`;

  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      throw new Error('Transaction not found');
    }

    return tx.timestamp;
  } catch (error) {
    console.error('Error fetching transaction time:', error);
    throw error;
  }
}
