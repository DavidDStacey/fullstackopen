const BlogForm = ({ addBlog, newBlog, handleBlogChange }) => (
  <>
    <form onSubmit={addBlog} id="addBlogForm">
      Add New Blog
      <br />
      <br />
      Title
      <input
        value={newBlog.title}
        onChange={handleBlogChange}
      />
      <br />
      Author
      <input
        value={newBlog.author}
        onChange={handleBlogChange}
      />
      <br />
      URL
      <input
        value={newBlog.url}
        onChange={handleBlogChange}
      />
      <br />
      <button type="submit">save</button>
    </form> 
    <br />
  </> 
)
  
export default BlogForm