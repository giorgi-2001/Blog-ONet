import { useAuthContext } from "../hooks/useAuthContext";

const UserRow = ({ user, removeBanned, setMessage }) => {

    const { user: admin } = useAuthContext()

    const isAdmin = user.roles.includes('admin')

    const handleClick = async () => {
        if(!admin) return
        const res = await fetch('/api/users/ban/' + user._id, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${admin.token}`
            }
        })
        const json = await res.json()

        if(!res.ok) {
            console.log(json.error)
        }

        if(res.ok) {
            removeBanned(user._id)
            setMessage(json.message)
        }
    }

    return (

        <div className="user-row row">
            <p>{user.username}</p>
            <p>{user.roles.map(role => (
                <span className="role" key={role}>{role}</span>
            ))}</p>
            {!isAdmin && <button onClick={handleClick} className="button button-red">Ban</button>}
        </div>
     );
}
 
export default UserRow;