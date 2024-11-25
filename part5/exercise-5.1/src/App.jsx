import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//step 5 import login services
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // step 1 to add login feature
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // step 6 add user state
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  // step 2 to add login feature
  const handleLogin = async event => {
    event.preventDefault()
    console.log('user credentials: ', username, password)
    // step 7
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log("someting went wrong ", exception)
    }
  }
  //step 3 & 8 move the form to a function
  const loginForm = () => (
    <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
  )

  const blogsDisplay = () => {
    return <div>
      <h1>blogs</h1>
      <h3>user logged in: {user.username}</h3><br/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  }

  return (
    <div>
      {/* step 9  */}
      {user === null ?
        loginForm() :
        blogsDisplay()
      }
    </div>
  )
}

export default App