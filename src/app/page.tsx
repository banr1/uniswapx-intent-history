// app/page.tsx

'use client';

import { useState } from 'react';

import { EtherscanLink } from '@/components/etherscan-link';
import FilledIntentTable from '@/components/table/filled-intent-table';
import { UNISWAP_FEE_ADDRESSES } from '@/constants/uniswap-fee-addresses';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

export default function Home() {
  const [chainId, setChainId] = useState<ChainId>(42161);
  const reactorAddress = UNISWAP_REACTOR_ADDRESSES[chainId];
  const feeAddresses = UNISWAP_FEE_ADDRESSES[chainId];

  return (
    <div className='mx-2 p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX Intent History 🦄 (Arbitrum)</h1>
      <div className='flex items-center gap-2 text-sm mb-1'>
        <p>Reactor contract:</p>
        <EtherscanLink value={reactorAddress} chainId={chainId} category='address'>
          {shortenHash(reactorAddress)}
        </EtherscanLink>
      </div>
      <div className='flex items-center gap-2 text-sm mb-3'>
        <p>Fee recipient addresses:</p>
        <EtherscanLink value={feeAddresses[0]} chainId={chainId} category='address'>
          {shortenHash(feeAddresses[0])}
        </EtherscanLink>
        <div>, </div>
        <EtherscanLink value={feeAddresses[1]} chainId={chainId} category='address'>
          {shortenHash(feeAddresses[1])}
        </EtherscanLink>
      </div>
      <h2 className='text-lg font-bold mb-2'>Recent History</h2>
      <FilledIntentTable status={'filled'} chainId={chainId} interval={60_000} />
    </div>
  );
}
