import { useState } from "react";
import {useAuthContext} from './useAuthContext'

export const useSignup = () => {

    const { dispatch } = useAuthContext()

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const signup = async (username, password, role) => {

        setLoading(true)
        setError(false)

        let roles = []

        if (role === 'viewer') {
            roles = [role]
        } else if (role === 'writer') {
            roles = ['viewer', role]
        }

        const res = await fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, roles }) 
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

    return { loading, error, setError, signup }
}