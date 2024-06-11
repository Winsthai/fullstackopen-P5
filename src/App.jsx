import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // Effect hook to check if user is already logged in
  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    // Render error if HTTP POST request to login fails, else update the user token
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    } catch (exception) {
      // Login was unsuccessful
      setErrorMessage('Wrong credentials')
    }
  }

  const logOut = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const createNote = async (event) => {
    event.preventDefault()

    try {
      const blogData = {title, author, url}
      const newBlog = await blogService.createBlog(blogData)
      setBlogs(blogs.concat(newBlog))

      setTitle('')
      setAuthor('')
      setUrl('')

    } catch (exception) {
      // Creating note was unsuccessful
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>

        <form onSubmit={ handleLogin }>
          <div> 
            username 
              <input 
              type="text" 
              value={username} 
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div> 
            password 
              <input 
              type="password" 
              value={password} 
              onChange={({ target }) => setPassword(target.value)}
              />
          </div>

          <button type='submit' >login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

      <div>
        {user.name} logged in
        <button onClick={ logOut }>logout</button>
      </div>

      <h2>create new</h2>

      <form onSubmit={ createNote }>
        title: 
        <input
        type="text" 
        value={title} 
        onChange={({ target }) => setTitle(target.value)}
        />
        <br/>
        
        author: 
        <input
        type="text" 
        value={author} 
        onChange={({ target }) => setAuthor(target.value)}
        />
        <br/>

        url: 
        <input
        type="text" 
        value={url} 
        onChange={({ target }) => setUrl(target.value)}
        />
        <br/>
        <button type="submit" >create</button>
      </form>
      <br/>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App