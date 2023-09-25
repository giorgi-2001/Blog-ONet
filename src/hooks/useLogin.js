import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useLogin = () => {

    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const login = async (username, password) => {

        setLoading(true)
        setError(false)

        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password }) 
        })

        const json = await res.json()

        if(!res.ok) {
            setLoading(false)
            setError(json.error)
        }

        if(res.ok) {
            setLoading(false)
            setError(null)
            dispatch({type: 'LOGIN', payload: json})
            localStorage.setItem('user', JSON.stringify(json))
        }
    }

    return { loading, error, setError, login }
}