
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//step 5 import login services
import loginService from './services/login'
import './App.css'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // step 1 to add login feature
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // step 6 add user state
  const [user, setUser] = useState(null)
  
  // exercise 5.4
  const [message, setMessage] = useState('')

  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [url, setUrl] = useState('')
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  //exercise 5.2 saving the login credentials stored in window.localStorage to the state
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //make sure setToken is added in services/blogs
      blogService.setToken(user.token)
    }
  }, [])

  // step 2 to add login feature
  const handleLogin = async event => {
    event.preventDefault()
    console.log('user credentials: ', username, password)
    //step 7
    try {
      const user = await loginService.login({
        username, password
      })
      //exercise 5.2 step one
      //storing the login credentials to the local web storage
      window.localStorage.setItem(
        'loggedBlogsAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // exercise 5.4 add message to login errors
      setMessage("Wrong username or password")
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }
  //step 3 & 8 move the form to a function
  const loginForm = () => (
    
    <form onSubmit={handleLogin}>
      <h1>Login to Application</h1>
      {/* exercise 5.4 add message */}
      <Notification message={message} /> 
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

  //exercise 5.2 
  const handleLogout = () => {
    if (user) {
      setUser(null)
    }
    window.localStorage.removeItem('loggedBlogsAppUser')
  }

  //exercise 5.3
  
  
  const createBlog = newBlogObject => {
    // exercise 5.5 step 6 modification to recieve the new blog object from the blog form
    //console.log(blogObject)
    //exercise 5.6 last step by adding this our blog form will hide after creating a new blog

    blogFormRef.current.toggleVisibility()
    blogService
      .create(newBlogObject)
      .then(addNewBlog => {
        setBlogs(blogs.concat(addNewBlog))
        //exercise 5.4
        setMessage(`A new blog is added by: ${user.username}`)
        setTimeout(() => {
          setMessage('')
        }, 5000);
  
      }).catch(error => {
        setMessage(`something went wrong ${error}`)
        setTimeout(() => {
          setMessage('')
        }, 5000)
      })
  }

  //end of the step for exercise 5.3
  
  //exercise 5.4 
  const Notification = ({ message }) => {
    if (message === "") return ""
    else if (user === null) {
      return <div className='error'>
        {message}
      </div>
    }
    return <div className='message'>
      {message}
    </div>
  }

   //exercise 5.6 step 1 add Ref and import useRef hook
  const blogFormRef = useRef()
  const blogsDisplay = () => {
   
    return <div>
      <h1>blogs</h1>
      {/* exercise 5.4 */}
      <Notification message={message}/>
      
      <p>user logged in: <strong>{user.username}</strong> <button onClick={handleLogout}>logout</button></p>

      {/* exercise 5.5 step 3 modifing the form to togglable and form as a child */}
      {/* exercise 5.6 step 2 add ref */}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          newBlogObject={createBlog}
        />
      </Togglable>
      
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}          
        />
    
        
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