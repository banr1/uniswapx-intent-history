import { type ClassValue, clsx } from 'clsx';
import Decimal from 'decimal.js';
import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { twMerge } from 'tailwind-merge';

import { SYMBOL_PRIORITY } from '@/components/cell/token-priority';
import { Hash, ShortHash } from '@/types/hash';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const numToDate = (num: number): Date => new Date(num * 1000);

export const formatTimestamp = (date: Date, onlyTime: boolean = false): string => {
  if (!date) return 'N/A';

  if (onlyTime) {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  }

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

export function bigNumberToDecimal(num: BigNumber, decimals: number): Decimal {
  return new Decimal(formatUnits(num, decimals));
}

export function decimalToShow(num: Decimal, significantDigits: number = 6): string {
  return num.toSignificantDigits(significantDigits, Decimal.ROUND_HALF_UP).toString();
}

export function orderTokenNames(head: string, tail: string): [string, string] {
  const headPriority = SYMBOL_PRIORITY.indexOf(head);
  const tailPriority = SYMBOL_PRIORITY.indexOf(tail);

  return headPriority > tailPriority ? [head, tail] : [tail, head];
}
