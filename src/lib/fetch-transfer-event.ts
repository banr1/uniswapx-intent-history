// lib/fetch-transfer-event.ts

import { ethers } from 'ethers';
import { LogDescription } from 'ethers/lib/utils';

import { ERC20_ABI } from '@/constants/erc20-abi';
import { ChainId } from '@/types/chain-id';
import { Address, ContractAddress } from '@/types/hash';

import getProvider from './get-provider';

export default async function fetchTransferEvent(
  txReceipt: ethers.providers.TransactionReceipt,
  token: ContractAddress,
  from: Address,
  to: Address,
  chainId: ChainId,
): Promise<LogDescription | undefined> {
  const provider = getProvider(chainId);
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

    const transferEvents = logs.filter(
      (log) => log && log.name === 'Transfer' && log.args.from === from && log.args.to === to,
    );

    // The Fill event should be unique
    if (transferEvents.length === 0) {
      throw new Error('No Fill events found');
    } else if (transferEvents.length >= 2) {
      throw new Error('Multiple Fill events found');
    }

    return transferEvents[0];
  } catch (error) {
    console.error(error);
    return;
  }
}
