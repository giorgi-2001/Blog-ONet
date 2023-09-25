import { useEffect, useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'
import { useGetRequest } from '../hooks/useGetRequest'


const BlogLikeContainer = ({ blog, userInfo }) => {

    const [likes, setLikes] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [buttonClass, setButtonClass] = useState('')
    const [loading, setLoading] = useState(false)

    const { user } = useAuthContext()

    useEffect(() => {
        setLikes(blog.likes)
        if(userInfo.liked_blogs.includes(blog._id)) {
            setClicked(true)
        }  
    }, [userInfo])
    

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
        const res = await fetch('/api/blogs/like/' + blog._id, {
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
        <div className="like-container">
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
 
export default BlogLikeContainer;