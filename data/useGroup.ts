import useSWR from "swr"
import fetcher from '../lib/fetcher'
import { Response } from '../pages/api/group/[id]'

export default function useGroup(id: string): {group: Response, loading: boolean, error: any} {
  const { data, error } = useSWR<Response>('/api/group/' + id, fetcher)
  return {
    group: data,
    loading: !error && !data,
    error: error
  }
}