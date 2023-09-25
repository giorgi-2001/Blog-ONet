import { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import { useAuthContext } from '../hooks/useAuthContext'
import { useGetRequest } from "../hooks/useGetRequest"

const Home = () => {

    const { user } = useAuthContext()
    const { getRequest, data: blogs, loading } = useGetRequest()

    const [search, setSearch] = useState('')
    const [filteredBlogs, setFilteredBlogs] = useState(null)
    
    useEffect(() => {
        const fetchBlogs = async () => {
            await getRequest('/api/blogs/')
        }
        user && fetchBlogs()
    }, [user])

    useEffect(() => {
        blogs && setFilteredBlogs(blogs)
    }, [blogs])

    useEffect(() => {
        if(!blogs) return

        if(!search || search === '') {
            setFilteredBlogs(blogs)
            return
        }

        const newList = blogs.filter( blog => {
            const isInTitle = blog.title.toLowerCase().
                includes(search.toLowerCase())
            const isInAuthor = blog.author.toLowerCase().
                includes(search.toLocaleLowerCase())

            const isInText = blog.body.toLowerCase().
                includes(search.toLocaleLowerCase())

            if(isInTitle || isInAuthor || isInText) return blog
        })
        setFilteredBlogs(newList)

    }, [search])

    return ( 
        <>
            <form className="search-form">
                <label htmlFor="search">Search for blogs</label>
                <input 
                    type="text"
                    id="search" 
                    name="search"
                    placeholder="Search title, author, text..."
                    autoComplete="off"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </form>
            {loading && <p>Loading...</p>}
            {filteredBlogs && filteredBlogs.map(blog => 
                <BlogCard key={blog._id} blog={blog}/>
            )}
        </>
     );
}
 
export default Home;