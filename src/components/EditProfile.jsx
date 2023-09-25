import { useState, useEffect} from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'


const EditProfile = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    /* Submit handling */

    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    const { user } = useAuthContext()
    const logout = useLogout()

    const handleSubmit = async e => {
        e.preventDefault()

        if(!user) return

        let roles = []

        if(role === 'viewer') {
            roles = [role]
        } else if(role === 'writer') {
            roles = ['viewer', role]
        }

        setLoading(true)

        const res = await fetch('/api/users/profile', {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, roles})
        })

        const json = await res.json()

        if(!res.ok) {
            setLoading(false)
            setError(json.error)
        }

        if(res.ok) {
            setLoading(false)
            setError(null)
            logout()
            alert(json.message)
        }
    }

    return ( 
    <>
        <h2>Edit profile</h2>
        <form className="edit-form" onSubmit={handleSubmit} >
        <label htmlFor="username">Username</label>
            <input 
                type="text"
                id="username" 
                name="username"
                autoComplete="off"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />

            <label htmlFor="username">Password</label>
            <input 
                type="password"
                id="password" 
                name="password"
                autoComplete="off"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <label htmlFor="role">Choose your role:</label>
            <select 
                name="role" 
                id="role"
                onChange={e => setRole(e.target.value)}
            >   
                <option value style={{display: 'none'}}></option>
                <option value="viewer">Viewer</option>
                <option value="writer">Writer</option>
            </select>
            <button disabled={loading} className='button'>Update profile</button>
            {error && <p className='error-message'>{error}</p>}
        </form>

    </>
     );
}
 
export default EditProfile;