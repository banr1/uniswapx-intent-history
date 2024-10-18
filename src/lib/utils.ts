import { type ClassValue, clsx } from 'clsx';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { twMerge } from 'tailwind-merge';

import { Hash, ShortHash } from '@/types/hash';

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

export const shortenHash = (hash: Hash): ShortHash => `${hash.slice(0, 6)}...${hash.slice(-4)}`;

export const formatTokenAmount = (amount: BigNumber | number, decimals: number): string => {
  let amountStr = formatUnits(amount, decimals);
  // Floor to 4 decimal places
  const decimalIndex = amountStr.indexOf('.');
  if (decimalIndex !== -1) {
    amountStr = amountStr.slice(0, decimalIndex + 5);
  }
  // Remove trailing zeros
  if (decimalIndex !== -1) {
    let i = amountStr.length - 1;
    while (amountStr[i] === '0') {
      i -= 1;
    }
    amountStr = amountStr.slice(0, i + 1);
  }
  if (amountStr[amountStr.length - 1] === '.') {
    amountStr = amountStr.slice(0, -1);
  }
  return amountStr;
};

export const generalizedRound = (num: number, decimalPlaces: number): number => {
  const multiplier = 10 ** decimalPlaces;
  return Math.round(num * multiplier) / multiplier;
};
