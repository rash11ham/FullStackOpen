import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
//step 5 import login services
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // step 1 to add login feature
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // step 6 add user state
  const [user, setUser] = useState(null)

  //exercise 5.3 
  //const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // exercise 5.4
  const [message, setMessage] = useState('')
  

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
  const handleBlogTitle = event => {
    setTitle(event.target.value)
  }

  const handleBlogAuthor = event => {
    setAuthor(event.target.value)
  }

  const handleBlogUrl = event => {
    setUrl(event.target.value)
  }
  
  const createBlog = event => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }
    
    blogService
      .create(newBlogObject)
      .then(addNewBlog => {
        setBlogs(blogs.concat(addNewBlog))
        //exercise 5.4
        setMessage(`A new blog is added by: ${user.username}`)
        setTimeout(() => {
          setMessage('')
        }, 5000);
        setTitle('')
        setAuthor('')
        setUrl('')
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

  const blogsDisplay = () => {
    return <div>
      <h1>blogs</h1>
      {/* exercise 5.4 */}
      <Notification message={message}/>
      
      <p>user logged in: <strong>{user.username}</strong> <button onClick={handleLogout}>logout</button></p>
      <br />
      {/* exercise 5.3 adding input from */}
      <form onSubmit={createBlog}>
        <div className='inputForm'>
          <label>Title: </label>
          <input
            type='text'
            value={title}
            onChange={handleBlogTitle}
          />
        </div>
        <div className='inputForm'>
          <label>Author: </label>
          <input
            value={author}
            onChange={handleBlogAuthor}
          />
        </div>
        <div className='inputForm'>
          <label>Url: </label>
          <input
            value={url}
            onChange={handleBlogUrl}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
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