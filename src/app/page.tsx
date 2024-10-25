// app/page.tsx

'use client';

import { OrderType } from '@uniswap/uniswapx-sdk';
import { useState } from 'react';

import FilledTable from '@/components/table/filled-table';
import TenderlyLink from '@/components/tenderly-link';
import { UNISWAP_FEE_PAYEE_ADDRESSES } from '@/constants/uniswap-fee-payee-addresses';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';

export default function Home() {
  const [chainId, setChainId] = useState<ChainId>(42161);
  const reactorAddress = UNISWAP_REACTOR_ADDRESSES[chainId];
  const feePayeeAddresses = UNISWAP_FEE_PAYEE_ADDRESSES[chainId];

  return (
    <div className='mx-2 p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX Intent History 🦄 (Arbitrum)</h1>
      <div className='flex items-center gap-2 text-sm mb-1'>
        <p>Reactor contract:</p>
        <TenderlyLink value={reactorAddress} chainId={chainId} category='contract'>
          {shortenHash(reactorAddress)}
        </TenderlyLink>
      </div>
      <div className='flex items-center gap-2 text-sm mb-3'>
        <p>Fee recipient addresses:</p>
        <TenderlyLink value={feePayeeAddresses[0]} chainId={chainId} category='wallet'>
          {shortenHash(feePayeeAddresses[0])}
        </TenderlyLink>
        <div>, </div>
        <TenderlyLink value={feePayeeAddresses[1]} chainId={chainId} category='wallet'>
          {shortenHash(feePayeeAddresses[1])}
        </TenderlyLink>
      </div>
      <FilledTable intentType={OrderType.Dutch_V2} chainId={chainId} interval={60_000} />
    </div>
  );
}
