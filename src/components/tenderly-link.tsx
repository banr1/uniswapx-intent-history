// components/tenderly-link.tsx
import { ChainId } from '@/types/chain-id';

export type TenderlyCategory = 'tx';

const CHAIN_NAME: Record<ChainId, string> = {
  1: 'ethereum',
  42161: 'arbitrum',
};

export const TenderlyLink = (props: {
  value: string;
  chainId: ChainId;
  category: TenderlyCategory;
  children: React.ReactNode;
}) => {
  // ex) https://dashboard.tenderly.co/tx/arbitrum/0xf2c8b8352a06dbf4ea7664ed6fbafb9c912cc955cb647d4d153824295ec3c201
  const { value, category, chainId } = props;

  const baseUrl = 'https://dashboard.tenderly.co';
  const chain = CHAIN_NAME[chainId];

  return (
    <div className='flex items-center'>
      <img src={'tenderly-logo.svg'} alt='Tenderly Logo' style={{ marginRight: '2px' }} width={12} height={12} />
      <a
        className='hover:underline underline-offset-auto'
        href={`${baseUrl}/${category}/${chain}/${value}`}
        target='_blank'
      >
        {props.children}
      </a>
    </div>
  );
};
