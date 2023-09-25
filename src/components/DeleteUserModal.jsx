import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const DeleteUserModal = ({ setModal }) => {

    const [loading, setLoading] = useState(false)

    const { user } = useAuthContext()
    const logout = useLogout()
 
    const handleClick = async () => {
        setLoading(true)

        const res = await fetch('/api/users/profile', {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await res.json()

        if (!res.ok) {
            setLoading(false)
            console.log(json.error)
        }

        if(res.ok) {
            setLoading(false)
            logout()
            alert(json.message)
        }
    }


    return ( 
        <div className="inner-modal">
            <h2>Are you sure you want to Delete the user?</h2>
            <p>This will remove the account forever and can not be undone</p>
            <div className="button-box">
                <button 
                    className="button button-gray"
                    onClick={() => setModal(false)}
                    disabled={loading}
                >No Cancel</button>
                <button 
                    className="button button-red"
                    onClick={handleClick}
                    disabled={loading}
                >Yes Delete</button>
            </div>
        </div>
     );
}
 
export default DeleteUserModal;