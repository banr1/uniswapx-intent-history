// lib/fetch-transfer-event.ts

import { ethers } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';

import { ERC20_ABI } from '@/constants/erc20-abi';
import { ChainId } from '@/types/chain-id';

import getProvider from './get-provider';

export default async function fetchTransferEvents(
  txReceipt: ethers.providers.TransactionReceipt,
  chainId: ChainId,
): Promise<LogDescription[]> {
  const provider = getProvider(chainId);
  const token = '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'; // any token is fine
  const contract = new ethers.Contract(token, ERC20_ABI, provider);

  try {
    const logs = txReceipt.logs
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

    const transferEvents = logs.filter((log) => log && log.name === 'Transfer');

    // The Fill event should be unique
    if (transferEvents.length === 0) {
      throw new Error('No Transfer events found');
    }

    return transferEvents;
  } catch (error) {
    console.error(error);
    return [];
  }
}
