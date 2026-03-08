import { Price } from '@/types/Price'


export async function getLatestPrices(): Promise<Price[]> {
  const res = await fetch('https://api.porssisahko.net/v2/latest-prices.json', {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch prices');
  const data = await res.json();

  return data.prices.reverse(); // Reverse to get oldest first
}
