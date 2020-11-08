import useSWR from "swr"
import fetcher from '../lib/fetcher'
import { Response } from '../pages/api/me'

export default function useUser(): {user: Response, loading: boolean, error: any} {
  const { data, error } = useSWR<Response>('/api/me', fetcher, {shouldRetryOnError: false})
  return {
    user: data,
    loading: !error && !data,
    error: error
  }
}
