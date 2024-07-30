export type EtherscanCategory = 'address' | 'tx' | 'block' | 'token' | 'ens' | 'event' | 'search';

export const EtherscanLink = (props: { name: string; address: string; category: EtherscanCategory }) => {
  return (
    <a
      className='hover:underline underline-offset-auto'
      href={`https://etherscan.io/${props.category}/${props.address}`}
    >
      {props.name}
    </a>
  );
};
