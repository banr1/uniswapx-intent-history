// app/page.tsx

'use client';

import { useState } from 'react';

import IntentTable from '@/components/intent-table';
import { formatTimestamp } from '@/lib/utils';

export default function Home() {
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const interval = 5000;

  setInterval(() => {
    setUpdatedAt(new Date());
  }, interval);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX API Watcher 🦄</h1>
      <div className='text-sm mb-2'>Updated at: {formatTimestamp(updatedAt)}</div>
      <h2 className='text-lg font-bold mb-2'>Open</h2>
      <IntentTable status={'open'} interval={interval} />
      <h2 className='text-lg font-bold mb-2'>History</h2>
      <IntentTable status={'filled'} interval={interval} />
      {/* <IntentTable status={'expired'} interval={interval} />
      <IntentTable status={'cancelled'} interval={interval} /> */}
    </div>
  );
}
