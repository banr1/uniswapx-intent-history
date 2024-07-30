export const numToDate = (num: number) => new Date(num * 1000);

export const formatTimestamp = (date: Date) => {
  if (!date) return 'N/A';
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

export const shortenAddress = (address: string) => `${address.slice(0, 6)} ... ${address.slice(-4)}`;
