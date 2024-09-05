// lib/fetch-fill-event.ts

import { ethers } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';

import { UNISWAP_REACTOR_ABI } from '@/constants/uniswap-reactor-abi';
import { UNISWAP_REACTOR_ADDRESSES } from '@/constants/uniswap-reactor-addresses';
import { ChainId } from '@/types/chain-id';

import getProvider from './get-provider';

export default async function fetchFillEvent(
  txReceipt: ethers.providers.TransactionReceipt,
  chainId: ChainId,
): Promise<LogDescription | undefined> {
  const provider = getProvider(chainId);
  const contractAddress = UNISWAP_REACTOR_ADDRESSES[chainId];

  const contract = new ethers.Contract(contractAddress, UNISWAP_REACTOR_ABI, provider);

  try {
    const fillEvents = txReceipt.logs
      .map((log) => {
        try {
          return contract.interface.parseLog(log);
        } catch (e) {
          return null;
        }
      })
      .filter((log) => log !== null)
      .filter((log) => log.name === 'Fill');

    // The Fill event should be unique
    if (fillEvents.length === 0) {
      throw new Error('No Fill events found');
    } else if (fillEvents.length >= 2) {
      throw new Error('Multiple Fill events found');
    }

    return fillEvents[0];
  } catch (error) {
    console.error(error);
    return;
  }
}
