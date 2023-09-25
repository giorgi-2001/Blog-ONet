import { Link } from 'react-router-dom'

const BlogCard = ({ blog }) => {

    const bodySlice = blog.body.slice(0, 300)

    return ( 
        <Link className="card" to={`/${blog._id}`}>
            <img src="../assets/blog.jpg" alt="blog-pic" />
            <article>
                <h2>{blog.title}</h2>
                <p>{bodySlice}...</p>
                <p>by: {blog.author}</p>
            </article>
            <div className="likes">{blog.likes}</div>
        </Link>
     );
}
 
export default BlogCard;