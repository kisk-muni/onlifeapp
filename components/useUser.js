import useSWR from "swr"
import fetch from '../lib/fetch'

export default function useUser() {
    const { data, error } = useSWR("/api/me", fetch);
    
    const loading = !data && !error;
    const loggedOut = error && error.status === 403;
    
    console.log(data, error)

    return {
        loading,
        loggedOut,
        user: data
    }
}
