// components/hash-cell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { Hash, HashCategory } from '@/types/hash';

import { TenderlyLink } from '../tenderly-link';

const HashCell = (props: { value: Hash | null; chainId: ChainId; category: HashCategory }) => {
  const { value, chainId, category } = props;

  if (value === null) {
    return <TableCell>-</TableCell>;
  }

  return (
    <TableCell className='text-xs'>
      <TenderlyLink value={value} chainId={chainId} category={category}>
        {shortenHash(value)}
      </TenderlyLink>
    </TableCell>
  );
};

export default HashCell;
