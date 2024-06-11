import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    // Render error if HTTP POST request to login fails, else update the user token
    try {
      const user = await loginService.login({
        username, password,
      })

      setUser(user)
      setUsername('')
      setPassword('')

    } catch (exception) {
      // Login was unsuccessful
      setErrorMessage('Wrong credentials')
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
      </div>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App