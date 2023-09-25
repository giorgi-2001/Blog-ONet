import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentContext } from "../hooks/useCommentContext";


const EditForm = ({comment}) => {

    const { user } = useAuthContext()
    const { dispatch, setEdit } = useCommentContext()

    const [text, setText] = useState(comment.text)

    const [loading, setLoading] = useState(false)
    const [error, setError]  = useState(null)

    const handleSubmit = async e => {
        e.preventDefault()
        if(!user) return

        setLoading(true)

        const res = await fetch('/api/comments/' + comment._id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ text })
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
            setEdit(null);
            dispatch({type: 'UPDATE_COMMENT', payload: {
                _id: comment._id,
                text
            }})
        }
    }

    return ( 
        <form className="comment-form edit-form" onSubmit={handleSubmit}>
            <textarea value={text} onChange={e => setText(e.target.value)}>
            </textarea>
            {error && <p className="error-message">{error}</p>}
            <div className="button-box">
                <button disabled={loading} type="submit" className="button">Upadte</button>
                <button 
                    className="comment-btn"
                    disabled={loading} 
                    type='button'
                    onClick={() => setEdit(null)}
                >
                    Cancel
                </button>
            </div>
        </form>
     );
}
 
export default EditForm;