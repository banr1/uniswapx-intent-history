// components/intent-order-form.tsx

import React from 'react';
import { z } from 'zod';

import { ChainId } from '@/types/chain-id';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  inputToken: z.enum(['ETH', 'USDC', 'USDT', 'DAI']),
  inputAmount: z.number(),
  outputToken: z.enum(['ETH', 'USDC', 'USDT', 'DAI']),
  outputStartAmount: z.number(),
  outputEndAmount: z.number(),
});

const IntentOrderForm = (props: { chainId: ChainId }) => {
  const { chainId } = props;

  const [inputToken, setInputToken] = React.useState('ETH');
  const [inputAmount, setInputAmount] = React.useState(0.1);
  const [outputToken, setOutputToken] = React.useState('USDC');
  const [outputStartAmount, setOutputStartAmount] = React.useState(200);
  const [outputEndAmount, setOutputEndAmount] = React.useState(100);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='flex flex-row gap-2 items-center'>
      <Input className='w-24 text-right' placeholder='100' type='number' />
      <Select>
        <SelectTrigger className='w-18'>
          <SelectValue placeholder='Token' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='ETH'>ETH</SelectItem>
          <SelectItem value='USDC'>USDC</SelectItem>
          <SelectItem value='USDT'>USDT</SelectItem>
          <SelectItem value='DAI'>DAI</SelectItem>
        </SelectContent>
      </Select>
      <div>{'->'}</div>
      <div className='flex flex-row gap-1 items-center'>
        <Input className='w-24 text-right' placeholder='50' />
        <div>{'~'}</div>
        <Input className='w-24 text-right' placeholder='10' />
      </div>
      <Select>
        <SelectTrigger className='w-18'>
          <SelectValue placeholder='Token' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='ETH'>ETH</SelectItem>
          <SelectItem value='USDC'>USDC</SelectItem>
          <SelectItem value='USDT'>USDT</SelectItem>
          <SelectItem value='DAI'>DAI</SelectItem>
        </SelectContent>
      </Select>
      <Button
        onClick={() =>
          onSubmit({
            inputToken: 'ETH',
            inputAmount: 0.1,
            outputToken: 'USDC',
            outputStartAmount: 200,
            outputEndAmount: 100,
          })
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default IntentOrderForm;
