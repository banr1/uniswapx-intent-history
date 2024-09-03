// lib/get-provider.ts

import { ethers } from 'ethers';

export default function getProvider(chainId: number): ethers.providers.JsonRpcProvider {
  const alchemyApiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
  const alchemyUrl =
    chainId === 1
      ? `https://eth-mainnet.alchemyapi.io/v2/${alchemyApiKey}`
      : chainId === 42161
        ? `https://arb-mainnet.alchemyapi.io/v2/${alchemyApiKey}`
        : undefined;

  if (!alchemyUrl) {
    throw new Error(`Unknown chain ID: ${chainId}`);
  }

  const infuraApiKey = process.env.NEXT_PUBLIC_INFURA_API_KEY;
  const infuraUrl =
    chainId === 1
      ? `https://mainnet.infura.io/v3/${infuraApiKey}`
      : chainId === 42161
        ? `https://arbitrum-mainnet.infura.io/v3/${infuraApiKey}`
        : undefined;

  if (!infuraUrl) {
    throw new Error(`Unknown chain ID: ${chainId}`);
  }

  const randomizedUrl = alchemyUrl;

  const provider = new ethers.providers.JsonRpcProvider(randomizedUrl);

  return provider;
}
