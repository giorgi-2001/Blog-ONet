import { useState } from "react"
import { useCommentContext } from "../hooks/useCommentContext"
import { useAuthContext } from "../hooks/useAuthContext"

const DelComModal = () => {

    const { setDeleteModal, dispatch, setCommentId, commentId } = useCommentContext()
    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const handleCancel = () => {
        setDeleteModal(false)
        setCommentId(null)
    }

    const handleDelete = async () => {
        if(!user) return
        setLoading(true)

        const res = await fetch('/api/comments/' + commentId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if(!res.ok) {
            setLoading(false)
            console.log(json.error)
        }

        if(res.ok) {
            setLoading(false)
            setCommentId(null)
            setDeleteModal(false)
            dispatch({type: 'DELETE_COMMENT', payload: json})
        }
    }

    return ( 
        <div className="inner-modal">
            <h2>Are you sure you want to Delete the comment?</h2>
            <p>This will remove the comment forever and can not be undone</p>
            <div className="button-box">
                <button 
                    disabled={loading}
                    className="button button-gray"
                    onClick={handleCancel}
                >No Cancel</button>
                <button 
                    disabled={loading}
                    className="button button-red"
                    onClick={handleDelete}
                >Yes Delete</button>
            </div>
        </div>
    )
}
 
export default DelComModal