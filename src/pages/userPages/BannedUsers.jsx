import { useEffect, useState } from 'react';
import { useGetRequest } from '../../hooks/useGetRequest'
import { useAuthContext } from '../../hooks/useAuthContext';
import BannedUserRow from '../../components/BannedUserRow'


const BannedUsers = () => {

    const { getRequest, loading, data: users, setData: setUsers } = useGetRequest()
    const { user } = useAuthContext()

    const [message, setMessage] = useState(null)

    let bannedUsers = []

    const filterUsers = () => {
        const filteredUsers = users.filter(user => user.status === 'canceled')
        bannedUsers = [...filteredUsers]
    }

    const removeBanned = (id) => {
        const filteredUsers = users.filter( user => user._id !== id)
        setUsers(filteredUsers)
    }

    useEffect(() => {
        const fetchUsers = async () => {
            getRequest('/api/users')
        }
        user && fetchUsers()
    }, [])

    users && filterUsers()

    return ( 
        <>
        <h2>Banned users:</h2>
        {loading && <p>Loading...</p>}
        {bannedUsers?.length ? bannedUsers.map(u => (
            <BannedUserRow 
                key={u._id} 
                user={u} 
                removeBanned={removeBanned} 
                setMessage={setMessage}
            />
        )) : <p>No banned users</p>
        }
        {message && <p>{message}</p>}
        </>
     );
}
 
export default BannedUsers;