import useSWR from 'swr';
import { fetcher } from './fetcher.ts';

export function useIP() {
  const { data, error, isLoading } = useSWR(`https://api.ip.pe.kr`, fetcher)
  
  return {
    data: data,
    isLoading,
    isError: error
  }
}
