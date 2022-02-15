import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [toggleAddBlog, settoggleAddBlog] = useState(false)
  const hideWhenVisible = { display: toggleAddBlog ? 'none' : '' }
  const showWhenVisible = { display: toggleAddBlog ? '' : 'none' }
  const [toggleShowBlog, settoggleShowBlog] = useState(false)
  const hideShowWhenVisible = { display: toggleShowBlog ? 'none' : '' }
  const showShowWhenVisible = { display: toggleShowBlog ? '' : 'none' }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
      })
    } catch (exception) {
      setErrorMessage('Form must be filled out completely')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
    var form = document.getElementById('addBlogForm')
    form.reset()
    settoggleAddBlog(!toggleAddBlog)
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
      <LoginForm handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} /> :
      <div>
        <p>
          {user.name} 
          <button onClick={logoutClick}>Logout</button>
        </p>
        <button style={hideWhenVisible} onClick={() => {settoggleAddBlog(!toggleAddBlog)}} >Add Blog</button>
        {toggleAddBlog ? <BlogForm addBlog={addBlog} newBlog={newBlog} handleBlogChange={handleBlogChange} /> : <></>}
        <button style={showWhenVisible} onClick={() => {settoggleAddBlog(!toggleAddBlog)}} >Cancel Add</button>
        <br />
        <button style={hideShowWhenVisible} onClick={() => {settoggleShowBlog(!toggleShowBlog)}}>Show blogs</button>
        <button style={showShowWhenVisible} onClick={() => {settoggleShowBlog(!toggleShowBlog)}}>Hide blogs</button>
        {toggleShowBlog ? <BlogList blogs={blogs} setBlogs={setBlogs} username={user.username} setErrorMessage={setErrorMessage}/>  : <></>}
      </div>
      }
    </div>
  )
}

export default App
