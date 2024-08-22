// lib/get-alchemy-url.ts

export default function getAlchemyUrl(chainId: number): string {
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

  return alchemyUrl;
}
