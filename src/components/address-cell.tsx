// components/AddressCell.tsx

import React from 'react';

import { TableCell } from '@/components/ui/table';
import { shortenAddress } from '@/lib/utils';
import { Address } from '@/types/address';

import { EtherscanCategory, EtherscanLink } from './etherscan-link';

const AddressCell = (props: { address: Address; category: EtherscanCategory | 'none' }) => {
  return (
    <TableCell className='text-xs'>
      {props.category !== 'none' ? (
        <EtherscanLink address={props.address} category={props.category}>
          {shortenAddress(props.address)}
        </EtherscanLink>
      ) : (
        props.address
      )}
    </TableCell>
  );
};

export default AddressCell;
