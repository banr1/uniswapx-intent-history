'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';
import { formatTimestamp } from '@/utils';
import IntentTable from '@/components/IntentTable';

interface RawIntent {
  encodedOrder: string;
  chainId: number;
}

export default function Home() {
  const [intents, setIntents] = useState<DutchIntent[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatedAt, setUpdatedAt] = useState(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ orders: RawIntent[] }>(
          'https://api.uniswap.org/v2/orders?orderStatus=open&chainId=1&limit=5',
        );
        const decodedIntents = response.data.orders.map((order) =>
          DutchIntent.parse(order.encodedOrder, order.chainId),
        );
        setIntents(decodedIntents);
        setUpdatedAt(new Date());
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
    const interval = setInterval(fetchOrders, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className='text-center mt-8'>Loading...</div>;
  if (error) return <div className='text-center mt-8 text-red-500'>{error}</div>;

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>UniswapX API Watcher 🦄</h1>
      <div className='text-sm mb-2'>Updated at: {formatTimestamp(updatedAt)}</div>
      <h2 className='text-lg font-bold mb-2'>Open</h2>
      <IntentTable intents={intents} />
    </div>
  );
}
