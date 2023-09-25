import CommentBtnBox from "./CommentBtnBox";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCommentContext } from "../hooks/useCommentContext";
import ReplyForm from "./ReplyForm";
import EditForm from "./EditCommentForm";
import CommentLikeContainer from "./CommentLikeContainer";
import { formatDistance } from 'date-fns'

const CommentCard = ({ comment, blog, userInfo }) => {

    const { user } = useAuthContext()
    const { reply, edit, comments } = useCommentContext()

    const isUser = user.username === comment.username

    const replies = comments.filter(reply => reply.parent_id === comment._id)
        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

    const createdAt = formatDistance( 
        new Date(comment.createdAt), new Date(), { addSuffix: true}
    )

    return ( 
        <>
        <div className="comment-card">
            <div className="comment-header">
                <p>{comment.username}</p>
                {isUser && <p className="you">You</p>}
                <p className="createdAt">{createdAt}</p>
                <CommentBtnBox comment={comment}/>
            </div>
            {comment._id === edit ? <EditForm comment={comment}/>
            : <p className="comment-body">
                {comment.replyingTo && <span className="replyingTo">
                    {`@${comment.replyingTo} `}
                </span>}
                {comment.text}
            </p>}
            <CommentLikeContainer comment={comment} userInfo={userInfo} />
        </div>
        {comment._id === reply && <ReplyForm blog={blog} comment={comment}/>}
        {replies && 
            <div className="reply-box">
                {replies.map(reply => (
                    <CommentCard 
                        key={reply._id} 
                        comment={reply} 
                        blog={blog} 
                        userInfo={userInfo}
                    />
                ))}
            </div>}
        </>
     );
}
 
export default CommentCard;