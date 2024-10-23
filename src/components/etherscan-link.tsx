// components/etherscan-link.tsx
import { ChainId } from '@/types/chain-id';

export type EtherscanCategory = 'address' | 'tx' | 'block' | 'token' | 'ens' | 'event' | 'search';

const BASE_URLS: Record<ChainId, string> = {
  1: 'https://etherscan.io',
  42161: 'https://arbiscan.io',
};

export const EtherscanLink = (props: {
  value: string;
  chainId: ChainId;
  category: EtherscanCategory;
  children: React.ReactNode;
}) => {
  const { value, category, chainId } = props;
  const baseUrl = BASE_URLS[chainId];

  return (
    <div className='flex items-center'>
      <img src={'arbitrum-logo.svg'} alt='Arbiscan Logo' style={{ marginRight: '2px' }} width={12} height={12} />
      <a className='hover:underline underline-offset-auto' href={`${baseUrl}/${category}/${value}`} target='_blank'>
        {props.children}
      </a>
    </div>
  );
};
