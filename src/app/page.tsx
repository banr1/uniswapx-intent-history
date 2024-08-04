// app/page.tsx

'use client';

import FilledIntentTable from '@/components/filled-intent-table';
import OpenIntentTable from '@/components/open-intent-table';

export default function Home() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX API Watcher 🦄</h1>
      {/* <div className='text-sm mb-2'>Updated at: {formatTimestamp(updatedAt)}</div> */}
      <h2 className='text-lg font-bold mb-2'>Open</h2>
      <OpenIntentTable status={'open'} interval={10000} />
      <h2 className='text-lg font-bold mb-2'>Recent History</h2>
      <FilledIntentTable status={'filled'} interval={60000} />
    </div>
  );
}
