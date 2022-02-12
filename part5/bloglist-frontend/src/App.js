import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {    
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')    
    if (loggedUserJSON) {      
      const user = JSON.parse(loggedUserJSON)      
      setUser(user)      
      blogService.setToken(user.token)    
    }  
  }, [])

  const handleBlogChange = (event) => {
    event.preventDefault()
    setNewBlog(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    console.log('title ' + event.target[0].value)
    console.log('author ' + event.target[1].value)
    console.log('url ' + event.target[2].value)

    const newBlog = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value,
    }
    try {
      await blogService.create(newBlog).then(returnedblog => {
        setBlogs(blogs.concat(returnedblog))
      }).then(
        setErrorMessage('Blog added'),
        setTimeout(() => {
        setErrorMessage(null)
      }, 5000))
    } catch (exception) {
      setErrorMessage('Form must be filled out completely')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
    var form = document.getElementById('addBlogForm')
    form.reset()
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong Credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username <input type="text" 
          value={username} 
          name="Username" 
          onChange={({ target }) => 
            setUsername(target.value)} 
        />
      </div>
      <div>
        password <input type="text" 
          value={password} 
          name="Password" 
          onChange={({ target }) => 
            setPassword(target.value)} 
        />
      </div>
      <button type='submit'>Login</button>
    </form>  
  )

  const blogForm = () => (
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} 
    </>
  )

  const logoutClick = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
    setErrorMessage('Logged out')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
  }

  return (
    <div>
      <h2>Blogs</h2>

      {<Notification message={errorMessage} />}

      {user === null ?
      loginForm() :
      <div>
        <p>
          {user.name} 
          <button onClick={logoutClick}>Logout</button>
        </p>
        {blogForm()}
      </div>
      }
    </div>
  )
}

export default App
