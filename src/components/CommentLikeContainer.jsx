import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'



const CommentLikeContainer = ({ comment, userInfo }) => {

    const [likes, setLikes] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [buttonClass, setButtonClass] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useAuthContext()

    useEffect(() => {
        setLikes(comment.likes)
        if(userInfo.liked_comments.includes(comment._id)) {
            setClicked(true)
        }  
    }, [])
    
    useEffect (() => {
        clicked ? setButtonClass('') : setButtonClass('button-gray')
    }, [clicked])

    
    const setLocalLikeState = () => {
        if (clicked) {
            setLikes(prev => prev - 1)
            setClicked(false)
        } else {
            setLikes(prev => prev + 1)
            setClicked(true)
        }
    }

    const handleClick = async () => {
        setLoading(true)
        if(!user) return
        const res = await fetch('/api/comments/like/' + comment._id, {
            method: 'PATCH',
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
            console.log(json.message)
            setLocalLikeState()
        }
    }

    return ( 
        <div className="like-container comment-likes">
            <p>Likes: {likes}</p>
            <button 
                onClick={handleClick} 
                className={`button ${buttonClass}`}
                disabled={loading}
            >
                <img src="../assets/like.svg" />
            </button>
        </div>
     );
}


export default CommentLikeContainer