import { useEffect, useState } from "react";
import { useAuthContext } from './useAuthContext'

export const useGetRequest = () => {

    const [data, setData] = useState(null)
    const [loading, setLoading ] = useState(false)
    const [error, setError] = useState(null)

    const { user } = useAuthContext()

    const getRequest = async (url) => {

        setLoading(true)

        const res = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await res.json()
 
        if(!res.ok) {
            setLoading(false)
            setError(json.error)
        }

        if(res.ok) {
            setLoading(false)
            setError(null)
            setData(json)
        }
    }

    return { getRequest, data, error, loading, setLoading, setData }
}