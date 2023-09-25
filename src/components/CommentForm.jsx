import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentContext } from "../hooks/useCommentContext";


const CommentForm = ({ blog }) => {

    const { user } = useAuthContext()
    const { dispatch, reply, setReply } = useCommentContext()

    const [text, setText] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError]  = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        if(!user) return

        setLoading(true)

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                blog_id: blog._id,
                text,
                username: user.username
            })
        })

        const json = await res.json()

        if(!res.ok) {
            setLoading(false);
            setError(json.error)
        }
        if(res.ok) {
            setLoading(false);
            setError(null);
            setText('');
            dispatch({type: 'ADD_COMMENT', payload: json})
        }
    }

    return ( 
        <form className="comment-form" onSubmit={handleSubmit}>
            <p>{user.username}</p>
            <textarea value={text} onChange={e => setText(e.target.value)}>
            </textarea>
            {error && <p className="error-message">{error}</p>}
            <button disabled={loading} className="button">Add Comment</button>
        </form>
     );
}
 
export default CommentForm;