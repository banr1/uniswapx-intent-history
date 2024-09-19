// app/page.tsx

'use client';

import { useState } from 'react';

import { EtherscanLink } from '@/components/etherscan-link';
import FilledIntentTable from '@/components/table/filled-intent-table';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

export default function Home() {
  const [chainId, setChainId] = useState<ChainId>(42161);

  return (
    <div className='mx-2 p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX API Watcher 🦄 (Arbitrum)</h1>
      <p className='text-sm mb-3'>
        Reactor contract:{' '}
        <EtherscanLink value='0x1bd1aAdc9E230626C44a139d7E70d842749351eb' chainId={chainId} category='address'>
          {shortenHash('0x1bd1aAdc9E230626C44a139d7E70d842749351eb')}
        </EtherscanLink>
      </p>
      <h2 className='text-lg font-bold mb-2'>Recent History</h2>
      <FilledIntentTable status={'filled'} chainId={chainId} interval={60_000} />
    </div>
  );
}
