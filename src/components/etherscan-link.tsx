export type EtherscanCategory = 'address' | 'tx' | 'block' | 'token' | 'ens' | 'event' | 'search';

export const EtherscanLink = (props: { value: string; category: EtherscanCategory; children: React.ReactNode }) => {
  return (
    <a
      className='hover:underline underline-offset-auto'
      href={`https://etherscan.io/${props.category}/${props.value}`}
      target='_blank'
    >
      {props.children}
    </a>
  );
};
