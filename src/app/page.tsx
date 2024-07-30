'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Order {
  orderHash: string;
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get<{ orders: Order[] }>(
          'https://api.uniswap.org/v2/orders?orderStatus=open&chainId=1&limit=10',
        );
        setOrders(response.data.orders);
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
      <h1 className='text-2xl font-bold mb-4'>UniswapX Orders</h1>
      <ul className='space-y-2'>
        {orders.map((order) => (
          <li key={order.orderHash} className='bg-gray-100 p-2 rounded'>
            Order orderHash: {order.orderHash}
          </li>
        ))}
      </ul>
    </div>
  );
}
