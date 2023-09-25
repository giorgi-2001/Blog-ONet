import { useState, useEffect } from "react";
import { useAuthContext } from '../../hooks/useAuthContext'
import EditProfile from "../../components/EditProfile";
import DeleteUserModal from "../../components/DeleteUserModal";
import { useGetRequest } from "../../hooks/useGetRequest";

const Profile = () => {

    const { user } = useAuthContext()

    const { getRequest, loading, error, data: userInfo } = useGetRequest()

    useEffect(() => {
        const fetchUser = async () => {
            await getRequest('/api/users/profile')
        }
        user && fetchUser()
    }, [])

    const [show, setShow] = useState(false)
    const [editClass, setEditClass] = useState('')

    useEffect(() => {
        show ? setEditClass('show') : setEditClass('')
    }, [show])


    /* Modal handling */

    const [modal, setModal] = useState(false)

    return ( 
        <>
        <h1>User Profile</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="error-message">{error}</p>}

            {userInfo && <div className="user-info">
            <p>Username: {userInfo.username}</p>
            <p>roles:</p>
            <ul>
                {userInfo.roles.map(role => (
                    <li key={role}>{role}</li>
                ))}
            </ul>
            
            </div>}
        <div className="button-box">
            <button 
                disabled={loading} 
                className="button button-gray"
                onClick={() => setShow(prev => !prev)}
            >Edit profile</button>

            <button 
                disabled={loading} 
                className="button button-red"
                onClick={() => setModal(true)}
            >Delete profile</button>
        </div>
        
        <section className={`edit-profile ${editClass}`}>
            <EditProfile />
        </section>

        {modal && <div className="modal delete-modal">
            <DeleteUserModal setModal={setModal} />
        </div>}
        </>
     );
}
 
export default Profile;