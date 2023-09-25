import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const DelBlogModal = ({ setModal, id }) => {

    const [loading, setLoading] = useState(false)

    const { user } = useAuthContext()

    const navigate = useNavigate()

    const handleDelete = async () => {
        if(!user) {
            return
        }
        setLoading(true)
        const res = await fetch('/api/blogs/' + id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        if (res.ok) {
            setLoading(false)
            setModal(false)
            navigate('/')
        }
    }

    return ( 
        <div className="modal">
            <div className="inner-modal">
                <h2>Are you sure you want to Delete the blog?</h2>
                <p>This will remove the blog forever and can not be undone</p>
                <div className="button-box">
                    <button 
                        className="button button-gray"
                        onClick={() => setModal(false)}
                        disabled={loading}
                    >No Cancel</button>
                    <button 
                        className="button button-red"
                        onClick={handleDelete}
                        disabled={loading}
                    >Yes Delete</button>
                </div>
            </div>
        </div>
        
     );
}
 
export default DelBlogModal;