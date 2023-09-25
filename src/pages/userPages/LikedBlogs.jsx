import { useEffect, useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useGetRequest} from '../../hooks/useGetRequest'
import { Link } from 'react-router-dom'
import BlogRow from '../../components/BlogRow'


const LikedBlogs = () => {

    const { user } = useAuthContext()
    const { data: blogs, getRequest, loading, error} = useGetRequest()


    useEffect(() => {
        const fetchMyBlogs = async () => {
           await getRequest('/api/blogs/liked')
        }
        user && fetchMyBlogs()
        error && console.log(error)
    }, [])

    return ( 
        <>
        <h2>Liked Blogs</h2>
        {!blogs?.length && <p>No Blogs</p>}
        {loading && <p>Loading...</p>}
        {blogs && blogs.map(blog => (
            <Link className="blog-row" to={`/${blog._id}`} key={blog._id}>
                <BlogRow blog={blog} />
            </Link>
        ))}
        </>
     );
}
 
export default LikedBlogs;