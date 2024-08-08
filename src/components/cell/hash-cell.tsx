// components/hash-cell.tsx

import React from 'react';

import { EtherscanCategory, EtherscanLink } from '@/components/etherscan-link';
import { TableCell } from '@/components/ui/table';
import { HASH } from '@/constants/hash';
import { shortenHash } from '@/lib/utils';
import { Hash } from '@/types/hash';

const HashCell = (props: { value: Hash | null; category: EtherscanCategory | 'none' }) => {
  const { value, category } = props;

  if (value === null) {
    return <TableCell>-</TableCell>;
  }

  if (HASH[1][value] !== undefined && category !== 'none') {
    return (
      <TableCell>
        <EtherscanLink value={value} category={category}>
          {HASH[1][value].name}
        </EtherscanLink>
      </TableCell>
    );
  }

  return (
    <TableCell className='text-xs'>
      {category !== 'none' ? (
        <EtherscanLink value={value} category={category}>
          {shortenHash(value)}
        </EtherscanLink>
      ) : (
        shortenHash(value)
      )}
    </TableCell>
  );
};

export default HashCell;
