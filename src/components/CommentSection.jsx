import { useCommentContext } from '../hooks/useCommentContext'
import { useAuthContext } from '../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
import DelComModal from './DelComModal';

const CommentSection = ({ blog, userInfo }) => {

    const { comments, dispatch, deleteModal, reply } = useCommentContext()
    const { user } = useAuthContext()

    const [loading, setLoading] = useState(false)

    const rootComments = comments?.filter(comment => !comment?.parent_id)

    useEffect(() => {
        const fetchComments = async () => {
            setLoading(true)
            const res = await fetch('/api/comments/' + blog._id, {
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
                dispatch({type: 'SET_COMMENTS', payload: json})
            }

        }
        user && fetchComments()
    }, [dispatch, user])

    return ( 
        <section className="comment-section">
            <CommentForm blog={blog}/>
            {loading && <p>Loading...</p>}
            {rootComments?.length ? 
                rootComments.map(comment => (
                    <CommentCard 
                        key={comment._id} 
                        comment={comment} 
                        blog={blog} 
                        userInfo={userInfo}
                    />
                ))
             : <p>No comments yet</p>}
             {deleteModal && <div className="modal">
                <DelComModal />
             </div>}
        </section>
     );
}
 
export default CommentSection;