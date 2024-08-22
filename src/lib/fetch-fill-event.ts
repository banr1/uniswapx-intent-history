import { ethers } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';

import { UNISWAP_REACTOR_ABI } from '@/constants/uniswap-reactor-abi';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-address';
import { ChainId } from '@/types/chain-id';
import { TxHash } from '@/types/hash';

import getAlchemyUrl from './get-alchemy-url';

export default async function fetchFillEvent(txHash: TxHash, chainId: ChainId): Promise<LogDescription | undefined> {
  const alchemyUrl = getAlchemyUrl(chainId);
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const contractAddress = UNISWAP_REACTOR_ADDRESSES[chainId];

  const contract = new ethers.Contract(contractAddress, UNISWAP_REACTOR_ABI, provider);

  try {
    // Get the transaction receipt
    const receipt = await provider.getTransactionReceipt(txHash);

    if (receipt) {
      const logs = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log);
          } catch (e) {
            return null;
          }
        })
        .filter((log) => log !== null);

      if (logs.length === 0) {
        throw new Error('No logs found');
      }

      const fillEvents = logs.filter((log) => log?.name === 'Fill');

      // The Fill event should be unique
      if (fillEvents.length === 0) {
        throw new Error('No Fill events found');
      } else if (fillEvents.length >= 2) {
        throw new Error('Multiple Fill events found');
      }

      return fillEvents[0];
    } else {
      throw new Error('No receipt found');
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
