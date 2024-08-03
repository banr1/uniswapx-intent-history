import { BigNumber } from '@ethersproject/bignumber';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { ERC20 } from '@/constants/erc20';
import { Address, ShortAddress } from '@/types/address';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numToDate = (num: number): Date => new Date(num * 1000);

export const formatTimestamp = (date: Date): string => {
  if (!date) return 'N/A';
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

export const shortenAddress = (address: Address): ShortAddress => `${address.slice(0, 6)} ... ${address.slice(-4)}`;

export const formatTokenAmount = (amount: BigNumber, address: Address): number => {
  return ERC20[1][address] ? amount.div(ERC20[1][address].decimals).toNumber() : 0;
};
