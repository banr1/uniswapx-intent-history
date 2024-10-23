// components/etherscan-link.tsx

import { ChainId } from '@/types/chain-id';
import { HashCategory } from '@/types/hash';

type EtherscanCategory = 'address' | 'tx';

const BASE_URLS: Record<ChainId, string> = {
  1: 'https://etherscan.io',
  42161: 'https://arbiscan.io',
};

export const EtherscanLink = (props: {
  value: string;
  chainId: ChainId;
  category: HashCategory;
  children: React.ReactNode;
}) => {
  const { value, category, chainId } = props;
  const etherscanCategory: EtherscanCategory = ['wallet', 'contract'].includes(category)
    ? 'address'
    : (category as 'tx');

  const baseUrl = BASE_URLS[chainId];
  const url = `${baseUrl}/${etherscanCategory}/${value}`;

  return (
    <div className='flex items-center'>
      <img src={'arbitrum-logo.svg'} alt='Arbiscan Logo' style={{ marginRight: '2px' }} width={12} height={12} />
      <a className='hover:underline underline-offset-auto' href={url} target='_blank'>
        {props.children}
      </a>
    </div>
  );
};
