// components/chain-switcher.tsx

import { ChainId, CHAIN_NAMES } from '@/types/chain-id';

interface ChainSwitcherProps {
  chainId: ChainId;
  onChainChange: (chainId: ChainId) => void;
}

const ChainSwitcher: React.FC<ChainSwitcherProps> = ({ chainId, onChainChange }) => {
  return (
    <div className='mb-4'>
      <label htmlFor='chain-select' className='mr-2 font-bold'>
        Select Chain:
      </label>
      <select
        id='chain-select'
        value={chainId}
        onChange={(e) => onChainChange(Number(e.target.value) as ChainId)}
        className='p-2 border rounded'
      >
        {Object.entries(CHAIN_NAMES).map(([id, name]) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSwitcher;
