// components/intent-order-form.tsx

import React, { useState } from 'react';
import { z } from 'zod';

import { ChainId } from '@/types/chain-id';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const formSchema = z.object({
  inputToken: z.string(),
  inputAmount: z.number(),
  outputToken: z.string(),
  outputStartAmount: z.number(),
  outputEndAmount: z.number(),
});

const IntentOrderForm = (props: { chainId: ChainId }) => {
  const { chainId } = props;

  const [inputToken, setInputToken] = useState('ETH');
  const [inputAmount, setInputAmount] = useState(0.1);
  const [outputToken, setOutputToken] = useState('USDC');
  const [outputStartAmount, setOutputStartAmount] = useState(200);
  const [outputEndAmount, setOutputEndAmount] = useState(100);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className='flex flex-row gap-2 items-center'>
      <Input
        className='w-24 text-right'
        placeholder='100'
        type='number'
        value={inputAmount}
        onChange={(e) => setInputAmount(Number(e.target.value))}
      />
      <Select onValueChange={setInputToken}>
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
        <Input
          className='w-24 text-right'
          placeholder='50'
          value={outputStartAmount}
          onChange={(e) => setOutputStartAmount(Number(e.target.value))}
        />
        <div>{'~'}</div>
        <Input
          className='w-24 text-right'
          placeholder='10'
          value={outputEndAmount}
          onChange={(e) => setOutputEndAmount(Number(e.target.value))}
        />
      </div>
      <Select onValueChange={setOutputToken}>
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
        className='rounded-2xl drop-shadow-md font-bold text-md'
        onClick={() =>
          onSubmit({
            inputToken,
            inputAmount,
            outputToken,
            outputStartAmount,
            outputEndAmount,
          })
        }
      >
        Submit
      </Button>
    </div>
  );
};

export default IntentOrderForm;
