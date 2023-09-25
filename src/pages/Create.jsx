import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const Create = () => {

    const { user } = useAuthContext()

    const navigate = useNavigate()

    const [title, setTitile] = useState('')
    const [validTitle, setValidTitle] = useState(false)
    const [body, setBody] = useState('')
    const [validBody, setValidBody] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        title ? setValidTitle(true) : setValidTitle(false)
    }, [title])

    useEffect(() => {
        body ? setValidBody(true) : setValidBody(false)
    }, [body])

    const [titleClass, setTitleClass] = useState('')
    const [bodyClass, setBodyClass] = useState('')

    const setClasses = () => {
        validTitle ? setTitleClass('') : setTitleClass('error')
        validBody ? setBodyClass('') : setBodyClass('error')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            return
        }
        
        setClasses()
        if(!validTitle || !validBody) {
            setError('All fields must be filled')
            return
        }

        const res = await fetch('/api/blogs', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            },
            body: JSON.stringify({ title, body, author: user.username })
        })

        const json = await res.json()

        if(res.ok) {
            setError(null)
            navigate('/')
        }
    }

    return ( 
        <div className="create-blog" onSubmit={handleSubmit}>
            <h2>Add a new blog:</h2>
            <form className="blog-form">
                <label htmlFor="title">Blog Title</label>
                <input 
                    className={titleClass}
                    type="text"
                    id="title" 
                    name="title"
                    placeholder="Enter title of blog"
                    value={title}
                    onChange={(e) => setTitile(e.target.value)}
                />
                <label htmlFor="body">Blog text</label>
                <textarea 
                    className={bodyClass}
                    name="body"
                    id="body" 
                    placeholder="Write the blog here..."
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
                <button className="button">Add blog</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
     );
}
 
export default Create;