// app/page.tsx

'use client';

import { useState } from 'react';

import ChainSwitcher from '@/components/chain-switcher';
import FilledIntentTable from '@/components/table/filled-intent-table';
import OpenIntentTable from '@/components/table/open-intent-table';
import { ChainId } from '@/types/chain-id';

export default function Home() {
  const [chainId, setChainId] = useState<ChainId>(42161);

  const handleChainChange = (newChainId: ChainId) => {
    setChainId(newChainId);
  };

  return (
    <div className='mx-2 p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX API Watcher 🦄</h1>
      <ChainSwitcher chainId={chainId} onChainChange={handleChainChange} />
      <h2 className='text-lg font-bold mb-2'>Open</h2>
      <OpenIntentTable status={'open'} chainId={chainId} interval={5000} />
      <h2 className='text-lg font-bold mb-2'>Recent History</h2>
      <FilledIntentTable status={'filled'} chainId={chainId} interval={5000} />
    </div>
  );
}
