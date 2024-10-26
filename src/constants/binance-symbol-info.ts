// constants/binance-symbol-info.ts

import Decimal from 'decimal.js';

export const BINANCE_SYMBOL_INFO: Record<string, { spread: Decimal; precision: Decimal }> = {
  'ETH/USDT': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'ETH/USDC': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'ETH/BTC': {
    spread: new Decimal(0.00001),
    precision: new Decimal(0.00001),
  },
  'BTC/USDT': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'BTC/USDC': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'ARB/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'ARB/USDC': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'ARB/BTC': {
    spread: new Decimal(0.00000001),
    precision: new Decimal(0.00000001),
  },
  'ARB/ETH': {
    spread: new Decimal(0.0000002),
    precision: new Decimal(0.0000001),
  },
  'USDC/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'USDT/DAI': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'LINK/USDT': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'LINK/USDC': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'LINK/BTC': {
    spread: new Decimal(0.0000001),
    precision: new Decimal(0.0000001),
  },
  'LINK/ETH': {
    spread: new Decimal(0.000006),
    precision: new Decimal(0.000001),
  },
  'UNI/USDT': {
    spread: new Decimal(0.001),
    precision: new Decimal(0.001),
  },
  'UNI/USDC': {
    spread: new Decimal(0.006),
    precision: new Decimal(0.001),
  },
  'UNI/BTC': {
    spread: new Decimal(0.0000001),
    precision: new Decimal(0.0000001),
  },
  'UNI/ETH': {
    spread: new Decimal(0.000006),
    precision: new Decimal(0.000001),
  },
  'CRV/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'CRV/USDC': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'CRV/BTC': {
    spread: new Decimal(0.00000001),
    precision: new Decimal(0.00000001),
  },
  'LDO/USDT': {
    spread: new Decimal(0.001),
    precision: new Decimal(0.001),
  },
  'LDO/USDC': {
    spread: new Decimal(0.001),
    precision: new Decimal(0.001),
  },
  'LDO/BTC': {
    spread: new Decimal(0.00000002),
    precision: new Decimal(0.00000001),
  },
  'POL/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'POL/USDC': {
    spread: new Decimal(0.0004),
    precision: new Decimal(0.0001),
  },
  'POL/BTC': {
    spread: new Decimal(0.00000002),
    precision: new Decimal(0.00000001),
  },
  'POL/ETH': {
    spread: new Decimal(0.0000008),
    precision: new Decimal(0.0000001),
  },
  'AAVE/USDT': {
    spread: new Decimal(0.02),
    precision: new Decimal(0.01),
  },
  'AAVE/USDC': {
    spread: new Decimal(0.02),
    precision: new Decimal(0.01),
  },
  'AAVE/BTC': {
    spread: new Decimal(0.000002),
    precision: new Decimal(0.000001),
  },
  'AAVE/ETH': {
    spread: new Decimal(0.0012),
    precision: new Decimal(0.00001),
  },
  'LPT/USDT': {
    spread: new Decimal(0.006),
    precision: new Decimal(0.001),
  },
  'LPT/BTC': {
    spread: new Decimal(0.0000003),
    precision: new Decimal(0.0000001),
  },
  'ENS/USDT': {
    spread: new Decimal(0.01),
    precision: new Decimal(0.01),
  },
  'ENS/USDC': {
    spread: new Decimal(0.04),
    precision: new Decimal(0.01),
  },
  'ENS/BTC': {
    spread: new Decimal(0.0000002),
    precision: new Decimal(0.0000001),
  },
  '1INCH/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  '1INCH/BTC': {
    spread: new Decimal(0.00000001),
    precision: new Decimal(0.00000001),
  },
  'COMP/USDT': {
    spread: new Decimal(0.02),
    precision: new Decimal(0.01),
  },
  'COMP/BTC': {
    spread: new Decimal(0.000002),
    precision: new Decimal(0.000001),
  },
  'GRT/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'GRT/BTC': {
    spread: new Decimal(0.00000001),
    precision: new Decimal(0.00000001),
  },
  'GRT/ETH': {
    spread: new Decimal(0.00000014),
    precision: new Decimal(0.00000001),
  },
  'AXL/USDT': {
    spread: new Decimal(0.0001),
    precision: new Decimal(0.0001),
  },
  'AXL/BTC': {
    spread: new Decimal(0.00000002),
    precision: new Decimal(0.00000001),
  },
  'ZRO/USDT': {
    spread: new Decimal(0.001),
    precision: new Decimal(0.001),
  },
  'ZRO/USDC': {
    spread: new Decimal(0.002),
    precision: new Decimal(0.001),
  },
  'ZRO/BTC': {
    spread: new Decimal(0.00000003),
    precision: new Decimal(0.00000001),
  },
};
