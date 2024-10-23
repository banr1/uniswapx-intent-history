// components/hash-cell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { HashCategory } from '@/constants/hash';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { Hash } from '@/types/hash';

import { TenderlyLink } from '../tenderly-link';

const HashCell = (props: { value: Hash | null; chainId: ChainId; category: HashCategory | 'none' }) => {
  const { value, chainId, category } = props;

  if (value === null) {
    return <TableCell>-</TableCell>;
  }

  return (
    <TableCell className='text-xs'>
      {category !== 'none' ? (
        <TenderlyLink value={value} chainId={chainId} category={category}>
          {shortenHash(value)}
        </TenderlyLink>
      ) : (
        shortenHash(value)
      )}
    </TableCell>
  );
};

export default HashCell;
