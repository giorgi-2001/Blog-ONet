import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentContext } from "../hooks/useCommentContext";


const ReplyForm = ({ blog, comment }) => {

    const { user } = useAuthContext()
    const { dispatch, setReply } = useCommentContext()

    const [text, setText] = useState('')

    const [loading, setLoading] = useState(false)
    const [error, setError]  = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        if(!user) return

        setLoading(true)

        let parent_id

        if(!comment.parent_id) {
            parent_id = comment._id
        } else {
            parent_id = comment.parent_id
        }

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({
                blog_id: blog._id,
                parent_id,
                text,
                username: user.username,
                replyingTo: comment.username
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
            setReply(null);
            dispatch({type: 'ADD_COMMENT', payload: json})
        }
    }

    return ( 
        <form className="comment-form" onSubmit={handleSubmit}>
            <p>{user.username}</p>
            <textarea value={text} onChange={e => setText(e.target.value)}>
            </textarea>
            {error && <p className="error-message">{error}</p>}
            <div className="button-box">
                <button disabled={loading} type="submit" className="button">Reply</button>
                <button 
                    className="comment-btn"
                    disabled={loading} 
                    type='button' 
                    onClick={() => setReply(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
     );
}
 
export default ReplyForm;