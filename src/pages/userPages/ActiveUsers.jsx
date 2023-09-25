import { useEffect, useState } from 'react';
import { useGetRequest } from '../../hooks/useGetRequest'
import { useAuthContext } from '../../hooks/useAuthContext';
import UserRow from '../../components/UserRow';


const ActiveUsers = () => {

    const { getRequest, loading, data: users, setData: setUsers } = useGetRequest()
    const { user } = useAuthContext()

    const [message, setMessage] = useState(null)

    let activeUsers = []

    const filterUsers = () => {
        const filteredUsers = users.filter(user => user.status === 'active')
        activeUsers = [...filteredUsers]
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
        <h2>Active users:</h2>
        {loading && <p>Loading...</p>}
        {activeUsers?.length ? activeUsers.map(u => (
            <UserRow 
                key={u._id} 
                user={u} 
                removeBanned={removeBanned} 
                setMessage={setMessage}
            />
        )) : <p>No active users</p>
        }
        {message && <p>{message}</p>}
        </>
     );
}
 
export default ActiveUsers;