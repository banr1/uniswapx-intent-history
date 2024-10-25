// components/hash-cell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { shortenHash } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { Hash, HashCategory } from '@/types/hash';

import TenderlyLink from '../tenderly-link';

export default function HashCell(props: { value: Hash | null; chainId: ChainId; category: HashCategory }): JSX.Element {
  const { value, chainId, category } = props;

  if (!value) {
    return <TableCell className='text-xs'>-</TableCell>;
  }

  const valueToShow = shortenHash(value);

  return (
    <TableCell className='text-xs'>
      <TenderlyLink value={value} chainId={chainId} category={category}>
        {valueToShow}
      </TenderlyLink>
    </TableCell>
  );
}
