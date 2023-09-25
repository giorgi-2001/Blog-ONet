import { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { useGetRequest } from "../../hooks/useGetRequest";
import { useAuthContext } from "../../hooks/useAuthContext";
import BlogRow from "../../components/BlogRow";

const MyBlogs = () => {

    const { getRequest, data: blogs , error, loading } = useGetRequest()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchMyBlogs = async () => {
           await getRequest('/api/blogs/myblogs')
        }
        user && fetchMyBlogs()
        error && console.log(error)
    }, [])

    return ( 
        <>
        <h2>My Blogs</h2>
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
 
export default MyBlogs;