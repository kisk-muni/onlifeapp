import useSWR from "swr"
import fetcher from '../lib/fetcher'

export default function useUser() {
  const { data, error } = useSWR('/api/me', fetcher)

  return {
    user: data,
    loading: !error && !data,
    error: error
  }
}
