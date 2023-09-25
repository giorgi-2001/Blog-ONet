import { format } from 'date-fns'

const BlogRow = ({ blog }) => {

    const createdAt = format( new Date(blog.createdAt), 'dd.MM.yyyy - HH : mm')

    return ( 
        <>
        <p>{blog.title}</p>
        <p>{createdAt}</p>
        <p className="blog-row__likes">likes: {blog.likes}</p>
        </>
     );
}
 
export default BlogRow;