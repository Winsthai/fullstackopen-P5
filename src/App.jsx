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

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App