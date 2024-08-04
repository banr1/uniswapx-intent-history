// components/hash-cell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { shortenHash } from '@/lib/utils';
import { Hash } from '@/types/hash';

import { EtherscanCategory, EtherscanLink } from './etherscan-link';

const HashCell = (props: { value: Hash; category: EtherscanCategory | 'none' }) => {
  return (
    <TableCell className='text-xs'>
      {props.category !== 'none' ? (
        <EtherscanLink value={props.value} category={props.category}>
          {shortenHash(props.value)}
        </EtherscanLink>
      ) : (
        shortenHash(props.value)
      )}
    </TableCell>
  );
};

export default HashCell;
