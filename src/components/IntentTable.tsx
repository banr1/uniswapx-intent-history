import { formatTimestamp, numToDate } from '@/utils';
import { DutchOrder as DutchIntent } from '@uniswap/uniswapx-sdk';

export default function IntentTable(props: { intents: DutchIntent[] }): JSX.Element {
  return (
    <table className='w-full border-collapse'>
      <thead>
        <tr className='bg-gray-200'>
          <th className='border p-2 text-left'>Order Hash</th>
          <th className='border p-2 text-left'>Decay Start Time</th>
          <th className='border p-2 text-left'>Decay End Time</th>
        </tr>
      </thead>
      <tbody>
        {props.intents.map((intent) => (
          <tr key={intent.hash()} className='bg-gray-100 hover:bg-gray-200'>
            <td className='border p-2'>{intent.hash()}</td>
            <td className='border p-2'>{formatTimestamp(numToDate(intent.info.decayStartTime))}</td>
            <td className='border p-2'>{formatTimestamp(numToDate(intent.info.decayEndTime))}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
