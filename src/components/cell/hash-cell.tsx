// components/hash-cell.tsx

import React from 'react';

import { EtherscanCategory, EtherscanLink } from '@/components/etherscan-link';
import { TableCell } from '@/components/ui/table';
import { HASH } from '@/constants/hash';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { Hash } from '@/types/hash';

import { TenderlyLink } from '../tenderly-link';

const HashCell = (props: { value: Hash | null; chainId: ChainId; category: EtherscanCategory | 'none' }) => {
  const { value, chainId, category } = props;

  if (value === null) {
    return <TableCell>-</TableCell>;
  }

  if (HASH[chainId][value] !== undefined && category !== 'none') {
    return (
      <TableCell>
        <EtherscanLink value={value} chainId={chainId} category={category}>
          {HASH[chainId][value].name}
        </EtherscanLink>
      </TableCell>
    );
  }

  if (category === 'tx') {
    return (
      <TableCell className='text-xs'>
        <TenderlyLink value={value} chainId={chainId} category={category}>
          {shortenHash(value)}
        </TenderlyLink>
      </TableCell>
    );
  }

  return (
    <TableCell className='text-xs'>
      {category !== 'none' ? (
        <EtherscanLink value={value} chainId={chainId} category={category}>
          {shortenHash(value)}
        </EtherscanLink>
      ) : (
        shortenHash(value)
      )}
    </TableCell>
  );
};

export default HashCell;
