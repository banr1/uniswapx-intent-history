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
  const baseUrl = BASE_URLS[props.chainId];

  return (
    <a
      className='hover:underline underline-offset-auto'
      href={`${baseUrl}/${props.category}/${props.value}`}
      target='_blank'
    >
      {props.children}
    </a>
  );
};
