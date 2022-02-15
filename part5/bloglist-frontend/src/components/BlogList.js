import Blog from "./Blog"

const BlogList = ({ blogs, setBlogs, setErrorMessage, username }) => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} setErrorMessage={setErrorMessage} username={username} />
        )} 
    </div>  
)
  
export default BlogList