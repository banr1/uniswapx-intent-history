// components/intent-table-head.tsx

import { TableHead, TableRow } from '../ui/table';

const IntentTableHead = (): JSX.Element => {
  return (
    <TableRow>
      <TableHead className='w-auto'>Tx Hash</TableHead>
      <TableHead className='w-auto'>Swapper</TableHead>
      <TableHead className='w-auto'>Cosigner</TableHead>
      <TableHead className='w-auto'>Filler</TableHead>
      <TableHead className='w-auto'>Swap</TableHead>
      <TableHead className='w-auto'>Price</TableHead>
      <TableHead className='w-auto'>
        Price <span className='text-xs'>(Binance)</span>
      </TableHead>
      {/* <TableHead className='w-auto'>Price Gap</TableHead> */}
      <TableHead className='w-auto'>Reasonable Index</TableHead>
      <TableHead className='w-auto'>Bid Timing</TableHead>
      <TableHead className='w-auto'>Fee</TableHead>
      <TableHead className='w-auto'>Liquidity Source</TableHead>
      <TableHead className='w-auto'>Executed Time</TableHead>
    </TableRow>
  );
};

export default IntentTableHead;
