// components/intent-table-row.tsx

import HashCell from '@/components/cell/hash-cell';
import { TableRow, TableCell } from '@/components/ui/table';
import { formatTimestamp, numToDate } from '@/lib/utils';
import { ChainId } from '@/types/chain-id';
import { FilledCosignedV2DutchOrder } from '@/types/dutch-intent-v2';

import BidTimingCell from '../cell/bid-timing-cell';
import BinancePriceCell from '../cell/binance-price-cell';
import FeeCell from '../cell/fee-cell';
import PriceCell from '../cell/price-cell';
import SwapCell from '../cell/swap-cell';

interface IntentTableRowProps {
  intent: FilledCosignedV2DutchOrder;
  chainId: ChainId;
}

const IntentTableRow: React.FC<IntentTableRowProps> = ({ intent, chainId }) => {
  const { info, resultInfo } = intent;
  const { swapper, cosigner, input: auctionInput, outputs: auctionOutputs, cosignerData } = info;
  const { txHash, filler, input, outputToSwapper, outputToPayee, executedAt, liquiditySources } = resultInfo;

  return (
    <TableRow key={intent.hash()}>
      <HashCell value={txHash} chainId={chainId} category='tx' />
      <HashCell value={swapper} chainId={chainId} category='wallet' />
      <HashCell value={cosigner} chainId={chainId} category='wallet' />
      <HashCell value={filler} chainId={chainId} category='wallet' />
      <SwapCell
        input={input}
        outputs={outputToPayee ? [outputToSwapper, outputToPayee] : [outputToSwapper]}
        chainId={chainId}
      />
      <PriceCell
        input={input}
        outputs={outputToPayee ? [outputToSwapper, outputToPayee] : [outputToSwapper]}
        chainId={chainId}
      />
      <BinancePriceCell input={auctionInput} output={auctionOutputs[0]} executedAt={executedAt} chainId={chainId} />
      <BidTimingCell
        input={input}
        auctionInput={auctionInput}
        auctionInputOverride={cosignerData.inputOverride}
        outputs={outputToPayee ? [outputToSwapper, outputToPayee] : [outputToSwapper]}
        auctionOutputs={auctionOutputs}
        auctionOutputOverrides={cosignerData.outputOverrides}
        chainId={chainId}
      />
      <FeeCell auctionOutputs={auctionOutputs} chainId={chainId} />
      <TableCell>{liquiditySources.join(', ')}</TableCell>
      <TableCell className='text-xs'>{formatTimestamp(numToDate(intent.resultInfo.executedAt))}</TableCell>
    </TableRow>
  );
};

export default IntentTableRow;
