import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({blog, blogs, setBlogs, setErrorMessage, username }) => {
  const [toggle, setToggle] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateLikeCount = (event, id) => {
    const foundBlog = blogs.find(b => b.id === id)
    const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }

    blogService.update(id, updatedBlog).then(returnedBlog => {
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog).sort((a, b) => b.likes - a.likes))
    })
  }

  const deleteClick = (event, id) => {
    console.log(id)
    if(window.confirm('Would you like to delete blog with id: ' + id)) {
      blogService.deleteBlog(id).then(response => {
        setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
      }) 
    }    
  }

  return (
    <>
    <div style={blogStyle}>
      {blog.title} <button onClick={() => {setToggle(!toggle)}}>view</button>
      {toggle 
      ? <> by {blog.author} at {blog.url} likes: {blog.likes} <button onClick={(event) => updateLikeCount(event, blog.id)}>like</button> 
      {username === blog.user.username 
      ? <button onClick={(event) => deleteClick(event, blog.id)}>delete</button> 
      : <></>} </> 
      : <></>}
    </div>
    </>
  )
}

export default Blog